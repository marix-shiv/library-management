/**
 * This module exports an array of middleware functions for validating the 'query' parameter in the request.
 * The first function in the array uses the express-validator library to check if the 'query' parameter exists, if it is within the minimum and maximum length, and to trim it.
 * The second function in the array is an error handling middleware that checks if there were any validation errors. If there were, it sends a bad request response with the error messages.
 */

const { param, validationResult } = require('express-validator');
const badRequestResponse = require('../utils/badRequestResponse');
const { NAME_MIN_LENGTH, NAME_MAX_LENGTH } = require('../constants/validationConstants');
const { NAME_LENGTH } = require('../constants/errorMessages');


exports.queryValidator = [
    param('query')
        .trim()
        .isLength({ min: NAME_MIN_LENGTH, max: NAME_MAX_LENGTH })
        .withMessage(NAME_LENGTH),

    // Error handling middleware
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return badRequestResponse(res, '', errors.array());
        }
        next();
    }
];