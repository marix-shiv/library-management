/**
 * This module exports a function that validates the 'BOOK_INSTANCE_STATUS' field in a request body.
 * 
 * The function uses the express-validator middleware to check if the 'BOOK_INSTANCE_STATUS' field is one of the following values: 'A', 'L', 'M', 'R'.
 * 
 * If the 'BOOK_INSTANCE_STATUS' field is not one of these values, it responds with a predefined error message.
 */

const { body } = require('express-validator');
const { INVALID_STATUS } = require('../constants/errorMessages');
const { BOOK_INSTANCE_STATUS } = require('../constants/fieldNames');

module.exports = function validateRole() {
    return body(BOOK_INSTANCE_STATUS)
        .trim()
        .isIn(['A', 'L', 'M', 'R'])
        .withMessage(INVALID_STATUS);
}