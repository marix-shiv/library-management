/**
 * This module exports a function that sets a JWT token as a cookie in the user's browser.
 * The function takes the response object and the token as parameters.
 * The cookie is set to be httpOnly to prevent access from client-side scripts, secure to ensure it's only sent over HTTPS, sameSite to mitigate CSRF attacks, and maxAge to set the cookie's lifetime.
 */

module.exports = function setTokenCookie(res, token) {
    const isProduction = process.env.NODE_ENV === 'production';
    res.cookie('token', token, {
        httpOnly: true,
        secure: isProduction, // Only use secure in production
        sameSite: isProduction ? 'none' : 'lax', // Use 'lax' in development
        maxAge: 3600000 // 1 hour in milliseconds
    });
}