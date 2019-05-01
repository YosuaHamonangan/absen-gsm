module.exports = (sequelize, DataTypes) => {
	var clas = sequelize.define('class', {
		year: {
			type: DataTypes.INTEGER,
			allowNull: false,
			unique: "class"
	  	},
	  	grade: {
			type: DataTypes.INTEGER,
			allowNull: false,
			unique: "class"
	  	}
	}, {freezeTableName: true,});

	clas.associate = models => {
		clas.child = clas.belongsToMany(models.child, {
			as: 'childclass',
			through: models.childClass,
			foreignKey: "classId"
		});
		clas.week = clas.hasMany(models.week, {as: "week", foreignKey: 'classId', constraints: false});
	}

	return clas;
}