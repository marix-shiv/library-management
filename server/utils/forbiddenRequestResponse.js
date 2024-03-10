/**
 * This module exports a function that sends a 403 Forbidden response.
 * The function takes a response object and a message as arguments.
 * It sets the status of the response to 403 and sends a JSON response with the message.
 */

const { FORBIDDEN } = require('../constants/httpStatusCodes');
module.exports = function forbiddenRequestResponse(res, message = '') {
    
    return res.status(FORBIDDEN).json({ message: `Forbidden${ message ? " : "+message : ''}` });
}