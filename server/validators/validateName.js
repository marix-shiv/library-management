/**
 * This module exports a function that validates a name using express-validator.
 * The function takes a field name as an argument and returns a validation chain for that field.
 * The validation chain checks if the field value is between a minimum and maximum length.
 * If the field value is not within the valid length range, it throws an error with a custom message.
 */

const { body } = require('express-validator');
const { NAME_LENGTH } = require('../constants/errorMessages');
const { NAME_MIN_LENGTH, NAME_MAX_LENGTH } = require('../constants/validationConstants');

module.exports = function validateName(field) {
    return body(field)
        .isLength({ min: NAME_MIN_LENGTH, max: NAME_MAX_LENGTH })
        .withMessage(NAME_LENGTH);
}