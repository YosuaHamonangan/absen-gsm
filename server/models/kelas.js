module.exports = (sequelize, DataType) => {
	return sequelize.define('kelas', {
		id: {
			type: DataType.UUID,
			defaultValue: DataType.UUIDV1,
			allowNull: false,
			primaryKey: true,
			unique: true
		},
		tahun: {
			type: DataType.INTEGER,
			allowNull: false,
			unique: "kelas"
	  	},
	  	horong: {
			type: DataType.INTEGER,
			allowNull: false,
			unique: "kelas"
	  	},
	  	murid: {
			type: DataType.STRING,
			defaultValue: "[]",
			allowNull: false,
	  	}
	});
}