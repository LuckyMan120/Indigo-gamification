'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('BadEmailDomain', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            bad_email_domain_name: {
                allowNull: false,
                type: Sequelize.STRING,
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('BadEmailDomain');
    }
};