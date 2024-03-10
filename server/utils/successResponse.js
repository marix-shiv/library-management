/**
 * This module exports a function that sends a 200 OK response.
 * The function takes a response object, a message, and a data object as arguments.
 * It sets the status of the response to 200 and sends a JSON response with the message and the data.
 */

const { OK } = require('../constants/httpStatusCodes');

module.exports = function successResponse(res, message, data = {}) {

    return res.status(OK).json({ message, data });
    
}