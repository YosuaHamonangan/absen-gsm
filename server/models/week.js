module.exports = (sequelize, DataTypes) => {
	var week = sequelize.define('week', {
		date: {
			type: DataTypes.DATEONLY,
			allowNull: false,
			unique: "class-date"
		}
	}, {freezeTableName: true});

	week.associate = models => {
		week.child = week.belongsToMany(models.child, {
			as: 'childweek',
			through: models.childWeek,
			foreignKey: "weekId"
		});
		week.class = week.belongsTo(models.class, {
			as: "class", 
			foreignKey: {
				name: "classId",
				unique: "class-date"
			},
			constraints: false
		});

		week.addScope("child", {
			group: ['week.id'],
			include: [ 
				{
					model: models.child, 
					as: 'childweek', 
					through: models.childWeek, 
					attributes:[],
					duplicating: false
				},
			]
		});

		week.addScope("latest-count", {
			attributes: [ 
				"date",
				[sequelize.fn('COUNT', sequelize.col('childweek.id')), 'childCount'] 
			],
			order: [
	            ['date', 'DESC'],
	        ],
	        limit: 10
		});
	}

	return week;
};
