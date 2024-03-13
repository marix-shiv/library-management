/**
 * This module exports a function for validating the 'description' field in the request body.
 * The function uses the express-validator library to check if the 'description' field exists, if it is within the minimum and maximum length, and to trim and escape it to prevent SQL injection attacks.
 * If the 'description' field does not meet these conditions, the function sends a bad request response with an error message.
 */

const { body } = require('express-validator');
const { DESC_REQUIRED, DESC_LENGTH } = require('../constants/errorMessages');
const { DESC_MIN, DESC_MAX } = require('../constants/validationConstants');

module.exports = function validateMoney(field) {
    return body(field)
        .exists()
        .withMessage(DESC_REQUIRED)
        .isLength({ min: DESC_MIN, max: DESC_MAX })
        .withMessage(DESC_LENGTH)
        .trim()
        .escape()
}