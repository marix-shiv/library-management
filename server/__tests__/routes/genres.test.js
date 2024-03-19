const loginUser = require('../utils/loginUser');
const logoutUser = require('../utils/logoutUser');

const {startServer, stopServer} = require('../utils/testServer');
const {getRequest, postRequest, putRequest, deleteRequest} = require('../utils/testUtils');
let cookie;

beforeAll(async () => {
    await startServer();
    const res = await loginUser();
    cookie = res.headers['set-cookie'];
});

afterAll(async () => {
    await logoutUser(cookie);
    await stopServer();
});

describe('Genres API', () => {
    test('should return all genres', async () => {
        const res = await getRequest('/genres', cookie);

        expect(Array.isArray(res.body)).toBeTruthy();
        res.body.forEach(genre => {
            expect(genre).toHaveProperty('GenreID');
            expect(genre).toHaveProperty('Name');
        });
    });

    test('should return top genres', async () => {
        const res = await getRequest('/genres/top', cookie);

        expect(Array.isArray(res.body)).toBeTruthy();
        res.body.forEach(genre => {
            expect(genre).toHaveProperty('GenreID');
            expect(genre).toHaveProperty('Name');
        });
    });

    test('should return genres matching search query', async () => {
        const res = await getRequest('/genres/search/test', cookie);

        expect(Array.isArray(res.body)).toBeTruthy();
        res.body.forEach(genre => {
            expect(genre).toHaveProperty('GenreID');
            expect(genre).toHaveProperty('Name');
        });
    });

    test('should return details of the test genre by id', async () => {
        const res = await getRequest('/genres/123e4567-e89b-12d3-a456-426614174001', cookie);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('Name');

        // Check that the response contains books
        Object.values(res.body).forEach(book => {
            if (typeof book === 'object' && book !== null) {
                expect(book).toHaveProperty('Title');
                expect(book).toHaveProperty('BookID');
            }
        });
    });

    test('should create a new genre', async () => {
        const newGenre = {
            Name: 'test genre 2'
        };
        const res = await postRequest('/genres', cookie, newGenre);

        expect(res.statusCode).toEqual(200);
    });

    test('should update the name of the test genre', async () => {
        const updatedGenre = {
            Name: 'updated genre name 1'
        };

        const res = await putRequest('/genres/123e4567-e89b-12d3-a456-426614174001', cookie, updatedGenre);

        expect(res.statusCode).toEqual(200);
    });

    test('should delete the genre', async () => {
        const res = await deleteRequest('/genres/123e4567-e89b-12d3-a456-426614174021', cookie);

        expect(res.statusCode).toEqual(200);
    });
});