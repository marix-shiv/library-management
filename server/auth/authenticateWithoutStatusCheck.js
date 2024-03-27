const jwt = require('jsonwebtoken');
const badRequestResponse = require('../utils/badRequestResponse');
const { ACCESS_DENIED, INVALID_TOKEN } = require('../constants/errorMessages');
const unauthorizedRequestResponse = require('../utils/unauthorizedRequestResponse');
require('dotenv').config();

function authenticateWithoutStatusCheck(req, res, next) {
    const token = req.cookies.token;
    if (!token) return unauthorizedRequestResponse(res, ACCESS_DENIED);

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (ex) {
        return badRequestResponse(res, INVALID_TOKEN);
    }
}

module.exports = authenticateWithoutStatusCheck;