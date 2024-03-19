const request = require('supertest');
const { app } = require('./testServer'); // Import the app from testServer.js

module.exports = async function logoutUser(cookie) {
    const res = await request(app)
        .post('/users/logout')
        .set('Cookie', cookie)
        .expect(200);
    return res;
}
