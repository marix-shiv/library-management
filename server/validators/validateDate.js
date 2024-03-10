/**
 * This module exports a function that validates a date using express-validator.
 * The function takes a field name as an argument and returns a validation chain for that field.
 * The validation chain checks if the field value is a valid date.
 * If the field value is not a valid date, it throws an error with a custom message.
 */

const { body } = require('express-validator');
const { DATE_VALID } = require('../constants/errorMessages');

module.exports = function validateDate(field) {
    return body(field)
        .custom(value => {
            const date = new Date(value);
            if (isNaN(date.getTime())) {
                throw new Error(DATE_VALID);
            }
            return true;
        });
}