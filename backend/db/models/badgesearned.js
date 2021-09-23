'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class BadgesEarned extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    BadgesEarned.init({
        game_user_id: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            references: {
                model: 'GameUser',
                key: 'id',
            }
        },
        badge_id: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            references: {
                model: 'Badge',
                key: 'id',
            }
        },
        date_earned: {
            allowNull: false,
            type: DataTypes.DATE
        },
    }, {
        sequelize,
        timestamps: true,
        createdAt: 'date_earned',
        updatedAt: false,
        modelName: 'BadgesEarned',
        tableName: 'BadgesEarned',
    });
    return BadgesEarned;
};