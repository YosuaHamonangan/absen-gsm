var model =  sequelize.define('absen', {
	tanggal: {
		type: Sequelize.DATEONLY,
		allowNull: false,
		unique: "kelas"
	},
	kelas: {
		type: Sequelize.UUID,
		allowNull: false,
		unique: "kelas"
	},
  	muridHadir: {
		type: Sequelize.STRING
  	}
});

model.sync();

module.exports = model;
