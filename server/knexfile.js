/**
 * This module exports an object that contains configuration for the Knex.js library.
 * The configuration object includes settings for the development environment.
 * It specifies the database client to use (MySQL), the connection details (host, user, password, database), and the directory for migration files.
 * The connection details are loaded from environment variables using the dotenv library.
 */

require('dotenv').config();
module.exports = {
    development: {
        client: 'mysql',
        connection: {
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        },
        migrations: {
            directory: './migrations'
        }
    }
};