'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class GameUserResponse extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    GameUserResponse.init({
        game_user_id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.INTEGER,
            references: {
                model: 'GameUser',
                key: 'id',
            },
        },
        question_id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.INTEGER,
            references: {
                model: 'Question',
                key: 'id',
            },
        },
        question_status: {
            allowNull: false,
            type: DataTypes.BOOLEAN,
        },
        answer_provided: {
            allowNull: false,
            type: DataTypes.STRING,
        },
        date_answered: {
            allowNull: false,
            type: DataTypes.DATE,
        }
    }, {
        sequelize,
        timestamps: true,
        createdAt: 'date_answered',
        updatedAt: false,
        modelName: 'GameUserResponse',
        tableName: 'GameUserResponse',
    });
    return GameUserResponse;
};