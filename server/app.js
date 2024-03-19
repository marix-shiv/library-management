/**
 * This module exports an Express application for the Library Management System.
 * The application is configured with middleware for logging, parsing JSON and URL-encoded bodies, and parsing cookies.
 * It also sets up routes for handling requests to the users, genres, authors, library budgets, and announcements APIs.
 * Additionally, it includes error handling middleware for catching 404 errors and other types of errors.
 * The application listens on port 3001.
 */

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
const genresRouter = require('./routes/genres');
const authorsRouter = require('./routes/authors');
const libraryBudgetRouter = require('./routes/libraryBudgets');
const announcementsRouter = require('./routes/announcements');
const policiesRouter = require('./routes/libraryPolicies');
const booksRouter = require('./routes/books');
const bookInstancesRouter = require('./routes/bookInstances');
const reservationsRouter = require('./routes/reservations');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/genres', genresRouter);
app.use('/authors', authorsRouter);
app.use('/budgets', libraryBudgetRouter);
app.use('/announcements', announcementsRouter);
app.use('/policies', policiesRouter);
app.use('/books', booksRouter);
app.use('/bookinstances', bookInstancesRouter);
app.use('/reservations', reservationsRouter);

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Load cron jobs
require('./jobs/cronJobs');

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Library API',
            version: '1.0.0',
            description: 'API for a Library Management System',
        },
        servers: [
            {
                url: 'http://localhost:3001',
            },
        ],
    },
    apis: ['./routes/*.js'],
};

try {
    const swaggerDocs = swaggerJsDoc(swaggerOptions);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs, { docExpansion: 'list' }));
} catch (error) {
    console.error('Error setting up Swagger:', error);
}

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

module.exports = { app, knex };