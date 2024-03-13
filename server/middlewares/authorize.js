/**
 * This module exports a middleware function for authorizing HTTP requests based on user roles.
 * The function checks if the user's role is in the allowedRoles array and if the user's role is in the idRequiredRoles array.
 * If the user's role is not in the allowedRoles array or the user's role is in the idRequiredRoles array but the user's id does not match the id in the request parameters, the function sends a forbidden response.
 * If the user's role is in the allowedRoles array and either the user's role is not in the idRequiredRoles array or the user's id matches the id in the request parameters, the function calls the next middleware.
 */

const unauthorizedRequestResponse = require('../utils/unauthorizedRequestResponse');
const forbiddenRequestResponse = require('../utils/forbiddenRequestResponse');
const { USERS_USER_ID, USERS_ROLE } = require('../constants/fieldNames');

function authorize(allowedRoles, idRequiredRoles=[]) {
        return (req, res, next) => {
        // Check if req.body.user exists
        if (!req.user) {
            return unauthorizedRequestResponse(res);
        }

        // Check if the user's role is in the allowedRoles array
        if (!allowedRoles.includes(req.user[USERS_ROLE])) {
            return forbiddenRequestResponse(res);
        }

        // Check if the user's role is in the idRequiredRoles array
        if (idRequiredRoles.includes(req.user[USERS_ROLE]) && req.user[USERS_USER_ID] !== req.params.id) {
            return forbiddenRequestResponse(res);
        }

        // If the user passed both checks, call the next middleware
        next();
    };
}

module.exports = authorize;