/**
 * This module exports a function that validates a username using express-validator.
 * The function returns a validation chain for the username field.
 * The validation chain checks if the username is between a minimum and maximum length.
 * If the username does not meet these requirements, the function throws an error with a custom message.
 */

const { body } = require('express-validator');
const errorMessages = require('../constants/errorMessages');
const { USERNAME_MIN_LENGTH, USERNAME_MAX_LENGTH } = require('../constants/validationConstants');
const { USERS_USERNAME } = require('../constants/fieldNames');

module.exports = function validateUsername() {
    return body(USERS_USERNAME)
        .isLength({ min: USERNAME_MIN_LENGTH, max: USERNAME_MAX_LENGTH })
        .withMessage(errorMessages.USERNAME_LENGTH);
}