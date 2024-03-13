/**
 * This module exports a middleware function for validating the 'id' parameter in the request.
 * The function uses the express-validator library to check if the 'id' parameter exists and if it is a valid UUID.
 * If the 'id' parameter does not exist or is not a valid UUID, the function sends a bad request response with an error message.
 * If the 'id' parameter exists and is a valid UUID, the function calls the next middleware.
 */

const { param, validationResult } = require('express-validator');
const { USER_ID_REQUIRED, USER_ID_UUID } = require('../constants/errorMessages');
const badRequestResponse = require('../utils/badRequestResponse');

exports.idValidator = [
    param('id')
        .exists()
        .withMessage(USER_ID_REQUIRED)
        .isUUID()
        .withMessage(USER_ID_UUID),

    // Error handling middleware
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return badRequestResponse(res, '', errors.array());
        }
        next();
    }
];