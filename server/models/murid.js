module.exports = (sequelize, DataTypes) => {
	var murid = sequelize.define('murid', {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV1,
			allowNull: false,
			primaryKey: true,
			unique: true
		},
		nama: {
			type: DataTypes.STRING,
			allowNull: false
	  	},
	  	marga: {
			type: DataTypes.STRING
	  	},
	  	gender: {
	  		type: DataTypes.STRING
	  	},
	  	tglLahir: {
	  		type: DataTypes.DATE
	  	},
	  	alamat: {
			type: DataTypes.STRING
	  	},
		noHp: {
			type: DataTypes.STRING
	  	},
	  	foto: {
			type: DataTypes.STRING
	  	}
	}, {freezeTableName: true,});

	murid.associate = models => {
		murid.kelas = murid.belongsToMany(models.kelas, {
			as: 'muridkelas',
			through: models.muridKelas,
			foreignKey: "muridId"
		});

		murid.absen = murid.belongsToMany(models.absen, {
			as: 'muridabsen',
			through: models.muridAbsen,
			foreignKey: "muridId"
		});
	}

	return murid;
}
