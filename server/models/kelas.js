module.exports = (sequelize, DataType) => {
	var kelas = sequelize.define('kelas', {
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
	  	}
	}, {freezeTableName: true,});

	kelas.associate = models => {
		kelas.murid = kelas.hasMany(models.murid, {as: "murid", foreignKey: 'kelasId', constraints: false});
		kelas.absen = kelas.hasMany(models.absen, {as: "absen", foreignKey: 'kelasId', constraints: false});
	}

	return kelas;
}