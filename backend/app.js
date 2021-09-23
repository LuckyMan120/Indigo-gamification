'use strict';

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const db = require('./db/models');
const verifyUserMiddleware = require('./middleware/verifyuser');
const indexRouter = require('./routes/index');
const badgeRouter = require('./routes/badge');
const questionRouter = require('./routes/question');
const registerRouter = require('./routes/register');
const gameUserRouter = require('./routes/gameuser');
const badgesEarnedRouter = require('./routes/badgesearned');
const gameUserResponseRouter = require('./routes/gameuserresponse');
const leaderboardRouter = require('./routes/leaderboard');

const app = express();
console.log(process.env.JWT_TOKEN_SECRET);
db.sequelize.sync();
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use (function (error, req, res, next){
    //Catch json error
    res.status(400).send({
        message: 'Bad Request'
    });
});

app.use('/api/Badge', badgeRouter);
app.use('/api/Register', registerRouter);

// All routes following require the jwt cookie
app.use(verifyUserMiddleware);
app.use('/api/Question', questionRouter);
app.use('/api/GameUser', gameUserRouter);
app.use('/api/BadgesEarned', badgesEarnedRouter);
app.use('/api/GameUserResponse', gameUserResponseRouter);
app.use('/api/Leaderboard', leaderboardRouter);

module.exports = app;
