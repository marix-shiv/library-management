/**
 * This module exports a function that validates a UUID field in a request body.
 * 
 * The function uses the express-validator middleware to check if the field is a valid UUID or an array of valid UUIDs.
 * 
 * If the field is not a valid UUID or does not contain valid UUIDs, it responds with a predefined error message.
 */

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