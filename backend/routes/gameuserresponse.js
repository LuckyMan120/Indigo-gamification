'use strict';

const express = require('express');
const { sequelize } = require('../db/models');
const router = express.Router();
const db = require('../db/models');
const GameUserResponse = db.GameUserResponse;
const Question = db.Question;
const GameUser = db.GameUser

router.get('/', async function (req, res, next) {
    try {
        const game_user_id = parseInt(req.user.id);
        if (Number.isInteger(game_user_id) === false) {
            return res.status(400).send({
                message: "Bad Request"
            });
        }
        await GameUserResponse.findAll({
            where: {
                game_user_id: game_user_id,
            },
            order: ['question_id'],
        })
            .then(data => {
                return res.send(data);
            })
            .catch(err => {
                res.status(400).send({
                    message: err.message || 'Error fetching data'
                });
            });
    }
    catch (err) {
        console.error(err);
        res.status(500).send({
            message: err.message || 'Unexpected Error Encountered'
        });
    }
});

router.post('/:question_id', async function (req, res, next) {
    try {
        const game_user_id = parseInt(req.user.id);
        const question_id = parseInt(req.params.question_id);
        const answer_provided = String(req.body.answer_provided).trim();
        if ((Number.isInteger(game_user_id) === false) ||
            (Number.isInteger(question_id) === false) ||
            (!answer_provided || answer_provided.length === 0)) {
            return res.status(400).send({
                message: "Bad Request"
            });
        }

        const question = await Question.findByPk(question_id);
        if (question === null) {
            return res.status(400).send({
                message: "Bad Request"
            });
        }

        let question_status = false;
        if (question.answer == answer_provided || question.question_type == 'Text') {
            question_status = true;
        }

        // Get the previous response, if it exists.
        const previousResponse = await GameUserResponse.findAll({
            where: {
                game_user_id: game_user_id,
                question_id: question_id,
            }
        });

        // Save answer in GameUserResponse
        let gameUserResponse;
        if ((previousResponse !== null) &&
            (previousResponse.length === 1)) {

            if (previousResponse[0].question_status === true) {
                // Question already correctly answered, not allowed!
                return res.status(400).send({
                    message: "Question already successfully answered!"
                });
            }

            // Update existing response
            const rowsAffected = await GameUserResponse.update({
                question_status: question_status,
                answer_provided: answer_provided,
            }, {
                where: {
                    game_user_id: game_user_id,
                    question_id: question_id
                }
            });
            // Get the updated record
            const gameUserResponseList = await GameUserResponse.findAll({
                where: {
                    game_user_id: game_user_id,
                    question_id: question_id,
                }
            });
            gameUserResponse = gameUserResponseList[0];
        }
        else {
            // Save a new response
            gameUserResponse = await GameUserResponse.create({
                game_user_id: game_user_id,
                question_id: question_id,
                question_status: question_status,
                answer_provided: answer_provided,
            });
        }

        // Update GameUser point totals
        if (question_status === true) {
            const updateFields = {
                point_total: question.point_value
            };
            await GameUser.increment(updateFields, {
                where:
                    { id: game_user_id }
            });
        }

        // Return answer back to the caller
        return res.send(gameUserResponse);

    }
    catch (err) {
        return res.status(500).send({
            message: err.message || 'Unexpected Error Encountered'
        });
    }
});

module.exports = router;
