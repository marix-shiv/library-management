/**
 * This module exports a function that validates a boolean field in a request body.
 * 
 * The function uses the express-validator middleware to check if the field is a boolean.
 * If the field is not a boolean, it responds with a predefined error message.
 * If the field is a boolean, it converts the field to a boolean data type (in case it was sent as a string).
 */

const { body } = require('express-validator');
const { BOOLEAN_FIELD_INVALID } = require('../constants/errorMessages');

module.exports = function validateBooleanField(field) {
    return body(field)
        .isBoolean()
        .withMessage(BOOLEAN_FIELD_INVALID)
        .toBoolean();
}