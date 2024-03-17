const { body } = require('express-validator');
const { INVALID_STATUS } = require('../constants/errorMessages');
const { BOOK_INSTANCE_STATUS } = require('../constants/fieldNames');

module.exports = function validateRole() {
    return body(BOOK_INSTANCE_STATUS)
        .trim()
        .isIn(['A', 'L', 'M', 'R'])
        .withMessage(INVALID_STATUS);
}