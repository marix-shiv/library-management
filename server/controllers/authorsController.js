/**
 * This file defines the controller functions for the Author model.
 * Each function corresponds to a route for a CRUD operation (Create, Read, Update, Delete).
 * Middleware functions are used for validation, sanitization, and authorization.
 * Utility functions are used for sending responses.
 */

const Author = require('../models/authors');
const Book = require('../models/books');
const asyncHandler = require('express-async-handler');
const {v4: uuidv4} = require('uuid');

// Middleware Functions
const {idValidator} = require('../middlewares/idValidator');
const {queryValidator} = require('../validators/queryValidator');
const { validatePage } = require('../validators/validatePage');
const validateAndSanitize = require('../middlewares/bodyValidator');
const authorize = require('../middlewares/authorize');

// Utility Functions
const errorResponse = require('../utils/errorResponse');
const notFoundResponse = require('../utils/notFoundResponse');
const successResponse = require('../utils/successResponse');
const badRequestResponse = require('../utils/badRequestResponse');
const conflictRequestResponse = require('../utils/conflictRequestResponse');
const allowedFields = require('../utils/allowedFields');
const incrementDate = require('../utils/incrementDate');

// Constants
const userRoles = require('../constants/userRoles');
const { AUTHORS_AUTHOR_ID, AUTHORS_FIRST_NAME, AUTHORS_LAST_NAME, AUTHORS_DATE_OF_BIRTH, AUTHORS_DATE_OF_DEATH, BOOKS_BOOK_ID, BOOKS_TITLE, BOOKS_SUMMARY, BOOKS_AUTHOR_ID} = require('../constants/fieldNames');
const { PAGINATION_LIMIT } = require('../constants/paginationConstants');

// Authentication Middlewares and Functions
const authenticate = require('../auth/authenticateUser');

// Returns details of all authors for authorized user
exports.all_authors = [
    // Authenticate User
    authenticate,

    // Validate page number
    ...validatePage,

    asyncHandler(async(req, res, next)=>{
        try{
            const selectedFields = [AUTHORS_AUTHOR_ID, AUTHORS_FIRST_NAME, AUTHORS_LAST_NAME];
            const offset = (req.query.page - 1 || 0) * PAGINATION_LIMIT;
            
            const authors = await Author
                .query()
                .select(selectedFields)
                .limit(PAGINATION_LIMIT)
                .offset(offset);

            return res.json(authors);
        }
        catch (err) {
            return errorResponse(res, err.message);
        }
    })
];

// Search authors
exports.search_authors = [
    authenticate,

    // Validate query
    ...queryValidator,

    // Validate page number
    ...validatePage,

    asyncHandler(async(req, res, next)=>{
        const validFields = [AUTHORS_AUTHOR_ID, AUTHORS_FIRST_NAME, AUTHORS_LAST_NAME];
        const query = req.params.query;
        const offset = (req.query.page - 1 || 0) * PAGINATION_LIMIT;

        // Query the 'Author' table to get authors where the first name or last name matches the query.
        // The results are ordered by the position of the query in the full name (first name + last name), and then by the full name in alphabetical order.
        // Only the fields in the 'validFields' array are selected.
        // The query is limited to 'PAGINATION_LIMIT' results and offset by the 'offset' variable to support pagination.
        const authors = await Author
                    .query()
                    .select(validFields)
                    .where(AUTHORS_FIRST_NAME, 'like', `%${query}%`)
                    .orWhere(AUTHORS_LAST_NAME, 'like', `%${query}%`)
                    .orderByRaw(`LOCATE(?, CONCAT(${AUTHORS_FIRST_NAME}, ' ', ${AUTHORS_LAST_NAME}))`, [query])
                    .orderByRaw(`CONCAT(${AUTHORS_FIRST_NAME}, ' ', ${AUTHORS_LAST_NAME})`)
                    .limit(PAGINATION_LIMIT)
                    .offset(offset);
        
        if(!authors || authors.length === 0){
            return notFoundResponse(res);
        }

        return res.json(authors);
    })
]

// Get author information and books written by author by id
exports.author_details = [
    // Authenticate User
    authenticate,

    // Validate id
    ...idValidator,

    // Validate page number
    ...validatePage,

    // ID is valid

    asyncHandler(async(req, res, next)=>{
        // Gets all the BOOK_ID from books table where AuthorID is equal to param.id
        try{
            const authorFields = [AUTHORS_FIRST_NAME, AUTHORS_LAST_NAME, AUTHORS_DATE_OF_BIRTH, AUTHORS_DATE_OF_DEATH];
            const booksFields = [ BOOKS_BOOK_ID, BOOKS_TITLE, BOOKS_SUMMARY ];
            const offset = (req.query.page - 1 || 0) * PAGINATION_LIMIT;

            // The 'Author' table is queried to get details about the author with the id specified in the request parameters. Only the fields in the 'authorFields' array are selected.
            const authorDetails = await Author
                .query()
                .findById(req.params.id)
                .select(authorFields)

            // The 'Book' table is queried to get books written by the author with the id specified in the request parameters. Only the fields in the 'booksFields' array are selected. The results are limited to 'PAGINATION_LIMIT' books and offset by the 'offset' variable to support pagination.
            const books = await Book
                .query()
                .select(booksFields)
                .where({ [BOOKS_AUTHOR_ID]: req.params.id })
                .limit(PAGINATION_LIMIT)
                .offset(offset);

            // The results from the two queries are combined into a single object, 'authorDetailsWithBooks', which includes the author details and an array of books.
            const authorDetailsWithBooks = {
                ...authorDetails[0],
                Books: books
            }

            return res.json(authorDetailsWithBooks);
        }
        catch (err) {
            return errorResponse(res, err.message);
        }
    })
];

// Create a new author using req body after validation and sanitization
exports.create_author = [
    authenticate,

    authorize([userRoles.ROLE_SUPER_ADMIN, userRoles.ROLE_LIBRARIAN]),

    // Validate and sanitize the request body
    validateAndSanitize([AUTHORS_DATE_OF_DEATH]),

    // Custom validator to ensure no extra fields are present

    allowedFields([AUTHORS_FIRST_NAME, AUTHORS_LAST_NAME, AUTHORS_DATE_OF_BIRTH, AUTHORS_DATE_OF_DEATH]),

    asyncHandler(async(req, res, next)=>{

        const { FirstName, LastName } = req.body;
        try{
            // Check if an author with same First and Last Name already exists.
            const existingAuthor = await Author
                .query()
                .where({
                    [AUTHORS_FIRST_NAME]: FirstName,
                    [AUTHORS_LAST_NAME]: LastName
                })
                .first();
            
            if(existingAuthor){
                return conflictRequestResponse(res, "Author already exists.");
            }

            req.body[AUTHORS_AUTHOR_ID] = uuidv4();
            if (req.body[AUTHORS_DATE_OF_BIRTH]) {
                req.body[AUTHORS_DATE_OF_BIRTH] = incrementDate(req.body[AUTHORS_DATE_OF_BIRTH]);
            }
            
            if (req.body[AUTHORS_DATE_OF_DEATH]) {
                req.body[AUTHORS_DATE_OF_DEATH] = incrementDate(req.body[AUTHORS_DATE_OF_DEATH]);
            }

            await Author
                .query()
                .insert(req.body);
                
            return successResponse(res, "Author Created Successfully");
        }
        catch(err){
            return errorResponse(res, err.message);
        }
    })
];

// Delete an author by id
exports.delete_author = [
    authenticate,

    authorize([userRoles.ROLE_SUPER_ADMIN, userRoles.ROLE_LIBRARIAN]),

    // Validate id
    ...idValidator,

    asyncHandler(async( req, res, next )=>{
        try{
            const author = await Author
                .query()
                .findById(req.params.id)

            if(!author || author.length === 0){
                return notFoundResponse(res);
            }

            await Author.query().deleteById(req.params.id);

            return successResponse(res, "Author Deleted Successfully");
        }

        catch ( err ) {
            return errorResponse(res, err.message);
        }
    })
];

// Update author
exports.update_author = [
    authenticate,

    authorize([userRoles.ROLE_SUPER_ADMIN, userRoles.ROLE_LIBRARIAN]),
    
    // Validate id  
    ...idValidator,

    validateAndSanitize(),

    // Custom validator to ensure no extra fields are present
    allowedFields([AUTHORS_FIRST_NAME, AUTHORS_LAST_NAME, AUTHORS_DATE_OF_BIRTH, AUTHORS_DATE_OF_DEATH]),

    asyncHandler(async(req, res, next)=>{
        try{
            const author = await Author
                .query()
                .findById(req.params.id)

            if(!author || author.length === 0){
                return notFoundResponse(res);
            }

            // Increase DateOfBirth and DateOfDeath by one day in order to remove
            // any issues caused due to MySQL date format.

            if (req.body[AUTHORS_DATE_OF_BIRTH]) {
                req.body[AUTHORS_DATE_OF_BIRTH] = incrementDate(req.body[AUTHORS_DATE_OF_BIRTH]);
            }
            
            if (req.body[AUTHORS_DATE_OF_DEATH]) {
                req.body[AUTHORS_DATE_OF_DEATH] = incrementDate(req.body[AUTHORS_DATE_OF_DEATH]);
            }

            await Author
                .query()
                .findById(req.params.id)
                .patch(req.body);

            return successResponse(res, "Author Updated Successfully.");

        }

        catch (err) {
            return errorResponse(res, err.message);
        }
    })
];

// Top authors (based on number of books written present in the library)
exports.top_authors = [
    authenticate,

    // Validate page number
    ...validatePage,

    asyncHandler(async(req, res, next)=>{
        const offset = (req.query.page - 1 || 0) * PAGINATION_LIMIT;

        // Get AuthorID in descending order
        const topAuthors = await Book
            .query()
            .select(AUTHORS_AUTHOR_ID)
            .count(`${AUTHORS_AUTHOR_ID} as count`)
            .groupBy(AUTHORS_AUTHOR_ID)
            .orderBy('count', 'desc')
            .limit(PAGINATION_LIMIT)
            .offset(offset);

        const authorDetails = await Promise.all(topAuthors.map( async (author)=>{
            const authorInfo = await Author
                .query()
                .findById(author[AUTHORS_AUTHOR_ID]);
            
            return {
                [AUTHORS_AUTHOR_ID]: authorInfo[AUTHORS_AUTHOR_ID],
                [AUTHORS_FIRST_NAME]: authorInfo[AUTHORS_FIRST_NAME],
                [AUTHORS_LAST_NAME]: authorInfo[AUTHORS_LAST_NAME]
            };
        }));

        res.json(authorDetails);
    })
]
