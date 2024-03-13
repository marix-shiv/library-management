/**
 * Validates the 'page' parameter in the URL using express-validator.
 * Ensures that the 'page' parameter is an integer greater than or equal to 1.
 * Sends a 400 Bad Request response with validation errors if validation fails.
 */

const { query, validationResult } = require('express-validator');
const errorMessages = require('../constants/errorMessages');
const badRequestResponse = require('../utils/badRequestResponse');
const { PAGE_MIN_LENGTH } = require('../constants/validationConstants');


exports.validatePage = [
    query('page')
        .optional()
        .isInt({ min: PAGE_MIN_LENGTH })
        .withMessage(errorMessages.INVALID_PAGE_NUMBER)
        .toInt(),

    // Error handling middleware
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return badRequestResponse(res, '', errors.array());
        }
        next();
    }
];

