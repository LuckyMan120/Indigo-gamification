'use strict';

const express = require('express');
const router = express.Router();
const db = require('../db/models');
const Badge = db.Badge;

router.get('/', async function (req, res, next) {
    try {
        await Badge.findAll()
            .then(data => {
                return res.send(data);
            })
            .catch(err => {
                return res.status(500).send({
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

module.exports = router;
