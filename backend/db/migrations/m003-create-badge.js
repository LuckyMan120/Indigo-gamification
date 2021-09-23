'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Badge', {
            id: {
                allowNull: false,
                autoIncrement: false,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            badge_name: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            badge_description: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            badge_icon: {
                type: Sequelize.STRING,
            },
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Badge');
    }
};