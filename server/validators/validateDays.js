/**
 * This module exports a function that validates the 'value' field in a request body, which is expected to contain a list of maintenance days.
 * 
 * The function uses the express-validator middleware to check if the 'value' field contains only valid day names.
 * The valid day names are defined in the 'daysOfWeek.js' constants file.
 * 
 * If the 'value' field contains any invalid day names, it responds with a predefined error message.
 */

const { body } = require('express-validator');
const { MAINTENANCE_DAYS_INVALID } = require('../constants/errorMessages');
const { LIBRARY_POLICIES_VALUE } = require('../constants/fieldNames.js');
const daysConstantsObject = require('../constants/daysOfWeek.js');
const daysConstants = Object.values(daysConstantsObject);

module.exports = function validateMaintenanceDays() {
    return body(LIBRARY_POLICIES_VALUE)
        .custom((value) => {

            // Split the value by comma and remove leading/trailing whitespace
            const days = value.split(',').map(day => day.trim());

            // Check if all days are in the daysConstants array
            return days.every(day => daysConstants.includes(day));
        })
        .withMessage(MAINTENANCE_DAYS_INVALID);
}