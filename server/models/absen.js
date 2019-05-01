module.exports = (sequelize, DataTypes) => {
	var absen = sequelize.define('absen', {
		tanggal: {
			type: DataTypes.DATEONLY,
			allowNull: false,
			unique: "kelas"
		}
	}, {freezeTableName: true,});

	absen.associate = models => {
		absen.murid = absen.belongsToMany(models.murid, {
			as: 'muridabsen',
			through: models.muridAbsen,
			foreignKey: "absenId"
		});
		absen.kelas = absen.belongsTo(models.kelas, {
			as: "kelas", 
			foreignKey: 'kelasId', 
			constraints: false
		});

		absen.addScope("defaultScope", {
			group: ['absen.id'],
			include: [ 
				{
					model: models.murid, 
					as: 'muridabsen', 
					through: models.muridAbsen, 
					attributes:[],
					duplicating: false
				}, 
			]
		});

		absen.addScope("latest-count", {
			attributes: [ 
				"tanggal",
				[sequelize.fn('COUNT', sequelize.col('muridabsen.id')), 'muridCount'] 
			],
			order: [
	            ['tanggal', 'DESC'],
	        ],
	        limit: 10
		})
	}

	return absen;
};
