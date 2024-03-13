/**
 * This file defines the controller functions for the Genre model.
 * Each function corresponds to a route for a CRUD operation (Create, Read, Update, Delete).
 * Middleware functions are used for validation, sanitization, and authorization.
 * Utility functions are used for sending responses.
 */

const Genre = require('../models/genres');
const Book = require('../models/books');
const BooksGenres = require('../models/booksGenres');
const asyncHandler = require('express-async-handler');
const {v4: uuidv4} = require('uuid');

// Middleware Functions
const {idValidator} = require('../middlewares/idValidator');
const {validatePage} = require('../validators/validatePage');
const {queryValidator} = require('../validators/queryValidator');
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
const { GENRES_GENRE_ID, GENRES_NAME, BOOKS_GENRES_GENRE_ID, BOOKS_GENRES_BOOK_ID, BOOKS_BOOK_ID, BOOKS_TITLE } = require('../constants/fieldNames');
const { PAGINATION_LIMIT } = require('../constants/paginationConstants');

// Authentication Middlewares and Functions
const authenticate = require('../auth/authenticateUser');

// Returns details of all genres for authorized user
exports.all_genres = [
    // Authenticate User
    authenticate,
    
    // Validate page number
    ...validatePage,

    asyncHandler(async(req, res, next)=>{
        try{
            const offset = (req.query.page - 1 || 0) * PAGINATION_LIMIT;
            const genres = await Genre
                .query()
                .select()
                .limit(PAGINATION_LIMIT)
                .offset(offset);

            return res.json(genres);
        }
        catch (err) {
            return errorResponse(res, err.message);
        }
    })
]

// Get genre information by id
exports.genre_details = [
    // Authenticate User
    authenticate,

    // Validate id
    ...idValidator,

    // Validate page number
    ...validatePage,

    // ID is valid

    asyncHandler(async(req, res, next)=>{
        // Gets all the BookID from books_genres table where GenreID is equal to param.id
        try{
            const offset = (req.query.page - 1 || 0) * PAGINATION_LIMIT;
            const books = await BooksGenres
                .query()
                .where({ [BOOKS_GENRES_GENRE_ID]: req.params.id })
                .limit(PAGINATION_LIMIT)
                .offset(offset);

            if(!books || books.length === 0){
                return notFoundResponse(res);
            }

            // Extract BookID values from the fetched rows and get book details
            const bookDetails = await Promise.all(books.map(async (book) => {
                const bookInfo = await Book
                    .query()
                    .findById(book[BOOKS_BOOK_ID]);

                return {
                    [BOOKS_TITLE]: bookInfo[BOOKS_TITLE],
                    [BOOKS_BOOK_ID]: book[BOOKS_BOOK_ID]
                };
            }));

            return res.json(bookDetails);
        }
        catch (err) {
            return errorResponse(res, err.message);
        }
    })
]

// Create a new genre using req body after validation and sanitization
exports.create_genre = [
    authenticate,

    authorize([userRoles.ROLE_SUPER_ADMIN, userRoles.ROLE_LIBRARIAN]),

    // Validate and sanitize the request body
    validateAndSanitize(),

    // Data is valid

    // Custom validator to ensure no extra fields are present
    allowedFields([GENRES_NAME]),

    asyncHandler(async(req, res, next)=>{
        const { Name } = req.body;
        try{

            // Check if a genre with same Name already exists.
            const existingGenre = await Genre
                .query()
                .where({[GENRES_NAME] : Name})
                .first();

            if(existingGenre){
                return conflictRequestResponse(res, "Genre already exists.");
            }

            req.body[GENRES_GENRE_ID] = uuidv4();
            await Genre
                .query()
                .insert(req.body);

            return successResponse(res, "Genre Created Successfully");

        }
        catch(err){
            return errorResponse(res, err.message);
        }
    })
]

// Delete a genre by id
exports.delete_genre = [
    authenticate,

    // Only Super Admin and Librarian are authorized
    authorize([userRoles.ROLE_SUPER_ADMIN, userRoles.ROLE_LIBRARIAN]),

    // Validate id  
    ...idValidator,

    asyncHandler(async(req, res, next)=>{
        try{
            const genre = await Genre
                .query()
                .findById(req.params.id);

            if(!genre || genre.length === 0){
                return notFoundResponse(res);
            }

            await Genre
                .query()
                .deleteById(req.params.id);

            return successResponse(res, "Genre Deleted Successfully");
        }
        catch ( err ) {
            return errorResponse(res, err.message);
        }

    })
]

// Update genre
exports.update_genre = [
    authenticate,

    authorize([userRoles.ROLE_SUPER_ADMIN, userRoles.ROLE_LIBRARIAN]),

    // Validate id  
    ...idValidator,

    validateAndSanitize(),

    // Custom validator to ensure no extra fields are present
    allowedFields([GENRES_NAME]),

    asyncHandler(async(req, res, next)=>{
        try{
            const genre = await Genre
                .query()
                .findById(req.params.id);

            if(!genre || genre.length === 0){
                return notFoundResponse(res);
            }

            await Genre
                .query()
                .findById(req.params.id)
                .patch(req.body);
                
            return successResponse(res, "Genre Updated Successfully");
        }
        catch (err) {
            return errorResponse(res, err.message);
        }
    })
]

// Top Genres
exports.top_genres = [
    authenticate,

    // Validate page number
    ...validatePage,

    asyncHandler(async(req, res, next)=>{
        const offset = (req.query.page - 1 || 0) * PAGINATION_LIMIT;

        /**
         * This code snippet queries the 'BooksGenres' table to get a list of genres and the count of books in each genre.
         * The 'BooksGenres' table is queried to select the genre id and count the number of books in each genre. The results are grouped by genre id.
         * The results are ordered by the count of books in descending order, so genres with more books appear first.
         * The query is limited to 'PAGINATION_LIMIT' results and offset by the 'offset' variable to support pagination.
         */
        const genres = await BooksGenres
            .query()
            .select(GENRES_GENRE_ID)
            .count(`${BOOKS_GENRES_BOOK_ID} as BookCount`)
            .groupBy(GENRES_GENRE_ID)
            .orderBy('BookCount', 'desc')
            .limit(PAGINATION_LIMIT)
            .offset(offset);

        // Extract BookID values from the fetched rows and get book details
        const genreDetails = await Promise.all(genres.map(async (genre) => {
            const genreInfo = await Genre
                .query()
                .findById(genre[GENRES_GENRE_ID]);
            return {
                [GENRES_NAME]: genreInfo[GENRES_NAME],
                [GENRES_GENRE_ID]: genre[GENRES_GENRE_ID]
            };
        }));

        res.json(genreDetails);
    })
]

// Search for genres
exports.search_genres = [
    authenticate,

    // Validate query
    ...queryValidator,

    // Validate page number
    ...validatePage,

    asyncHandler(async(req, res, next)=>{
        const query = req.params.query;
        const offset = (req.query.page - 1 || 0) * PAGINATION_LIMIT;
        
        /**
         * This code snippet queries the 'Genre' table to get a list of genres where the name matches the query.
         * The 'Genre' table is queried to select genres where the name matches the query. The '%' symbols are used with the 'like' operator to find genres where the name contains the query anywhere.
         * The results are ordered by the position of the query in the genre name, and then by the genre name in alphabetical order.
         * The query is limited to 'PAGINATION_LIMIT' results and offset by the 'offset' variable to support pagination.
         */
        const genres = await Genre
            .query()
            .where(GENRES_NAME, 'like', `%${query}%`)
            .orderByRaw(`LOCATE(?, ${GENRES_NAME})`, [query])
            .orderBy(GENRES_NAME)
            .limit(PAGINATION_LIMIT)
            .offset(offset);
        
        if(!genres || genres.length === 0){
            return notFoundResponse(res);
        }

        return res.json(genres);
    })
]




