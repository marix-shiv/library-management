const task = require('../../jobs/cronJobs'); // Import the cron job
const { app, knex } = require('../../app'); // Import the app and the knex instance from app.js

let server;

function startServer() {
    return new Promise((resolve) => {
        server = app.listen(3001, resolve);
    });
}

function stopServer() {
    return new Promise((resolve) => {
        server.close(async () => {
            task.stop(); // Stop the cron job
            await knex.destroy(); // Destroy the Knex instance
            resolve();
        });
    });
}

module.exports = { app, startServer, stopServer };