module.exports = (sequelize, DataType) => {
	return sequelize.define('absen', {
		tanggal: {
			type: DataType.DATEONLY,
			allowNull: false,
			unique: "kelas"
		},
		kelas: {
			type: DataType.UUID,
			allowNull: false,
			unique: "kelas"
		},
	  	muridHadir: {
			type: DataType.STRING
	  	}
	});
};
