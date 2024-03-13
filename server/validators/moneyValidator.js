/**
 * This module exports a function for validating the 'money' field in the request body.
 * The function uses the express-validator library to check if the 'money' field exists, if it is an integer within the minimum and maximum limits, and converts it to an integer.
 * If the 'money' field does not meet these conditions, the function sends a bad request response with an error message.
 */

const { body } = require('express-validator');
const { MONEY_REQUIRED, MONEY_VALID } = require('../constants/errorMessages');
const { MONEY_MIN, MONEY_MAX } = require('../constants/validationConstants');
const { LIBRARY_BUDGET_MONEY } = require('../constants/fieldNames');

module.exports = function validateMoney() {
    return body([LIBRARY_BUDGET_MONEY])
        .exists()
        .withMessage(MONEY_REQUIRED)
        .isInt({ min: MONEY_MIN, max: MONEY_MAX })
        .withMessage(MONEY_VALID)
        .toInt();
}