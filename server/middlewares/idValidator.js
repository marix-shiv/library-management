const { param, validationResult } = require('express-validator');
const { USER_ID_REQUIRED, USER_ID_UUID } = require('../constants/errorMessages');
const badRequestResponse = require('../utils/badRequestResponse');

exports.idValidator = [
    param('id')
        .exists()
        .withMessage(USER_ID_REQUIRED)
        .isUUID()
        .withMessage(USER_ID_UUID),

    // Error handling middleware
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return badRequestResponse(res, '', errors.array());
        }
        next();
    }
];