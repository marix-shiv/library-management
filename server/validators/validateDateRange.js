/**
 * This module exports an array of middleware functions for validating the 'startDate' and 'endDate' parameters in the request.
 * The first two functions in the array use the express-validator library to check if the 'startDate' and 'endDate' parameters are valid dates.
 * The third function checks if the 'endDate' is later than the 'startDate'.
 * The last function in the array is an error handling middleware that checks if there were any validation errors. If there were, it sends a bad request response with the error messages.
 */

const { param, validationResult } = require('express-validator');
const badRequestResponse = require('../utils/badRequestResponse');
const { DATE_VALID } = require('../constants/errorMessages');

exports.dateRangeValidator = [
    param('startDate')
        .custom(value => {
            const date = new Date(value);
            if (isNaN(date.getTime())) {
                throw new Error(DATE_VALID);
            }
            return true;
        }),

    param('endDate')
        .custom(value => {
            const date = new Date(value);
            if (isNaN(date.getTime())) {
                throw new Error(DATE_VALID);
            }
            return true;
        }),
    
    param('endDate')
    .custom((value, { req }) => {
        const startDate = new Date(req.params.startDate);
        const endDate = new Date(value);
        if (isNaN(endDate.getTime())) {
            throw new Error(DATE_VALID);
        }
        if (endDate < startDate) {
            throw new Error('End date should not be earlier than start date');
        }
        return true;
    }),
    
    // Error handling middleware
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return badRequestResponse(res, '', errors.array());
        }
        next();
    }
]