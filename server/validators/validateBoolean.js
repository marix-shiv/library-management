const { body } = require('express-validator');
const { BOOLEAN_FIELD_INVALID } = require('../constants/errorMessages');

module.exports = function validateBooleanField(field) {
    return body(field)
        .isBoolean()
        .withMessage(BOOLEAN_FIELD_INVALID)
        .toBoolean();
}