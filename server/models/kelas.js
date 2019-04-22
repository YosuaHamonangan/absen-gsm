module.exports = (sequelize, DataTypes) => {
	var kelas = sequelize.define('kelas', {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV1,
			allowNull: false,
			primaryKey: true,
			unique: true
		},
		tahun: {
			type: DataTypes.INTEGER,
			allowNull: false,
			unique: "kelas"
	  	},
	  	horong: {
			type: DataTypes.INTEGER,
			allowNull: false,
			unique: "kelas"
	  	}
	}, {freezeTableName: true,});

	kelas.associate = models => {
		kelas.murid = kelas.belongsToMany(models.murid, {
			as: 'muridkelas',
			through: models.muridKelas,
			foreignKey: "kelasId"
		});
		// kelas.absen = kelas.hasMany(models.absen, {as: "absen", foreignKey: 'kelasId', constraints: false});
	}

	return kelas;
}