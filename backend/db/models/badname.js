'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class BadName extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    BadName.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        bad_name: {
            allowNull: false,
            type: DataTypes.STRING,
        },
    }, {
        sequelize,
        timestamps: false,
        modelName: 'BadName',
        tableName: 'BadName',
    });
    return BadName;
};