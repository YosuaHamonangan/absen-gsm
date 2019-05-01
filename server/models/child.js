module.exports = (sequelize, DataTypes) => {
	var child = sequelize.define('child', {
		uuid: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV1,
			allowNull: false,
			unique: true
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false
	  	},
	  	surname: {
			type: DataTypes.STRING
	  	},
	  	gender: {
	  		type: DataTypes.STRING
	  	},
	  	dob: {
	  		type: DataTypes.DATE
	  	},
	  	address: {
			type: DataTypes.STRING
	  	},
		phone: {
			type: DataTypes.STRING
	  	},
	  	photo: {
			type: DataTypes.STRING
	  	}
	}, {freezeTableName: true,});

	child.associate = models => {
		child.class = child.belongsToMany(models.class, {
			as: 'childclass',
			through: models.childClass,
			foreignKey: "childId"
		});

		child.week = child.belongsToMany(models.week, {
			as: 'childweek',
			through: models.childWeek,
			foreignKey: "childId"
		});
	}

	return child;
}
