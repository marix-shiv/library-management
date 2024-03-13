/**
 * This module exports a middleware function that checks if the request body contains any invalid fields.
 * The function takes an array of valid fields as input, checks if the request body contains any fields not in this array, and sends a bad request response if any invalid fields are found.
 * If no invalid fields are found, the function calls the next middleware.
 */
const badRequestResponse = require('../utils/badRequestResponse');

function allowedFields(validFields) {
    return (req, res, next) => {
        const invalidFields = Object.keys(req.body).filter(field => !validFields.includes(field));

        if (invalidFields.length > 0) {
            return badRequestResponse( res , `Invalid field(s): ${invalidFields.join(', ')}` )
        }
        next();
    };
}

module.exports = allowedFields;