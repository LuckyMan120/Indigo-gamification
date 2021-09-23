'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Badge extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Badge.init({
        id: {
            allowNull: false,
            autoIncrement: false,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        badge_name: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        badge_description: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        badge_icon: {
            type: DataTypes.STRING,
        },
    }, {
        sequelize,
        timestamps: false,
        modelName: 'Badge',
        tableName: 'Badge',
    });
    return Badge;
};