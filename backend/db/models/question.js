'use strict';
const { Model } = require('sequelize');
const questioncategory = require('./questioncategory');
const quiz = require('./quiz');
module.exports = (sequelize, DataTypes) => {
    class Question extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Question.init({
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
        quiz_id: {
            allowNull: false,
            type: DataTypes.INTEGER,
            references: {
                model: 'Quiz',
                key: 'id',
            },
        },
        question_type: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        question: {
            allowNull: false,
            type: DataTypes.STRING(1000),
        },
        answer_list: {
            allowNull: false,
            type: DataTypes.STRING(1000),
        },
        answer: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        point_value: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
}, {
        sequelize,
        timestamps: false,
        modelName: 'Question',
        tableName: 'Question',
    });
    return Question;
};