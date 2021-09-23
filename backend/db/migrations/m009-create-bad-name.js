'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('BadName', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            bad_name: {
                allowNull: false,
                type: Sequelize.STRING,
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('BadName');
    }
};