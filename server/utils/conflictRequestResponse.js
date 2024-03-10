/**
 * This module exports a function that sends a 409 Conflict response.
 * The function takes a response object and a message as arguments.
 * It sets the status of the response to 409 and sends a JSON response with the message.
 */

const { CONFLICT } = require('../constants/httpStatusCodes');
module.exports = function conflictRequestResponse(res, message = '') {
    
    return res.status(CONFLICT).json({ message: `Conflict${ message ? " : "+message : ''}` });
}