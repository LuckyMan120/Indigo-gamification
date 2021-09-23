'use strict';

const express = require('express');
const { QueryTypes } = require('sequelize');
const { sequelize } = require('../db/models');
const router = express.Router();
const db = require('../db/models');

router.get('/', async function (req, res, next) {
    try {
        const game_user_id = parseInt(req.user.id);
        if (Number.isInteger(game_user_id) === false) {
            return res.status(400).send({
                message: "Bad Request"
            });
        }

        const selectQuestions = `
            SELECT q.id,
                q.question_category_id,
                qc.question_category_name,
                q.quiz_id,
                qz.quiz_name,
                q.question_type,
                q.question,
                q.answer_list,
                q.answer,
                q.point_value,
                CASE 
                    WHEN gur.question_status = 1 THEN 1
                    ELSE 0
                END AS is_answered
            FROM dbo.Question AS q
            JOIN dbo.Quiz AS qz ON q.quiz_id = qz.id
            JOIN dbo.QuestionCategory AS qc ON q.question_category_id = qc.id
            LEFT JOIN dbo.GameUserResponse AS gur
                ON q.id = gur.question_id AND gur.game_user_id = ${game_user_id}`;
        const questions = await sequelize.query(selectQuestions, { type: QueryTypes.SELECT });

        for (let idx in questions) {
            questions[idx].answer_list = questions[idx].answer_list.split('^^^');
        }

        return res.send({
            "questions": questions,
        });
    }
    catch (err) {
        return res.status(500).send({
            message: err.message || 'Unexpected Error Encountered'
        });
    }
});

module.exports = router;
