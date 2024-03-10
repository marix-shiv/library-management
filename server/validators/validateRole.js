/**
 * This module exports a function that validates a role using express-validator.
 * The function returns a validation chain for the role field.
 * The validation chain checks if the role exists, if it is a certain length, and if it is one of the allowed roles.
 * If the role does not meet these requirements, the function throws an error with a custom message.
 */

const { body } = require('express-validator');
const { ROLE_REQUIRED, ROLE_LENGTH, ROLE_INVALID} = require('../constants/errorMessages');
const { ROLE_MIN_MAX_LENGTH } = require('../constants/validationConstants');
const roles = require('../constants/userRoles');
const { USERS_ROLE } = require('../constants/fieldNames');

module.exports = function validateRole() {
    return body([USERS_ROLE])
        .exists()
        .withMessage(ROLE_REQUIRED)
        .isLength({ min: ROLE_MIN_MAX_LENGTH, max: ROLE_MIN_MAX_LENGTH })
        .withMessage(ROLE_LENGTH)
        .isIn([roles.ROLE_SUPER_ADMIN, roles.ROLE_ADMIN, roles.ROLE_LIBRARIAN, roles.ROLE_USER])
        .withMessage(ROLE_INVALID)
        .escape();
}