/**
 * This module exports a function that increments a date by one day.
 * The function takes a date string as input, creates a new Date object, increments the date by one day, and returns the new date as a string in 'YYYY-MM-DD' format.
 */
function incrementDate(dateString) {
    const date = new Date(dateString);
    date.setDate(date.getDate() + 1);
    return date.toISOString().split('T')[0];
}

module.exports = incrementDate;