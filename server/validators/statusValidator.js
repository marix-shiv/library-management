/**
 * This module exports an array of middleware functions for validating the 'status' parameter in a request.
 * 
 * The 'status' parameter is expected to be one of the following values: 'A', 'L', 'M', 'R'.
 * 
 * If the 'status' parameter is not valid, a bad request response is sent back to the client with an error message.
 */

const { param, validationResult } = require('express-validator');
const badRequestResponse = require('../utils/badRequestResponse');
const { INVALID_STATUS } = require('../constants/errorMessages');

exports.statusValidator = [
    param('status')
        .trim()
        .isIn(['A', 'L', 'M', 'R'])
        .withMessage(INVALID_STATUS),

    // Error handling middleware
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return badRequestResponse(res, '', errors.array());
        }
        next();
    }
];