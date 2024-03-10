/**
 * This module exports a function that sends a 404 Not Found response.
 * The function takes a response object and a message as arguments.
 * It sets the status of the response to 404 and sends a JSON response with the message.
 */

const { NOT_FOUND } = require('../constants/httpStatusCodes');
module.exports = function notFoundResponse(res, message = 'Not Found') {

    return res.status(NOT_FOUND).json({ message });
}