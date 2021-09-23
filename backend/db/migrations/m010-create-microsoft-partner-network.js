'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('MicrosoftPartnerNetwork', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            microsoft_partner_name: {
                allowNull: false,
                type: Sequelize.STRING,
            },
            microsoft_partner_type: {
                allowNull: false,
                type: Sequelize.STRING,
            },
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('MicrosoftPartnerNetwork');
    }
};