'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('BadgesEarned', {
            game_user_id: {
                primaryKey: true,
                type: Sequelize.INTEGER,
                references: {
                    model: 'GameUser',
                    key: 'id',
                }
            },
            badge_id: {
                primaryKey: true,
                type: Sequelize.INTEGER,
                references: {
                    model: 'Badge',
                    key: 'id',
                }
            },
                date_earned: {
                allowNull: false,
                type: Sequelize.DATE
            },
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('BadgesEarned');
    }
};