module.exports = (sequelize, DataType) => {
	var murid = sequelize.define('murid', {
		id: {
			type: DataType.UUID,
			defaultValue: DataType.UUIDV1,
			allowNull: false,
			primaryKey: true,
			unique: true
		},
		nama: {
			type: DataType.STRING,
			allowNull: false
	  	},
	  	marga: {
			type: DataType.STRING
	  	},
	  	gender: {
	  		type: DataType.STRING
	  	},
	  	tglLahir: {
	  		type: DataType.DATE
	  	},
	  	alamat: {
			type: DataType.STRING
	  	},
		noHp: {
			type: DataType.STRING
	  	},
	  	foto: {
			type: DataType.STRING
	  	}
	}, {freezeTableName: true,});

	murid.associate = models => {
		murid.absen = murid.hasMany(models.absen, {as: "absen", foreignKey: 'muridId', constraints: false});

	}

	return murid;
}
