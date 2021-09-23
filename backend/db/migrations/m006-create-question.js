'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Question', {
            id: {
                allowNull: false,
                autoIncrement: false,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            question_category_id: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: 'QuestionCategory',
                    key: 'id',
                },
            },
            quiz_id: {
                allowNull: false,
                type: Sequelize.INTEGER,
                references: {
                    model: 'Quiz',
                    key: 'id',
                },
            },
            question_type: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            question: {
                allowNull: false,
                type: Sequelize.STRING(1000),
            },
            answer_list: {
                allowNull: false,
                type: Sequelize.STRING(1000),
            },
            answer: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            point_value: {
                allowNull: false,
                type: Sequelize.INTEGER,
            },
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Question');
    }
};