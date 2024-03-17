/**
 * This module exports a function that validates the 'maintenanceDays' field in a request body if required.
 * 
 * The function checks if the policy in the request is the 'MAINTENANCE_DAYS' policy. If it is, it calls the 'validateMaintenanceDays' function to validate the 'maintenanceDays' field.
 * 
 * If the policy in the request is not the 'MAINTENANCE_DAYS' policy, or if the 'maintenanceDays' field is valid, it calls the next middleware function.
 * If the 'maintenanceDays' field is not valid, the 'validateMaintenanceDays' function sends a response with an error message.
 */

const { LIBRARY_POLICIES_PROPERTY } = require('../constants/fieldNames');
const { MAINTENANCE_DAYS } = require('../constants/policyConstants');
const validateMaintenanceDays = require('../validators/validateDays');

module.exports = function validateMaintenanceDaysIfRequired(req, res, next) {
    const policy = req.policy;

    if (policy && policy[LIBRARY_POLICIES_PROPERTY] === MAINTENANCE_DAYS) {
        return validateMaintenanceDays()(req, res, next);
    }

    next();
}