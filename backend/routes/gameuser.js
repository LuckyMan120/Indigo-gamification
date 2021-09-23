'use strict';

const express = require('express');
const router = express.Router();
const db = require('../db/models');
const GameUser = db.GameUser;
const BadgesEarned = db.BadgesEarned

router.get('/', async function (req, res, next) {
    try {
        const id = parseInt(req.user.id);
        if (Number.isInteger(id) === false) {
            return res.status(400).send({
                message: "Bad Request"
            });
        }
        const gameUser = await GameUser.findByPk(id);
        if (gameUser === null) {
            return res.status(404).send({
                message: 'Not Found!'
            });
        }
        const badgesEarned = await BadgesEarned.findAll({
            where: {
                game_user_id: id,
            },
            order: ['badge_id'],
        });
        gameUser.dataValues.badges_earned = []
        for (let idx in badgesEarned) {
            gameUser.dataValues.badges_earned.push(badgesEarned[idx].dataValues.badge_id);
        }
        return res.send(gameUser);
    } catch (err) {
        return res.status(500).send({
            message: err.message || 'Unexpected Error Encountered'
        });
    }
});

router.put('/', async function (req, res, next) {
    try {
        const id = parseInt(req.user.id);
        if (Number.isInteger(id) === false) {
            return res.status(400).send({
                message: "Bad Request"
            });
        }
        const gameUser = {};
        if (('hot_streak_count' in req.body) == true) {
            gameUser.hot_streak_count = req.body.hot_streak_count;
        }
        if (('nick_name' in req.body) == true) {
            gameUser.nick_name = req.body.nick_name;
        }
        await GameUser.update(gameUser, {
            where: { id: id }
        })
            .then(async rows => {
                if (rows == 1) {
                    await GameUser.findByPk(id)
                        .then(data => {
                            if (data === null) {
                                return res.status(404).send({
                                    message: 'Not Found!'
                                });
                            } else {
                                return res.send(data);
                            }
                        })
                        .catch(err => {
                            res.status(400).send({
                                message: err.message || 'Error updating GameUser'
                            });
                        });
                } else {
                    return res.status(404).send({
                        message: 'Not found!'
                    });
                }
            })
            .catch(err => {
                return res.status(400).send({
                    message: err.message || 'Error updating GameUser'
                });
            });
    }
    catch (err) {
        return res.status(500).send({
            message: err.message || 'Unexpected Error Encountered'
        });
    }
});

module.exports = router;
