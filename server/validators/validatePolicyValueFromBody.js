const { body, validationResult } = require('express-validator');
const { LIBRARY_POLICIES_VALUE, LIBRARY_POLICIES_VALUE_IS_INT } = require('../constants/fieldNames');
const { INTEGER_VALUE_INVALID, STRING_VALUE_INVALID } = require('../constants/errorMessages');
const { MONEY_MIN, MONEY_MAX, NAME_MIN_LENGTH, NAME_MAX_LENGTH } = require('../constants/validationConstants');

function validatePolicyValueFromBody(req, res, next) {
    const isInt = req.body[LIBRARY_POLICIES_VALUE_IS_INT];
    const validations = isInt ? 
        [body(LIBRARY_POLICIES_VALUE)
            .isInt({ min: MONEY_MIN, max: MONEY_MAX })
            .withMessage(INTEGER_VALUE_INVALID)] :
        [body(LIBRARY_POLICIES_VALUE)
            .isLength({min: NAME_MIN_LENGTH, max: NAME_MAX_LENGTH})
            .withMessage(STRING_VALUE_INVALID)];

    Promise.all(validations.map(validation => validation.run(req)))
        .then(() => {
            const errors = validationResult(req);
            if (errors.isEmpty()) {
                next();
            } else {
                res.status(400).json({ errors: errors.array() });
            }
        })
        .catch(next);
}

module.exports = validatePolicyValueFromBody;