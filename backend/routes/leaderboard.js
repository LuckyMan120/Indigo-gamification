'use strict';

const express = require('express');
const { QueryTypes } = require('sequelize');
const { sequelize } = require('../db/models');
const router = express.Router();
const db = require('../db/models');

const getLeaderboard = async function (req, res, next, sql) {
    try {
        const leaderboard = await sequelize.query(sql, { type: QueryTypes.SELECT });
        let currentUser = {};
        for (let idx in leaderboard) {
            if (leaderboard[idx].is_current_user === 1) {
                currentUser = leaderboard[idx];
            }
        }
        const returnRows = {
            'current_user': currentUser,
            'leaderboard': leaderboard,
        }
        return res.send(returnRows);
    }
    catch (err) {
        return res.status(500).send({
            message: err.message || 'Unexpected Error Encountered'
        });
    }
}

router.get('/', async function (req, res, next) {
    try {
        const game_user_id = parseInt(req.user.id);
        if (Number.isInteger(game_user_id) === false) {
            return res.status(400).send({
                message: "Bad Request"
            });
        }

        const sql = `
            SELECT  nick_name, point_total, updated_at, game_rank,
                CASE WHEN game_user_id = ${game_user_id} THEN 1 ELSE 0 END AS is_current_user
            FROM (
            SELECT id AS game_user_id, nick_name, point_total, updated_at,
                RANK() OVER (ORDER BY point_total DESC, updated_at ASC, nick_name ASC) AS game_rank
            FROM dbo.GameUser
            ) AS t
            WHERE game_rank <= 100 OR game_user_id = ${game_user_id}`;

        await getLeaderboard(req, res, next, sql);
    }
    catch (err) {
        return res.status(500).send({
            message: err.message || 'Unexpected Error Encountered'
        });
    }
});

router.get('/:limit', async function (req, res, next) {
    try {
        const game_user_id = parseInt(req.user.id);
        const limit = parseInt(req.params.limit);
        if ((Number.isInteger(game_user_id) === false) || (Number.isInteger(limit) === false)) {
            return res.status(400).send({
                message: "Bad Request"
            });
        }

        const sql = `
            SELECT nick_name, point_total, updated_at, game_rank,
                CASE WHEN game_user_id = ${game_user_id} THEN 1 ELSE 0 END AS is_current_user
            FROM (
            SELECT id AS game_user_id, nick_name, point_total, updated_at,
                RANK() OVER (ORDER BY point_total DESC, updated_at ASC, nick_name ASC) AS game_rank
            FROM dbo.GameUser
            ) AS t
            WHERE game_rank <= ${limit} OR game_user_id = ${game_user_id}`;

        await getLeaderboard(req, res, next, sql);
    }
    catch (err) {
        return res.status(500).send({
            message: err.message || 'Unexpected Error Encountered'
        });
    }
});

module.exports = router;
