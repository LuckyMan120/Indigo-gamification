'use strict';

const express = require('express');
const { sequelize } = require('../db/models');
const router = express.Router();
const db = require('../db/models');
const BadgesEarned = db.BadgesEarned;

router.get('/', async function (req, res, next) {
    try {
        const game_user_id =  parseInt(req.user.id);
        if (Number.isInteger(game_user_id) === false) {
            return res.status(400).send({
                message: "Bad Request"
            });
        }
        await BadgesEarned.findAll({
            where: {
                game_user_id: game_user_id,
            },
            order: ['badge_id'],
        })
            .then(data => {
                return res.send(data);
            })
            .catch(err => {
                return res.status(400).send({
                    message: err.message || 'Error fetching data'
                });
            });
    }
    catch (err) {
        return res.status(500).send({
            message: err.message || 'Unexpected Error Encountered'
        });
    }
});

router.post('/:badge_id', async function (req, res, next) {
    try {
        const game_user_id =  parseInt(req.user.id);
        const badge_id = parseInt(req.params.badge_id);
        const badgeEarned = {
            game_user_id: game_user_id,
            badge_id: badge_id,
        };
        if ((Number.isInteger(game_user_id) === false) || (Number.isInteger(badge_id) === false)) {
            return res.status(400).send({
                message: "Bad Request"
            });
        }
        await BadgesEarned.create(badgeEarned)
            .then(data => {
                return res.send(data);
            })
            .catch(async () => {
                await BadgesEarned.findAll({
                    where: {
                        game_user_id: game_user_id,
                        badge_id: badge_id,
                    }
                })
                    .then(data => {
                        return res.send(data);
                    })
                    .catch(err => {
                        return res.status(400).send({
                            message: err.message || 'Error fetching data'
                        });
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
