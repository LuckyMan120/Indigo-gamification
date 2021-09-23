'use strict';
const { Model } = require('sequelize');
const questioncategory = require('./questioncategory');
module.exports = (sequelize, DataTypes) => {
    class Quiz extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Quiz.init({
        id: {
            allowNull: false,
            autoIncrement: false,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        question_category_id: {
            allowNull: false,
            type: DataTypes.INTEGER,
            references: {
                model: 'QuestionCategory',
                key: 'id',
            },
        },
        quiz_name: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        quiz_description: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        video_link: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        video_description: {
            allowNull: false,
            type: DataTypes.STRING,
        },
    }, {
        sequelize,
        timestamps: false,
        modelName: 'Quiz',
        tableName: 'Quiz',
    });
    return Quiz;
};