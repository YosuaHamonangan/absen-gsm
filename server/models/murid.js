module.exports = (sequelize, DataType) => {
	return sequelize.define('murid', {
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
	});
}
