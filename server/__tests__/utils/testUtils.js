const request = require('supertest');
const { app } = require('./testServer'); // Import the app from testServer.js


async function getRequest(url, cookie) {
    const res = await request(app)
        .get(url)
        .set('Cookie', cookie);
    return res;
}

async function postRequest(url, cookie, data){
    const res = await request(app)
        .post(url)
        .send(data)
        .set('Cookie', cookie);
    return res;
}

async function putRequest(url, cookie, data){
    const res = await request(app)
        .put(url)
        .send(data)
        .set('Cookie', cookie);
    return res;
}

async function deleteRequest(url, cookie){
    const res = await request(app)
        .delete(url)
        .set('Cookie', cookie)
    return res;
}

module.exports = {
    getRequest,
    postRequest,
    putRequest,
    deleteRequest
};