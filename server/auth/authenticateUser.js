const jwt = require('jsonwebtoken');
const badRequestResponse = require('../utils/badRequestResponse');
const forbiddenRequestResponse = require('../utils/forbiddenRequestResponse');
const { ACCESS_DENIED, INVALID_TOKEN } = require('../constants/errorMessages');
require('dotenv').config();

function authenticate(req, res, next) {
    const token = req.headers['authorization'] || req.cookies.token;
    if (!token) return forbiddenRequestResponse(res, ACCESS_DENIED);

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (ex) {
        return badRequestResponse(res, INVALID_TOKEN);
    }
}

module.exports = authenticate;