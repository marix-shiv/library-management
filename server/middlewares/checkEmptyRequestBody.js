/**
 * This module exports a middleware function for checking if the request body is empty.
 * The function checks if the request body is empty by checking if the number of keys in the req.body object is 0.
 * If the request body is empty, the function sends a bad request response with an error message indicating that the request body is empty.
 * If the request body is not empty, the function calls the next middleware.
 */

const badRequestResponse = require('../utils/badRequestResponse');
const { REQUEST_BODY_EMPTY } = require('../constants/errorMessages');

module.exports = function(req, res, next) {
    if (Object.keys(req.body).length === 0) {
        return badRequestResponse(res, REQUEST_BODY_EMPTY);
    }
    next();
};