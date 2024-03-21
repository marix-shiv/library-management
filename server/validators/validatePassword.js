/**
 * This module exports a function that validates a password using express-validator.
 * The function returns a validation chain for the password field.
 * The validation chain checks if the password is between a minimum and maximum length, and if it matches a regular expression.
 * The regular expression checks if the password includes at least one lowercase letter, one uppercase letter, one digit, and one special character.
 * If the password does not meet these requirements, the function throws an error with a custom message.
 */

const { body } = require('express-validator');
const { USERS_PASSWORD } = require('../constants/fieldNames');
const { PASSWORD_LENGTH, PASSWORD_COMPLEXITY } = require('../constants/errorMessages');
const { PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH } = require('../constants/validationConstants');

// Checks if a password is between 8 and 64 characters long, and includes at least one lowercase letter, one uppercase letter, one digit, and one special character.
const passwordTest = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*\-_]).{8,64}$/;

module.exports = function validatePassword() {
    return body(USERS_PASSWORD)
        .isLength({ min: PASSWORD_MIN_LENGTH, max: PASSWORD_MAX_LENGTH })
        .withMessage(PASSWORD_LENGTH)
        .matches(passwordTest)
        .withMessage(PASSWORD_COMPLEXITY)   
}