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
		// absen.kelas = absen.hasOne(models.kelas, {as: "kelas", foreignKey: 'absenId', constraints: false});
	}

	return absen;
};
