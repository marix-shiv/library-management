const badRequestResponse = require('../utils/badRequestResponse');
const { REQUEST_BODY_EMPTY } = require('../constants/errorMessages');

module.exports = function(req, res, next) {
    if (Object.keys(req.body).length === 0) {
        return badRequestResponse(res, REQUEST_BODY_EMPTY);
    }
    next();
};