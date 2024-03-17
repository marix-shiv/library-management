const Book = require('../models/books');
const Author = require('../models/authors');
const Genre = require('../models/genres');
const BooksGenres = require('../models/booksGenres');
const BookInstance = require('../models/bookinstance');
const Reservation = require('../models/reservations');
const LibraryPolicy = require('../models/librarypolicies');
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
const updateBookInstanceStatus = require('../utils/updateBookInstance');

// Constants
const userRoles = require('../constants/userRoles');
const { USERS_USER_ID, USERS_USERNAME, USERS_PASSWORD, USERS_SALT, USERS_ROLE, USERS_FIRST_NAME, USERS_LAST_NAME, USERS_DATE_OF_BIRTH, USERS_STATUS, BOOKS_BOOK_ID, BOOKS_AUTHOR_ID, BOOKS_TITLE, BOOKS_SUMMARY, BOOKS_ISBN, BOOKS_GENRE_ID, AUTHORS_FIRST_NAME, AUTHORS_LAST_NAME, BOOKS_GENRES_GENRE_ID, GENRES_NAME, AUTHORS_AUTHOR_ID, BOOKS_GENRES_BOOK_ID, GENRES_GENRE_ID, BOOK_INSTANCE_BOOK_ID, BOOK_INSTANCE_STATUS, BOOK_INSTANCE_AVAILABLE_BY, BOOK_INSTANCE_INSTANCE_ID, BOOK_INSTANCE_IMPRINT, LIBRARY_POLICIES_VALUE, LIBRARY_POLICIES_PROPERTY, BOOK_INSTANCE_USER_ID, RESERVATIONS_USER_ID, RESERVATIONS_BOOK_ID } = require('../constants/fieldNames');
const unauthorizedRequestResponse = require('../utils/unauthorizedRequestResponse');
const {PAGINATION_LIMIT} = require('../constants/paginationConstants');
const {MAX_RESERVATION_DURATION, MAX_LOAN_DURATION} = require('../constants/policyConstants');


// Authentication Middlewares and Functions
const authenticate = require('../auth/authenticateUser');
const { queryValidator } = require('../validators/queryValidator');
const { statusValidator } = require('../validators/statusValidator');
const { validatePage } = require('../validators/validatePage');
const { BOOK_INSTANCES_TABLE } = require('../constants/tableNames');

exports.all_book_instances = [
    authenticate,

    ...validatePage,

    asyncHandler(async(req, res, next)=>{
        try{
            const selectedFields = [BOOK_INSTANCE_BOOK_ID, BOOK_INSTANCE_STATUS, BOOK_INSTANCE_INSTANCE_ID, BOOK_INSTANCE_IMPRINT];
            
            const offset = (req.query.page - 1 || 0) * PAGINATION_LIMIT;
            
            const instances = await BookInstance
                .query()
                .select(selectedFields)
                .limit(PAGINATION_LIMIT)
                .offset(offset);

            return res.json(instances);
        }
        catch (err) {
            return errorResponse(res, err.message);
        }
    })
]

exports.book_instances_by_status = [
    authenticate,

    ...validatePage,

    ...statusValidator,

    asyncHandler(async(req, res, next)=>{
        const offset = (req.query.page - 1 || 0) * PAGINATION_LIMIT;
        const selectedFields = [BOOK_INSTANCE_BOOK_ID, BOOK_INSTANCE_STATUS, BOOK_INSTANCE_INSTANCE_ID, BOOK_INSTANCE_IMPRINT];
        const status = req.params.status;
        const bookFields = [BOOKS_TITLE];

        const instances = await BookInstance
            .query()
            .select(selectedFields)
            .where(BOOK_INSTANCE_STATUS, 'like', `%${status}%`)
            .offset(offset)
            .limit(PAGINATION_LIMIT);

        if(!instances || instances.length === 0){
            return notFoundResponse(res);
        }

        const instancesWithBookDetails = [];
        for (const instance of instances) {
            const bookDetails = await Book
                .query()
                .select(bookFields)
                .findById(instance[BOOK_INSTANCE_BOOK_ID]);

            if (!bookDetails) {
                console.log(bookDetails);
                return notFoundResponse(res);
            }

            // Combine instance and bookDetails into a single object
            const instanceWithBookDetails = { ...instance, ...bookDetails };
            instancesWithBookDetails.push(instanceWithBookDetails);
        }
            
        return res.json(instancesWithBookDetails);
    })
]

exports.book_instance_details = [
    authenticate,

    ...idValidator,

    asyncHandler(async(req, res, next)=>{
        try {
            const instanceFields = [BOOK_INSTANCE_BOOK_ID, BOOK_INSTANCE_STATUS, BOOK_INSTANCE_INSTANCE_ID, BOOK_INSTANCE_IMPRINT];
            const bookFields = [BOOKS_TITLE];
            const instanceDetails = await BookInstance
                .query()
                .findById(req.params.id)
                .select(instanceFields);
            if (!instanceDetails || instanceDetails.length === 0) {
                return notFoundResponse(res);
            } 

            const bookDetails = await Book
                .query()
                .select(bookFields)
                .findById(instanceDetails[BOOK_INSTANCE_BOOK_ID]);
                
            if (!bookDetails || bookDetails.length === 0) {
                return notFoundResponse(res);
            }

            const response = { ...instanceDetails, ...bookDetails };

            res.json(response);
        }
        catch (error) {
            errorResponse(res, err.message);
        }
    })
]

exports.create_book_instance = [
    authenticate,

    authorize([userRoles.ROLE_SUPER_ADMIN, userRoles.ROLE_LIBRARIAN]),

    allowedFields([BOOK_INSTANCE_BOOK_ID, BOOK_INSTANCE_IMPRINT, BOOK_INSTANCE_STATUS]),

    validateAndSanitize(),


    asyncHandler(async(req, res, next)=>{
        try{
            
            const instanceId = uuidv4();
            await BookInstance
            .query()
            .insert({
                ...req.body,
                [BOOK_INSTANCE_INSTANCE_ID]: instanceId,
            })
            
            updateBookInstanceStatus(instanceId, req.body[BOOK_INSTANCE_BOOK_ID]);
            return successResponse(res, "Book Instance Created Successfully");
        }

        catch(err){
            return errorResponse(res, err.message);
        }
    })
]

exports.update_book_instance = [
    authenticate,

    authorize([userRoles.ROLE_SUPER_ADMIN, userRoles.ROLE_LIBRARIAN]),

    ...idValidator,

    allowedFields([BOOK_INSTANCE_BOOK_ID, BOOK_INSTANCE_IMPRINT]),

    validateAndSanitize(),

    asyncHandler(async(req, res, next)=>{
        const {[BOOK_INSTANCE_BOOK_ID]: title} = req.body;
        try{
            if (title){
                const existingBook = await Book
                    .query()
                    .where(BOOKS_BOOK_ID, title)
                    .first()
    
                if(!existingBook || existingBook.length === 0){
                    badRequestResponse(res, 'No Such Book Found.');
                }
            }

            await BookInstance
                .query()
                .patch(req.body)
                .where(BOOK_INSTANCE_INSTANCE_ID, req.params.id);

            return successResponse(res, "Book Instance Updated Successfully.");
        }
        catch (err) {
            return errorResponse(res, err.message);
        }
    })
]

exports.delete_book_instance = [
    authenticate,

    authorize([userRoles.ROLE_SUPER_ADMIN, userRoles.ROLE_LIBRARIAN]),

    ...idValidator,


    asyncHandler(async(req, res, next)=>{
        try{
            const instance = await BookInstance
                .query()
                .findById(req.params.id)

            if(!instance || instance.length === 0){
                return notFoundResponse(res);
            }

            await BookInstance
                .query()
                .deleteById(req.params.id)

            return successResponse(res, "Book Instance Deleted Successfully"); 
        }
        catch ( err ) {
            return errorResponse(res, err.message);
        }
    })
]

exports.update_book_instance_status = [
    authenticate,

    authorize([userRoles.ROLE_SUPER_ADMIN, userRoles.ROLE_LIBRARIAN]),

    ...idValidator,

    ...statusValidator,

    validateAndSanitize(),

    asyncHandler(async(req, res, next)=>{
        const id = req.params.id;
        const status = req.params.status;

        // If a book is being returned, the librarian can decide if it needs maintenance or is good to be available.
        try{
            const instance = await BookInstance
                .query()
                .findById(id)
                .select([BOOK_INSTANCE_STATUS, BOOK_INSTANCE_USER_ID, BOOK_INSTANCE_BOOK_ID])

            if(!instance || instance.length === 0){
                return notFoundResponse(res);
            }

            const currentStatus = instance[BOOK_INSTANCE_STATUS];

            if(currentStatus === 'R'){
                if(status === 'L'){
                    const readerId = req.body[USERS_USER_ID];
                    if(readerId && readerId === instance[BOOK_INSTANCE_USER_ID]){
                        const loanDurationData = await LibraryPolicy
                            .query()
                            .select()
                            .where({[LIBRARY_POLICIES_PROPERTY]: MAX_LOAN_DURATION});
                        
                        let availableDate = new Date();
                        availableDate.setDate(availableDate.getDate() + parseInt(loanDurationData[0][LIBRARY_POLICIES_VALUE]));

                        let dateString = availableDate.toISOString().split('T')[0];
                        await BookInstance
                            .query()
                            .patch({
                                [BOOK_INSTANCE_STATUS]: status,
                                [BOOK_INSTANCE_AVAILABLE_BY]: dateString,
                                [BOOK_INSTANCE_USER_ID]: readerId
                            })

                        return successResponse(res, "Book Instance Status Updated Successfully.");
                    }
                }
                else{
                    return conflictRequestResponse(res, "Cannot change the status of a reserved book to anything other than 'L'.");
                }
            }

            else if(currentStatus === 'L'){
                if(status === 'A'){
                    let updateData = {
                        [BOOK_INSTANCE_STATUS]: status,
                        [BOOK_INSTANCE_USER_ID]: null,
                        [BOOK_INSTANCE_AVAILABLE_BY]: null
                    };
                    await BookInstance
                        .query()
                        .patch(updateData);
                    try{
                        updateBookInstanceStatus(id, instance[BOOK_INSTANCE_BOOK_ID]);
                    }
                    catch(err){
                        return errorResponse(res, err.message);
                    }
                    return successResponse(res, "Book Instance Status Updated Successfully.");
                }
                else if(status === 'M'){
                    await BookInstance
                        .query()
                        .patch({
                            [BOOK_INSTANCE_STATUS]: status,
                            [BOOK_INSTANCE_USER_ID]: null,
                            [BOOK_INSTANCE_AVAILABLE_BY]: null
                        })

                    return successResponse(res, "Book Instance Status Updated Successfully.")
                }
                else{
                    return conflictRequestResponse(res, "Cannot change the status of a loaned book to anything other than 'A' or 'M'.");
                }
            }

            else if(currentStatus === 'A'){
                if(status === 'M'){
                    await BookInstance
                        .query()
                        .patch({
                            [BOOK_INSTANCE_STATUS]: status,
                            [BOOK_INSTANCE_USER_ID]: null,
                            [BOOK_INSTANCE_AVAILABLE_BY]: null
                        })
                    return successResponse(res, "Book Instance Status Updated Successfully.");
                }
                else if(status === 'L'){
                    const readerId = req.body[USERS_USER_ID];
                    if(readerId){
                        const loanDurationData = await LibraryPolicy
                            .query()
                            .select()
                            .where({[LIBRARY_POLICIES_PROPERTY]: MAX_LOAN_DURATION});
                        
                        let availableDate = new Date();
                        availableDate.setDate(availableDate.getDate() + parseInt(loanDurationData[0][LIBRARY_POLICIES_VALUE]));

                        let dateString = availableDate.toISOString().split('T')[0];
                        await BookInstance
                            .query()
                            .patch({
                                [BOOK_INSTANCE_STATUS]: status,
                                [BOOK_INSTANCE_AVAILABLE_BY]: dateString,
                                [BOOK_INSTANCE_USER_ID]: readerId
                            })
                        
                        return successResponse(res, "Book Instance Status Updated Successfully.");
                    }
                }
                else{
                    return conflictRequestResponse(res, "Cannot change the status of an available book to anything other than 'L' or 'M'.");
                }
            }

            else{
                if(status === 'A'){
                    await BookInstance
                        .query()
                        .patch({
                            [BOOK_INSTANCE_STATUS]: status,
                            [BOOK_INSTANCE_USER_ID]: null,
                            [BOOK_INSTANCE_AVAILABLE_BY]: null
                        })
                    try{
                        updateBookInstanceStatus(id, instance[BOOK_INSTANCE_BOOK_ID]);
                    }
                    catch(err){
                        return errorResponse(res, err.message);
                    }
                    return successResponse(res, "Book Instance Status Updated Successfully.");
                }
                else{
                    return conflictRequestResponse(res, "Cannot change the status of a book on maintenance to anything other than 'A'.");
                }
            }

            badRequestResponse(res)
        }
        catch(err){
            return errorResponse(res, err.message);
        }
    })
]