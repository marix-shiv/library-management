/**
 * This module exports functions that handle requests to the books resource.
 * 
 * The functions handle the following requests:
 * - GET all books
 * - GET books by search query
 * - GET a specific book by its ID
 * - POST a new book
 * - PATCH an existing book
 * - DELETE a book
 * - GET top books based on their status
 * 
 * Each function is an array of middleware functions that are called in order.
 * The middleware functions authenticate the user, authorize the user based on their role, validate and sanitize the request parameters and body, and handle the request.
 * 
 * The functions use the Book, Author, Genre, BooksGenres, and BookInstance models to interact with the database.
 * They also use utility functions to send responses and handle errors.
 */

const Book = require('../models/books');
const Author = require('../models/authors');
const Genre = require('../models/genres');
const BooksGenres = require('../models/booksGenres');
const BookInstance = require('../models/bookinstance');
const asyncHandler = require('express-async-handler');
const {v4: uuidv4} = require('uuid');

// Middleware Functions
const {idValidator} = require('../middlewares/idValidator');
const checkEmptyRequestBody = require('../middlewares/checkEmptyRequestBody');
const validateAndSanitize = require('../middlewares/bodyValidator');
const authorize = require('../middlewares/authorize');

// Utility Functions
const hashPassword = require('../utils/passwordHasher');
const verifyPassword = require('../utils/verifyPassword');
const errorResponse = require('../utils/errorResponse');
const notFoundResponse = require('../utils/notFoundResponse');
const successResponse = require('../utils/successResponse');
const badRequestResponse = require('../utils/badRequestResponse');
const conflictRequestResponse = require('../utils/conflictRequestResponse');
const allowedFields = require('../utils/allowedFields');
const incrementDate = require('../utils/incrementDate');

// Constants
const userRoles = require('../constants/userRoles');
const { USERS_USER_ID, USERS_USERNAME, USERS_PASSWORD, USERS_SALT, USERS_ROLE, USERS_FIRST_NAME, USERS_LAST_NAME, USERS_DATE_OF_BIRTH, USERS_STATUS, BOOKS_BOOK_ID, BOOKS_AUTHOR_ID, BOOKS_TITLE, BOOKS_SUMMARY, BOOKS_ISBN, BOOKS_GENRE_ID, AUTHORS_FIRST_NAME, AUTHORS_LAST_NAME, BOOKS_GENRES_GENRE_ID, GENRES_NAME, AUTHORS_AUTHOR_ID, BOOKS_GENRES_BOOK_ID, GENRES_GENRE_ID, BOOK_INSTANCE_BOOK_ID, BOOK_INSTANCE_STATUS } = require('../constants/fieldNames');
const unauthorizedRequestResponse = require('../utils/unauthorizedRequestResponse');
const {PAGINATION_LIMIT} = require('../constants/paginationConstants');

// Authentication Middlewares and Functions
const authenticate = require('../auth/authenticateUser');
const generateToken = require('../auth/generateToken');
const setTokenCookie = require('../auth/setTokenCookie');
const { queryValidator } = require('../validators/queryValidator');
const { validatePage } = require('../validators/validatePage');

exports.all_books = [
    authenticate,

    ...validatePage,

    asyncHandler(async(req, res, next)=>{
        try{
            const selectedFields = [BOOKS_BOOK_ID, BOOKS_AUTHOR_ID, BOOKS_TITLE, BOOKS_SUMMARY];
            const offset = (req.query.page - 1 || 0) * PAGINATION_LIMIT;
            
            const books = await Book
                .query()
                .select(selectedFields)
                .limit(PAGINATION_LIMIT)
                .offset(offset);

            return res.json(books);
        }
        catch (err) {
            return errorResponse(res, err.message);
        }
    })
]
// Search Books
exports.search_books = [
    authenticate,

    ...queryValidator,

    ...validatePage,

    asyncHandler(async(req, res, next)=>{
        const selectedFields = [BOOKS_BOOK_ID, BOOKS_AUTHOR_ID, BOOKS_TITLE, BOOKS_SUMMARY];
        const query = req.params.query;
        const offset = (req.query.page - 1 || 0) * PAGINATION_LIMIT;

        const books = await Book
            .query()
            .select(selectedFields)
            .where(BOOKS_TITLE, 'like', `%${query}%`)
            .orderByRaw(`LOCATE(?, ${BOOKS_TITLE})`, [query])
            .orderByRaw(`${BOOKS_TITLE} desc`)
            .offset(offset)
            .limit(PAGINATION_LIMIT);
        
        
        
        if(!books || books.length === 0){
            return notFoundResponse(res);
        }
            
        return res.json(books);
    })
]

exports.top_books = [
    authenticate,

    ...validatePage,

    asyncHandler(async(req, res, next)=>{
        const offset = (req.query.page - 1 || 0) * PAGINATION_LIMIT;
        const selectedFields = [BOOKS_BOOK_ID, BOOKS_AUTHOR_ID, BOOKS_TITLE, BOOKS_SUMMARY];

        const topBooks = await BookInstance
            .query()
            .select(BOOK_INSTANCE_BOOK_ID)
            .count(`${BOOK_INSTANCE_STATUS} as count`)
            .whereIn(BOOK_INSTANCE_STATUS, ['L', 'R'])
            .groupBy(BOOK_INSTANCE_BOOK_ID)
            .orderBy('count', 'desc')
            .offset(offset)
            .limit(PAGINATION_LIMIT);

        const booksDetails = await Promise.all(topBooks.map( async (book)=>{
            return await Book
                .query()
                .findById(book[BOOKS_BOOK_ID])
                .select(selectedFields);
        }));

        res.json(booksDetails);
    })
]

exports.book_details = [
    authenticate,

    ...idValidator,

    asyncHandler(async(req, res, next)=>{
        try{
            const bookFields = [BOOKS_TITLE, BOOKS_SUMMARY, BOOKS_AUTHOR_ID, BOOKS_ISBN];
            const authorFields = [AUTHORS_FIRST_NAME, AUTHORS_LAST_NAME];
            const booksGenresFields = [BOOKS_GENRES_GENRE_ID];
            const genresFields = [GENRES_NAME];

            const bookDetails = await Book
                .query()
                .findById(req.params.id)
                .select(bookFields)

            if (!bookDetails) {
                return notFoundResponse(res);
            }

            const authorDetails = await Author
                .query()
                .findById(bookDetails[BOOKS_AUTHOR_ID])
                .select(authorFields)

            if (!authorDetails) {
                return notFoundResponse(res);
            }

            const allGenresIDs = await BooksGenres
                .query()
                .select(booksGenresFields)
                .where({ [BOOKS_GENRES_BOOK_ID]: req.params.id })

            if (!allGenresIDs.length) {
                return notFoundResponse(res);
            }

            const genreDetails = await Genre
                .query()
                .select(genresFields)
                .whereIn(GENRES_GENRE_ID, allGenresIDs.map(genre => genre[BOOKS_GENRES_GENRE_ID]))

            if (!genreDetails.length) {
                return notFoundResponse(res);
            }

            const response = {
                Title: bookDetails[BOOKS_TITLE],
                Summary: bookDetails[BOOKS_SUMMARY],
                ISBN: bookDetails[BOOKS_ISBN],
                Author_First_Name: authorDetails[AUTHORS_FIRST_NAME],
                Author_Last_Name: authorDetails[AUTHORS_LAST_NAME],
                Genres: genreDetails.map(genre => genre[GENRES_NAME])
            };

            res.json(response);
        }
        catch (error) {
            errorResponse(res, err.message);
        }
    })
]

exports.create_book = [
    authenticate,

    authorize([userRoles.ROLE_SUPER_ADMIN, userRoles.ROLE_ADMIN, userRoles.ROLE_LIBRARIAN]),

    allowedFields([BOOKS_ISBN, BOOKS_TITLE, BOOKS_GENRE_ID, BOOKS_AUTHOR_ID, BOOKS_SUMMARY]),
    
    validateAndSanitize(),

    asyncHandler(async(req, res, next)=>{
        const { [BOOKS_TITLE]: Title, [BOOKS_ISBN]: ISBN } = req.body;

        try{
            const existingBook = await Book
                .query()
                .where(BOOKS_TITLE, Title)
                .orWhere(BOOKS_ISBN, ISBN)
                .first();

            if (existingBook) {
                conflictRequestResponse(res, 'Book Already Exists.');
            }

            const existingAuthor = await Author
                .query()
                .where(AUTHORS_AUTHOR_ID, req.body[BOOKS_AUTHOR_ID])
                .first()

            if(!existingAuthor || existingAuthor.length === 0){
                badRequestResponse(res, 'No Such Author Found.');
            }
            const existingGenres = await Genre
                .query()
                .whereIn(GENRES_GENRE_ID, req.body[BOOKS_GENRE_ID])

            if(existingGenres.length !== req.body[BOOKS_GENRE_ID].length){
                badRequestResponse(res, 'One or more genres not found.');
            }

            const bookId = uuidv4();

            console.log("HERE?");
            await Book
                .query()
                .insert({
                    [BOOKS_BOOK_ID]: bookId,
                    [BOOKS_TITLE]: Title,
                    [BOOKS_SUMMARY]: req.body[BOOKS_SUMMARY],
                    [BOOKS_ISBN]: ISBN,
                    [BOOKS_AUTHOR_ID]: req.body[BOOKS_AUTHOR_ID]
                });
            

            await Promise.all(req.body[BOOKS_GENRE_ID].map(genreId => 
                BooksGenres
                    .query()
                    .insert({
                        [BOOKS_GENRES_BOOK_ID]: bookId,
                        [BOOKS_GENRES_GENRE_ID]: genreId
                    })
            ));

            successResponse(res, 'Book created successfully.');
        }
        catch (error) {
            errorResponse(res, error.message);
        }
    })
]

exports.update_book = [
    authenticate,

    authorize([userRoles.ROLE_SUPER_ADMIN, userRoles.ROLE_ADMIN, userRoles.ROLE_LIBRARIAN]),

    ...idValidator,

    allowedFields([BOOKS_ISBN, BOOKS_TITLE, BOOKS_SUMMARY, BOOKS_AUTHOR_ID, BOOKS_GENRE_ID]),

    validateAndSanitize(),

    asyncHandler(async(req, res, next)=>{
        const { [BOOKS_TITLE]: Title, [BOOKS_ISBN]: ISBN, [BOOKS_SUMMARY]: Summary, [BOOKS_AUTHOR_ID]: AuthorId, [BOOKS_GENRE_ID]: genreIds } = req.body;

        try{
            let query = Book.query();

            if (ISBN) {
                query = query.where(BOOKS_ISBN, ISBN);
            }

            if (Title) {
                query = query.orWhere(BOOKS_TITLE, Title);
            }

            if (Summary) {
                query = query.orWhere(BOOKS_SUMMARY, Summary);
            }

            const existingBook = await query.first();

            if (existingBook) {
                conflictRequestResponse(res, 'Book with the same ISBN, title, or summary already exists.');
            }

            if (AuthorId){
                const existingAuthor = await Author
                    .query()
                    .where(AUTHORS_AUTHOR_ID, AuthorId)
                    .first()
    
                if(!existingAuthor || existingAuthor.length === 0){
                    badRequestResponse(res, 'No Such Author Found.');
                }
            }

            if (genreIds){
                existingGenres = await Genre
                    .query()
                    .whereIn(GENRES_GENRE_ID, genreIds)
    
                if(existingGenres.length !== genreIds.length){
                    badRequestResponse(res, 'One or more genres not found.');
                }
            }

            let updateData = {};
            if (Title) updateData[BOOKS_TITLE] = Title;
            if (Summary) updateData[BOOKS_SUMMARY] = Summary;
            if (ISBN) updateData[BOOKS_ISBN] = ISBN;
            if (AuthorId) updateData[BOOKS_AUTHOR_ID] = AuthorId;

            await Book
                .query()
                .patch(updateData)
                .where(BOOKS_BOOK_ID, req.params.id);
                

            if (req.body[BOOKS_GENRE_ID]) {

                await BooksGenres
                    .query()
                    .delete()
                    .where(BOOKS_GENRES_BOOK_ID, req.params.id);

                await Promise.all(genreIds.map(genreId => 
                    BooksGenres
                        .query()
                        .insert({
                            [BOOKS_GENRES_BOOK_ID]: req.params.id,
                            [BOOKS_GENRES_GENRE_ID]: genreId
                        })
                ));

            }

            successResponse(res, 'Book updated successfully.');
        }
        catch (error) {
            errorResponse(res, error.message);
        }
    })
]

exports.delete_book = [
    authenticate,

    authorize([userRoles.ROLE_SUPER_ADMIN, userRoles.ROLE_LIBRARIAN]),

    ...idValidator,

    asyncHandler(async( req, res, next )=>{
        try{
            const book = await Book
                .query()
                .findById(req.params.id)

            if(!book || book.length === 0){
                return notFoundResponse(res);
            }

            await Book
                .query()
                .deleteById(req.params.id);

            await BooksGenres
                .query()
                .delete()
                .where(BOOKS_GENRES_BOOK_ID, req.params.id);

            return successResponse(res, "Book Deleted Successfully");
        }

        catch ( err ) {
            return errorResponse(res, err.message);
        }
    })
]