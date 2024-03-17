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