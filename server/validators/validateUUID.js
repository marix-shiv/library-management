const { body } = require('express-validator');
const { USER_ID_UUID } = require('../constants/errorMessages');
const validator = require('validator');

module.exports = function validateID(field) {
    return body(field)
        .custom(value => {
            if (Array.isArray(value)) {
                return value.every(id => validator.isUUID(id));
            }
            else {
                return validator.isUUID(value);
            }
        })
        .withMessage(USER_ID_UUID);
}