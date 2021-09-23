'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class QuestionCategory extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    QuestionCategory.init({
        id: {
            allowNull: false,
            autoIncrement: false,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        question_category_name: {
            allowNull: false,
            type: DataTypes.STRING,
        },
    }, {
        sequelize,
        timestamps: false,
        modelName: 'QuestionCategory',
        tableName: 'QuestionCategory',
    });
    return QuestionCategory;
};