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

describe('Authors API', () => {
    test('should return all authors', async () => {
        const res = await getRequest('/authors', cookie);

        expect(Array.isArray(res.body)).toBeTruthy();
        res.body.forEach(author => {
            expect(author).toHaveProperty('AuthorID');
            expect(author).toHaveProperty('FirstName');
            expect(author).toHaveProperty('LastName');
        });
    });

    test('should return top authors', async () => {
        const res = await getRequest('/authors/top', cookie);

        expect(Array.isArray(res.body)).toBeTruthy();
        res.body.forEach(author => {
            expect(author).toHaveProperty('AuthorID');
            expect(author).toHaveProperty('FirstName');
            expect(author).toHaveProperty('LastName');
        });
    });

    test('should return authors matching search query', async () => {
        const res = await getRequest('/authors/search/test', cookie);

        expect(Array.isArray(res.body)).toBeTruthy();
        res.body.forEach(author => {
            expect(author).toHaveProperty('AuthorID');
            expect(author).toHaveProperty('FirstName');
            expect(author).toHaveProperty('LastName');
        });
    });

    test('should return details of the test author by id', async () => {
        const res = await getRequest('/authors/123e4567-e89b-12d3-a456-426614174002', cookie);

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('FirstName');
        expect(res.body).toHaveProperty('LastName');
        expect(res.body).toHaveProperty('DateOfBirth');
        expect(res.body).toHaveProperty('DateOfDeath');

        // Check that the response contains an array of books
        expect(Array.isArray(res.body.Books)).toBeTruthy();
        res.body.Books.forEach(book => {
            expect(book).toHaveProperty('Title');
            expect(book).toHaveProperty('Summary');
            expect(book).toHaveProperty('BookID');
        });
    });

    test('should create a new author', async () => {
        const newAuthor = {
            FirstName: 'Test Author First Name',
            LastName: 'Test Author Last Name',
            DateOfBirth: '2020-10-10'
        };
        const res = await postRequest('/authors', cookie, newAuthor);

        expect(res.statusCode).toEqual(200);
    });

    test('should update the details of the test author', async () => {
        const updatedAuthor = {
            FirstName: 'Test Updated First Name',
            LastName: 'Test Updated Last Name',
            DateOfBirth: '2020-10-11'
        };

        const res = await putRequest('/authors/123e4567-e89b-12d3-a456-426614174002', cookie, updatedAuthor);

        expect(res.statusCode).toEqual(200);
    });

    test('should delete the author', async () => {
        const res = await deleteRequest('/authors/123e4567-e89b-12d3-a456-426614174022', cookie);

        expect(res.statusCode).toEqual(200);
    });
});