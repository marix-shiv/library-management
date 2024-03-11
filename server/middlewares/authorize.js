const unauthorizedRequestResponse = require('../utils/unauthorizedRequestResponse');
const forbiddenRequestResponse = require('../utils/forbiddenRequestResponse');
const { USERS_USER_ID, USERS_ROLE } = require('../constants/fieldNames');

function authorize(allowedRoles, idRequiredRoles=[]) {

    ////////////////////////////////////////////////////////////////////////////////
    ////TODO: Change req.body.user to req.user after implementing authentication////
    ////////////////////////////////////////////////////////////////////////////////
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