const { body } = require('express-validator');
const LibraryPolicy = require('../models/librarypolicies');
const { LIBRARY_POLICIES_VALUE, LIBRARY_POLICIES_VALUE_IS_INT } = require('../constants/fieldNames');
const { INTEGER_VALUE_INVALID, STRING_VALUE_INVALID } = require('../constants/errorMessages');
const { MONEY_MIN, MONEY_MAX, NAME_MIN_LENGTH, NAME_MAX_LENGTH } = require('../constants/validationConstants');
const notFoundResponse = require('../utils/notFoundResponse');
const errorResponse = require('../utils/errorResponse');

function validatePolicyValue(isInt) {
    if (isInt) {
        return [
            body(LIBRARY_POLICIES_VALUE)
                .isInt({ min: MONEY_MIN, max: MONEY_MAX })
                .withMessage(INTEGER_VALUE_INVALID)
        ];
    } else {
        return [
            body(LIBRARY_POLICIES_VALUE)
                .isLength({min: NAME_MIN_LENGTH, max: NAME_MAX_LENGTH})
                .withMessage(STRING_VALUE_INVALID)
        ];
    }
}

module.exports = async (req, res, next) => {
    try {
        req.policy = await LibraryPolicy
            .query()
            .findById(req.params.id);
        
        if (!req.policy) {
            return notFoundResponse(res, 'Policy not found.');
        }
        if (!req.body.hasOwnProperty(LIBRARY_POLICIES_VALUE)) {
            return next();
        }
        const validations = validatePolicyValue(req.policy[LIBRARY_POLICIES_VALUE_IS_INT]);
        await Promise.all(validations.map(validation => validation.run(req)));
        next();
    } catch (err) {
        return errorResponse(res, err.message);
    }
};