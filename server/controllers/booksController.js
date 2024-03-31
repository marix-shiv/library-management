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
const validateAndSanitize = require('../middlewares/bodyValidator');
const authorize = require('../middlewares/authorize');

// Utility Functions
const errorResponse = require('../utils/errorResponse');
const notFoundResponse = require('../utils/notFoundResponse');
const successResponse = require('../utils/successResponse');
const badRequestResponse = require('../utils/badRequestResponse');
const conflictRequestResponse = require('../utils/conflictRequestResponse');
const allowedFields = require('../utils/allowedFields');

// Constants
const userRoles = require('../constants/userRoles');
const { BOOKS_BOOK_ID, BOOKS_AUTHOR_ID, BOOKS_TITLE, BOOKS_SUMMARY, BOOKS_ISBN, BOOKS_GENRE_ID, AUTHORS_FIRST_NAME, AUTHORS_LAST_NAME, BOOKS_GENRES_GENRE_ID, GENRES_NAME, AUTHORS_AUTHOR_ID, BOOKS_GENRES_BOOK_ID, GENRES_GENRE_ID, BOOK_INSTANCE_BOOK_ID, BOOK_INSTANCE_STATUS, RESERVATIONS_BOOK_ID, BOOK_INSTANCE_IMPRINT } = require('../constants/fieldNames');
const {PAGINATION_LIMIT} = require('../constants/paginationConstants');

// Authentication Middlewares and Functions
const authenticate = require('../auth/authenticateUser');
const { queryValidator } = require('../validators/queryValidator');
const { validatePage } = require('../validators/validatePage');
const Reservation = require('../models/reservations');

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

        const booksWithAuthor = await Promise.all(books.map(async (book) => {
            const author = await Author
                .query()
                .findById(book[BOOKS_AUTHOR_ID]);
            return {
                ...book,
                [AUTHORS_FIRST_NAME]: author[AUTHORS_FIRST_NAME],
                [AUTHORS_LAST_NAME]: author[AUTHORS_LAST_NAME]
            };
        }));

        return res.json(booksWithAuthor);
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

            const bookDetails = await Book
                .query()
                .findById(req.params.id)
                .select(bookFields)

            if (!bookDetails) {
                console.log("HERE")
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
                .select()
                .whereIn(GENRES_GENRE_ID, allGenresIDs.map(genre => genre[BOOKS_GENRES_GENRE_ID]))

            if (!genreDetails.length) {
                return notFoundResponse(res);
            }

            const bookInstances = await BookInstance
                .query()
                .select()
                .where({ [BOOK_INSTANCE_BOOK_ID]: req.params.id })

            const response = {
                [BOOKS_TITLE]: bookDetails[BOOKS_TITLE],
                [BOOKS_SUMMARY]: bookDetails[BOOKS_SUMMARY],
                [BOOKS_ISBN]: bookDetails[BOOKS_ISBN],
                [BOOKS_AUTHOR_ID]: bookDetails[BOOKS_AUTHOR_ID],
                [AUTHORS_FIRST_NAME]: authorDetails[AUTHORS_FIRST_NAME],
                [AUTHORS_LAST_NAME]: authorDetails[AUTHORS_LAST_NAME],
                [BOOKS_GENRE_ID]: genreDetails,
                BookInstances: bookInstances
            };

            res.json(response);
        }
        catch (error) {
            return errorResponse(res, err.message);
        }
    })
]

exports.create_book = [
    authenticate,

    authorize([userRoles.ROLE_SUPER_ADMIN, userRoles.ROLE_LIBRARIAN]),

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
                return conflictRequestResponse(res, 'Book Already Exists.');
            }

            const existingAuthor = await Author
                .query()
                .where(AUTHORS_AUTHOR_ID, req.body[BOOKS_AUTHOR_ID])
                .first()

            if(!existingAuthor || existingAuthor.length === 0){
                return badRequestResponse(res, 'No Such Author Found.');
            }
            const existingGenres = await Genre
                .query()
                .whereIn(GENRES_GENRE_ID, req.body[BOOKS_GENRE_ID])

            if(existingGenres.length !== req.body[BOOKS_GENRE_ID].length){
                return badRequestResponse(res, 'One or more genres not found.');
            }

            const bookId = uuidv4();

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

            return successResponse(res, 'Book created successfully.');
        }
        catch (error) {
            return errorResponse(res, error.message);
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

            const existingBooks = await query;

            if (existingBooks.length > 1 || (existingBooks.length === 1 && existingBooks[0][BOOKS_BOOK_ID] !== req.params.id)) {
                console.log("Existing Book has ", existingBooks);
                return conflictRequestResponse(res, 'Book with the same ISBN, title, or summary already exists.');
            }

            if (AuthorId){
                const existingAuthor = await Author
                    .query()
                    .where(AUTHORS_AUTHOR_ID, AuthorId)
                    .first()

                console.log("Existing author is ", existingAuthor);
    
                if(!existingAuthor){
                    console.log("HEREEEEEEEEEEEEEEEEEEE");
                    return badRequestResponse(res, 'No Such Author Found.');
                }
            }

            if (genreIds){
                existingGenres = await Genre
                    .query()
                    .whereIn(GENRES_GENRE_ID, genreIds)
    
                if(existingGenres.length !== genreIds.length){
                    return badRequestResponse(res, 'One or more genres not found.');
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

            return successResponse(res, 'Book updated successfully.');
        }
        catch (error) {
            return errorResponse(res, error.message);
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

            await Reservation
                .query()
                .delete()
                .where(RESERVATIONS_BOOK_ID, req.params.id);

            return successResponse(res, "Book Deleted Successfully");
        }

        catch ( err ) {
            return errorResponse(res, err.message);
        }
    })
]