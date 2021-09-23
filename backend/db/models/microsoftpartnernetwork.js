'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class MicrosoftPartnerNetwork extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    MicrosoftPartnerNetwork.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        microsoft_partner_name: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        microsoft_partner_type: {
            allowNull: false,
            type: DataTypes.STRING,
        },
    }, {
        sequelize,
        timestamps: false,
        modelName: 'MicrosoftPartnerNetwork',
        tableName: 'MicrosoftPartnerNetwork',
    });
    return MicrosoftPartnerNetwork;
};