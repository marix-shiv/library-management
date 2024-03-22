/**
 * This module exports a middleware function that authenticates the user based on a JWT token.
 * 
 * The function retrieves the JWT token from the 'authorization' header or the 'token' cookie in the request.
 * If the token is not present, it sends a forbidden request response with an 'Access Denied' message.
 * 
 * If the token is present, it verifies the token using the JWT secret from the environment variables.
 * If the token is valid, it decodes the token to get the user data and adds it to the request object, then calls the next middleware function.
 * If the token is not valid, it sends a bad request response with an 'Invalid Token' message.
 */

const jwt = require('jsonwebtoken');
const badRequestResponse = require('../utils/badRequestResponse');
const forbiddenRequestResponse = require('../utils/forbiddenRequestResponse');
const { ACCESS_DENIED, INVALID_TOKEN, USER_NOT_VERIFIED } = require('../constants/errorMessages');
const { USERS_STATUS } = require('../constants/fieldNames');
const unauthorizedRequestResponse = require('../utils/unauthorizedRequestResponse');
require('dotenv').config();

function authenticate(req, res, next) {
    // if (req.path === '/api-docs') {
    //     return next();
    // }
    const token = req.cookies.token;
    if (!token) return unauthorizedRequestResponse(res, ACCESS_DENIED);

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        if (!decoded[USERS_STATUS]) {
            return forbiddenRequestResponse(res, USER_NOT_VERIFIED);
        }
        next();
    } catch (ex) {
        return badRequestResponse(res, INVALID_TOKEN);
    }
}

module.exports = authenticate;