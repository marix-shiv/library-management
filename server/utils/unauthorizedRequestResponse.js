/**
 * This module exports a function that sends a 401 Unauthorized response.
 * The function takes a response object and a message as arguments.
 * It sets the status of the response to 401 and sends a JSON response with the message.
 */

const { UNAUTHORIZED } = require('../constants/httpStatusCodes');
module.exports = function unauthorizedRequestResponse(res, message = '') {
    
    return res.status(UNAUTHORIZED).json({ message: `Unauthorized${ message ? " : "+message : ''}` });
}