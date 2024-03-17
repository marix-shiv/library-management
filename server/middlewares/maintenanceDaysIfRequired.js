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