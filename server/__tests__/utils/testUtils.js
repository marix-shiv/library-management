const request = require('supertest');
const app = require('../../app');

async function checkResponseStatus(url, expectedStatus, token) {
    const req = request(app).get(url);
    if (token) {
        req.set('Cookie', [`token=${token}`]);
    }
    const res = await req;
    expect(res.statusCode).toEqual(expectedStatus);
    return res;
}

module.exports = {
    checkResponseStatus,
};