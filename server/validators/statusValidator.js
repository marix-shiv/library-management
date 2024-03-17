const { param, validationResult } = require('express-validator');
const badRequestResponse = require('../utils/badRequestResponse');
const { INVALID_STATUS } = require('../constants/errorMessages');

exports.statusValidator = [
    param('status')
        .trim()
        .isIn(['A', 'L', 'M', 'R'])
        .withMessage(INVALID_STATUS),

    // Error handling middleware
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return badRequestResponse(res, '', errors.array());
        }
        next();
    }
];