var model =  sequelize.define('murid', {
	id: {
		type: Sequelize.UUID,
		defaultValue: Sequelize.UUIDV1,
		allowNull: false,
		primaryKey: true,
		unique: true
	},
	nama: {
		type: Sequelize.STRING,
		allowNull: false
  	},
  	marga: {
		type: Sequelize.STRING
  	},
  	gender: {
  		type: Sequelize.STRING
  	},
  	tglLahir: {
  		type: Sequelize.DATE
  	},
  	alamat: {
		type: Sequelize.STRING
  	},
	noHp: {
		type: Sequelize.STRING
  	},
  	foto: {
		type: Sequelize.STRING
  	}
});

model.sync();

module.exports = model;
