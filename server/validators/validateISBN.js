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