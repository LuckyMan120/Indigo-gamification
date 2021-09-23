'use strict';

const express = require('express');
const router = express.Router();
const db = require('../db/models');
const GameUser = db.GameUser;
const jwt = require('jsonwebtoken');

const generateToken = (id, nick_name) => {
    return jwt.sign({ id, nick_name }, process.env.JWT_TOKEN_SECRET);
};

router.post('/', async function (req, res, next) {
    try {
        const gameUser = {
            full_name: req.body.full_name,
            company: req.body.company,
            email: req.body.email,
            microsoft_partner_network_id: req.body.microsoft_partner_network_id,
            hot_streak_count: req.body.hot_streak_count || 0,
            point_total: 50,
        };

        await GameUser.create(gameUser)
            .then(data => {
                const token = generateToken(data.id, data.nick_name);
                const today = new Date();
                let expires = new Date();
                expires.setDate(today.getDate()+30);
                res.cookie('jwt', token, {
                    expires: expires,
                    secure: false,
                    httpOnly: false,
                });
                return res.send(data);
            })
            .catch(err => {
                if (err.message == 'Validation error') {
                    const specific_error = err.errors[0];
                    if (specific_error.type == 'unique violation') {
                        return res.status(403).send({
                            //message: 'GameUser already exists!'
                            // updated to a user friendly message
                            message: 'This nickname is already taken, please try a new one'
                        });
                    }
                }
                return res.status(400).send({
                    message: err.message || 'Error creating GameUser'
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
