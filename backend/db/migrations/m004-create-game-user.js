'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('GameUser', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            full_name: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            nick_name: {
                allowNull: true,
                type: Sequelize.STRING,
            },
            company: {
                type: Sequelize.STRING,
            },
            email: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            microsoft_partner_network_id: {
                allowNull: true,
                type: Sequelize.INTEGER,
            },
            signup_date: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            hot_streak_count: {
                type: Sequelize.INTEGER,
            },
            point_total: {
                type: Sequelize.INTEGER,
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE,
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('GameUser');
    }
};