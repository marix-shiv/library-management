/**
 * This module exports a function that sends a 400 Bad Request response.
 * The function takes a response object, a message, and a data object as arguments.
 * It sets the status of the response to 400 and sends a JSON response with a message and the data.
 */

const { BAD_REQUEST } = require('../constants/httpStatusCodes');
module.exports = function badRequestResponse(res, msg='', data={}) {
    return res.status(BAD_REQUEST).json({
        message: `Bad Request${ msg ? " : "+msg : ''}`,
        errors: data
    });
}