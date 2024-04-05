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
// const rateLimit = require("express-rate-limit");
require('dotenv').config();
const cors = require('cors');

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
app.set('trust proxy', true);
app.use(cors({
    origin: process.env.WEBSITE_ORIGIN, // use the origin from the environment variables
    credentials: true, // this allows cookies to be sent with requests
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// const limiter = rateLimit({
//     windowMs: 15 * 60 * 1000, // 15 minutes
//     max: 100 // limit each IP to 100 requests per windowMs
// });

// Set up your routes with the rate limiter
// app.use('/users', process.env.NODE_ENV === 'production' ? limiter : [], usersRouter);
// app.use('/genres', process.env.NODE_ENV === 'production' ? limiter : [], genresRouter);
// app.use('/authors', process.env.NODE_ENV === 'production' ? limiter : [], authorsRouter);
// app.use('/budgets', process.env.NODE_ENV === 'production' ? limiter : [], libraryBudgetRouter);
// app.use('/announcements', process.env.NODE_ENV === 'production' ? limiter : [], announcementsRouter);
// app.use('/policies', process.env.NODE_ENV === 'production' ? limiter : [], policiesRouter);
// app.use('/books', process.env.NODE_ENV === 'production' ? limiter : [], booksRouter);
// app.use('/bookinstances', process.env.NODE_ENV === 'production' ? limiter : [], bookInstancesRouter);
// app.use('/reservations', process.env.NODE_ENV === 'production' ? limiter : [], reservationsRouter);

app.use('/users', [], usersRouter);
app.use('/genres', [], genresRouter);
app.use('/authors', [], authorsRouter);
app.use('/budgets', [], libraryBudgetRouter);
app.use('/announcements', [], announcementsRouter);
app.use('/policies', [], policiesRouter);
app.use('/books', [], booksRouter);
app.use('/bookinstances', [], bookInstancesRouter);
app.use('/reservations', [], reservationsRouter);

// Serve static files from the React app in production
if (process.env.NODE_ENV === 'production') {
        // Serve any static files
        app.use(express.static(path.join(__dirname, '../client/build')));
        
        // Handle React routing, return all requests to React app
        app.get('*', function(req, res) {
            res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
        });
}
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
    // do nothing
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
        return;
    }


    // Otherwise, send the error as a response
    res.status(err.status || 500);
    res.json({error: {}});
});

module.exports = { app, knex };