/**
 * This module exports an array of middleware functions for validating the 'minMoney' and 'maxMoney' parameters in the request.
 * The first two functions in the array use the express-validator library to check if the 'minMoney' and 'maxMoney' parameters exist, if they are integers within the minimum and maximum limits, and convert them to integers.
 * The third function checks if the 'maxMoney' is greater than the 'minMoney'.
 * The last function in the array is an error handling middleware that checks if there were any validation errors. If there were, it sends a bad request response with the error messages.
 */

const { param, validationResult } = require('express-validator');
const badRequestResponse = require('../utils/badRequestResponse');
const { MONEY_REQUIRED, MONEY_VALID, MONEY_RANGE_INVALID } = require('../constants/errorMessages');
const { MONEY_MIN, MONEY_MAX } = require('../constants/validationConstants');

exports.moneyRangeValidator = [
    param('minMoney')
        .exists()
        .withMessage(MONEY_REQUIRED)
        .isInt({ min: MONEY_MIN, max: MONEY_MAX })
        .withMessage(MONEY_VALID)
        .toInt(),

    param('maxMoney')
        .exists()
        .withMessage(MONEY_REQUIRED)
        .isInt({ min: MONEY_MIN, max: MONEY_MAX })
        .withMessage(MONEY_VALID)
        .custom((value, { req }) => {
            if (value < req.params.minMoney) {
                throw new Error(MONEY_RANGE_INVALID);
            }
            return true;
        })
        .toInt(),
    
    // Error handling middleware
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return badRequestResponse(res, '', errors.array());
        }
        next();
    }
]