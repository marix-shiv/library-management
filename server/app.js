const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const Knex = require('knex');
const { Model } = require('objection');
const knexConfig = require('./knexfile');
require('dotenv').config();

const knex = Knex(knexConfig.development);
Model.knex(knex);

// const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users')


const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // If a response has already been sent, log the error and return
    if (res.headersSent) {
        console.error(err);
        return;
    }

    // Otherwise, send the error as a response
    res.status(err.status || 500);
    res.json({error: err});
});

const server = app.listen(3001, () => {
    console.log(`Server is running on port 3001`);
});

module.exports = app;