const loginUser = require('../utils/loginUser');
const logoutUser = require('../utils/logoutUser');

const {startServer, stopServer} = require('../utils/testServer');
const {getRequest, postRequest, putRequest, deleteRequest} = require('../utils/testUtils');
let cookie;

beforeAll(async () => {
    await startServer();
});

afterAll(async () => {
    await logoutUser(cookie);
    await stopServer();
});

describe('Users API', () => {
    test('should log in a user', async () => {
        const res = await loginUser();
        expect(res.statusCode).toEqual(200);
        expect(res.headers).toHaveProperty('set-cookie');
        cookie = res.headers['set-cookie'];
    });

    test('should return details of all users', async () => {
        const res = await getRequest('/users', cookie);

        expect(Array.isArray(res.body)).toBeTruthy();
        res.body.forEach(user => {
            expect(user).toHaveProperty('UserID');
            expect(user).toHaveProperty('Username');
            expect(user).toHaveProperty('Role');
            expect(user).toHaveProperty('first_name');
            expect(user).toHaveProperty('last_name');
            expect(user).toHaveProperty('date_of_birth');
            expect(user).toHaveProperty('UStatus');
        });
    });
    
    test('should return details of the test user by id', async()=>{
        const res = await getRequest('/users/123e4567-e89b-12d3-a456-426614174000', cookie);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('UserID', '123e4567-e89b-12d3-a456-426614174000');
        expect(res.body).toHaveProperty('Username');
        expect(res.body).toHaveProperty('Role');
        expect(res.body).toHaveProperty('first_name');
        expect(res.body).toHaveProperty('last_name');
        expect(res.body).toHaveProperty('date_of_birth');
        expect(res.body).toHaveProperty('UStatus');
    });

    test('should return all users with first name or last name matching with "test"', async()=>{
        const res = await getRequest('/users/search/test', cookie);

        expect(Array.isArray(res.body)).toBeTruthy();
        res.body.forEach(user => {
            expect(user).toHaveProperty('UserID');
            expect(user).toHaveProperty('Username');
            expect(user).toHaveProperty('first_name');
            expect(user).toHaveProperty('last_name');
            expect(user).toHaveProperty('date_of_birth');
        });
    })

    test('should create a new user account', async () => {
        const newUser = {
            Username: 'test_username',
            Password: 'test_Password1',
            first_name: 'test_first_name',
            last_name: 'test_last_name',
            date_of_birth: '1770-01-01',
            Role: 'A'
        };
        const res = await postRequest('/users', cookie, newUser);

        expect(res.statusCode).toEqual(200);
    });

    test('should update the password of the test user', async()=>{
        const newPassword = {
            Password: 'updated_Password1'
        }

        const res = await putRequest('/users/123e4567-e89b-12d3-a456-426614174000/password', cookie, newPassword);

        expect(res.statusCode).toEqual(200);
    });

    test('should change the UStatus of the user', async()=>{
        const updatedStatus = {
            UStatus: true
        }

        const res = await putRequest('/users/123e4567-e89b-12d3-a456-426614174020/verify', cookie, updatedStatus);

        expect(res.statusCode).toEqual(200);
    })

    test('should update the details of the test user', async()=>{
        const updatedData = {
            Username: 'testingUName_1',
            first_name: 'testingFName',
            last_name: 'testingLName',
            date_of_birth: '1770-01-01',
        };

        const res = await putRequest('/users/123e4567-e89b-12d3-a456-426614174000', cookie, updatedData);

        expect(res.statusCode).toEqual(200);
    })

    test('should delete the user', async()=>{
        const res = await deleteRequest('/users/123e4567-e89b-12d3-a456-426614174020', cookie);

        expect(res.statusCode).toEqual(200);
    })
});