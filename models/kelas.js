var model =  sequelize.define('kelas', {
	id: {
		type: Sequelize.UUID,
		defaultValue: Sequelize.UUIDV1,
		allowNull: false,
		primaryKey: true,
		unique: true
	},
	tahun: {
		type: Sequelize.INTEGER,
		allowNull: false,
		unique: "kelas"
  	},
  	horong: {
		type: Sequelize.INTEGER,
		allowNull: false,
		unique: "kelas"
  	},
  	murid: {
		type: Sequelize.STRING,
		defaultValue: "[]",
		allowNull: false,
  	}
});

model.sync();

module.exports = model;
