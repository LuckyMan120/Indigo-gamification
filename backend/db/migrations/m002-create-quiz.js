'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Quiz', {
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
            quiz_name: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            quiz_description: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            video_link: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            video_description: {
                allowNull: false,
                type: Sequelize.STRING,
            },
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Quiz');
    }
};