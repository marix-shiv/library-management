/**
 * This module exports a function that sends a 500 Internal Server Error response.
 * The function takes a response object and an error as arguments.
 * It sets the status of the response to 500 and sends a JSON response with the error message.
 */

const { INTERNAL_SERVER_ERROR } = require('../constants/httpStatusCodes');
module.exports = function errorResponse(res, message = '') {

    return res.status(INTERNAL_SERVER_ERROR).json({ message: `${ message ? message : 'Internal Server error'}` });
}