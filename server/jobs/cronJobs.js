const cron = require('node-cron');
const cleanReservations = require('../utils/reservationCleaner');

// Schedule the cleanReservations function to run every day at 1:00 PM
const task = cron.schedule('0 13 * * *', cleanReservations);

module.exports = task;