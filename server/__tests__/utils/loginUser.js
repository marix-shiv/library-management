const request = require('supertest');
const { app } = require('./testServer'); // Import the app from testServer.js

module.exports = async function loginUser() {
    const res = await request(app) // Use the imported app here
        .post('/users/login')
        .send({
            Username: "testUsername1",
            Password: 'Test@#1111'
        });

    return res;
};