/**
 * This module exports a function that generates a JWT (JSON Web Token) for a user.
 * The function takes a user object as input, which should include the user's ID, username, and role.
 * It uses these properties to create a payload for the JWT.
 * The JWT is signed with a secret key, which is loaded from an environment variable.
 * The resulting token is returned by the function.
 * If an error occurs during this process, it is logged to the console.
 */

const jwt = require('jsonwebtoken');
require('dotenv').config();
const { USERS_USER_ID, USERS_USERNAME, USERS_ROLE, USERS_STATUS } = require('../constants/fieldNames');

module.exports = function generateToken(user) {
    try {
        const payload = { 
            [USERS_USER_ID]: user[USERS_USER_ID], 
            [USERS_USERNAME]: user[USERS_USERNAME], 
            [USERS_ROLE]: user[USERS_ROLE],
            [USERS_STATUS]: user[USERS_STATUS]
        };
        const secret = process.env.JWT_SECRET;
        const token = jwt.sign(payload, secret, { expiresIn: '1h' });
        return token;
    } catch (err) {
        console.error(err);
    }
}