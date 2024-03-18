const express = require('express');
const router = require('../../routes/announcements');
const { checkResponseStatus } = require('../utils/testUtils');

const app = express();
app.use(express.json());
app.use('/', router);

let server;

beforeAll(() => {
    server = app.listen(3001);
});

afterAll(done => {
    server.close(done);
});

describe('Announcements API', () => {
    it('should fetch all announcements', async () => {
        const res = await checkResponseStatus('/', 200);
        expect(Array.isArray(res.body)).toBeTruthy();
    });
});