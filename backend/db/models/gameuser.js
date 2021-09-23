'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class GameUser extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    GameUser.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        full_name: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        nick_name: {
            allowNull: true,
            type: DataTypes.STRING,
        },
        company: {
            type: DataTypes.STRING,
        },
        email: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        microsoft_partner_network_id: {
            allowNull: true,
            type: DataTypes.INTEGER,
        },
        signup_date: {
            allowNull: false,
            type: DataTypes.DATE,
        },
        hot_streak_count: {
            type: DataTypes.INTEGER,
        },
        point_total: {
            type: DataTypes.INTEGER,
        },
        updated_at: {
            allowNull: false,
            type: DataTypes.DATE,
        },
    }, {
        sequelize,
        timestamps: true,
        createdAt: 'signup_date',
        updatedAt: 'updated_at',
        modelName: 'GameUser',
        tableName: 'GameUser',
    });
    return GameUser;
};