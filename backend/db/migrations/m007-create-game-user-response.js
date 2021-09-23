'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('GameUserResponse', {
            game_user_id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.INTEGER,
                references: {
                    model: 'GameUser',
                    key: 'id',
                },
            },
            question_id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.INTEGER,
                references: {
                    model: 'Question',
                    key: 'id',
                },
            },
            question_status: {
                allowNull: false,
                type: Sequelize.BOOLEAN,
            },
            answer_provided: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            date_answered: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('GameUserResponse');
    }
};