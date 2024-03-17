/**
 * This module exports a function that validates the 'ISBN' field in a request body.
 * 
 * The function uses the express-validator middleware to check if the 'ISBN' field is an integer and if it has the correct length.
 * The correct length is defined in the 'validationConstants.js' constants file.
 * 
 * If the 'ISBN' field is not an integer or does not have the correct length, it responds with a predefined error message.
 */

const { body } = require('express-validator');
const { ISBN_INVALID } = require('../constants/errorMessages');
const { ISBN_MIN_MAX_LENGTH } = require('../constants/validationConstants');

module.exports = function validateISBN(field) {
    return body(field)
        .isInt()
        .withMessage(ISBN_INVALID)
        .bail()
        .isLength({ min: ISBN_MIN_MAX_LENGTH, max: ISBN_MIN_MAX_LENGTH })
        .withMessage(ISBN_INVALID);
}