module.exports = (sequelize, DataType) => {
	var absen = sequelize.define('absen', {
		tanggal: {
			type: DataType.DATEONLY,
			allowNull: false,
			unique: "kelas"
		}
	}, {freezeTableName: true,});

	absen.associate = models => {
		absen.murid = absen.hasMany(models.murid, {as: "murid", foreignKey: 'absenId', constraints: false});
		absen.kelas = absen.hasOne(models.kelas, {as: "kelas", foreignKey: 'absenId', constraints: false});
	}

	return absen;
};
