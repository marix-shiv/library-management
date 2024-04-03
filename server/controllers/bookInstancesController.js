/**
 * This module exports functions that handle requests to the book instances resource.
 * 
 * The functions handle the following requests:
 * - GET all book instances
 * - GET book instances by status
 * - GET a specific book instance by its ID
 * - POST a new book instance
 * - PATCH an existing book instance
 * - DELETE a book instance
 * - PATCH the status of a book instance
 * 
 * Each function is an array of middleware functions that are called in order.
 * The middleware functions authenticate the user, authorize the user based on their role, validate and sanitize the request parameters and body, and handle the request.
 * 
 * The functions use the BookInstance, Book, and LibraryPolicy models to interact with the database.
 * They also use utility functions to send responses and handle errors.
 */

const Book = require('../models/books');
const BookInstance = require('../models/bookinstance');
const LibraryPolicy = require('../models/librarypolicies');
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
const updateBookInstanceStatus = require('../utils/updateBookInstance');
const reservationCleaner = require('../utils/reservationCleaner');

// Constants
const userRoles = require('../constants/userRoles');
const { USERS_USER_ID, BOOKS_BOOK_ID, BOOKS_TITLE, BOOK_INSTANCE_BOOK_ID, BOOK_INSTANCE_STATUS, BOOK_INSTANCE_AVAILABLE_BY, BOOK_INSTANCE_INSTANCE_ID, BOOK_INSTANCE_IMPRINT, LIBRARY_POLICIES_VALUE, LIBRARY_POLICIES_PROPERTY, BOOK_INSTANCE_USER_ID, BOOK_INSTANCE_RENEWALS, USERS_ROLE } = require('../constants/fieldNames');
const {PAGINATION_LIMIT} = require('../constants/paginationConstants');
const {MAX_LOAN_DURATION, LATE_RETURN_PENALTY_PER_DAY, MAX_RENEWALS_PER_BOOK} = require('../constants/policyConstants');


// Authentication Middlewares and Functions
const authenticate = require('../auth/authenticateUser');
const { statusValidator } = require('../validators/statusValidator');
const { validatePage } = require('../validators/validatePage');
const unauthorizedRequestResponse = require('../utils/unauthorizedRequestResponse');

exports.all_book_instances = [
    authenticate,

    ...validatePage,

    asyncHandler(async(req, res, next)=>{
        try{
            reservationCleaner();
            const selectedFields = [BOOK_INSTANCE_BOOK_ID, BOOK_INSTANCE_INSTANCE_ID, BOOK_INSTANCE_IMPRINT];
            const bookFields = [BOOKS_TITLE];
            
            const offset = (req.query.page - 1 || 0) * PAGINATION_LIMIT;
            
            const instances = await BookInstance
                .query()
                .select(selectedFields)
                .limit(PAGINATION_LIMIT)
                .offset(offset);

            // Query the Book model for each BookInstance
            const instancesWithBooks = await Promise.all(instances.map(async (instance) => {
                const book = await Book
                    .query()
                    .select(bookFields)
                    .findById(instance[BOOK_INSTANCE_BOOK_ID]);
                return { ...instance, book };
            }));

            return res.json(instancesWithBooks);
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
        reservationCleaner();
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
            const instanceFields = [BOOK_INSTANCE_BOOK_ID, BOOK_INSTANCE_STATUS, BOOK_INSTANCE_INSTANCE_ID, BOOK_INSTANCE_IMPRINT, BOOK_INSTANCE_AVAILABLE_BY];
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
            errorResponse(res, error.message);
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

    authorize([userRoles.ROLE_SUPER_ADMIN, userRoles.ROLE_LIBRARIAN, userRoles.ROLE_USER]),

    ...idValidator,

    ...statusValidator,

    validateAndSanitize(),

    asyncHandler(async(req, res, next)=>{
        reservationCleaner();
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

            if(req.user[USERS_ROLE] === 'U' && !(currentStatus === 'R' && status === 'A')){
                return unauthorizedRequestResponse(res)
            }

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
                                [BOOK_INSTANCE_USER_ID]: readerId,
                                [BOOK_INSTANCE_RENEWALS]: 0
                            })
                            .where({[BOOK_INSTANCE_INSTANCE_ID]: id});

                        return successResponse(res, "Book Instance Status Updated Successfully.");
                    }
                    else{
                        console.log("HERE");
                        return unauthorizedRequestResponse(res, "Book Instance Already Reserved!");
                    }
                }
                else if(status === 'A'){
                    await BookInstance
                        .query()
                        .patch({
                            [BOOK_INSTANCE_STATUS]: status,
                            [BOOK_INSTANCE_AVAILABLE_BY]: null,
                            [BOOK_INSTANCE_USER_ID]: null
                        })
                        .where({[BOOK_INSTANCE_INSTANCE_ID]: id})

                    try{
                        updateBookInstanceStatus(id, instance[BOOK_INSTANCE_BOOK_ID]);
                    }
                    catch(err){
                        return errorResponse(res, err.message);
                    }

                    return successResponse(res, "Book Instance Status Updated Successfully.");
                }
                else{
                    return conflictRequestResponse(res, "Cannot change the status of a reserved book to anything other than 'L' or 'A'.");
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
                        .patch(updateData)
                        .where({[BOOK_INSTANCE_INSTANCE_ID]: id});
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
                        .where({[BOOK_INSTANCE_INSTANCE_ID]: id})

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
                        .where({[BOOK_INSTANCE_INSTANCE_ID]: id})
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
                                [BOOK_INSTANCE_USER_ID]: readerId,
                                [BOOK_INSTANCE_RENEWALS]: 0
                            })
                            .where({[BOOK_INSTANCE_INSTANCE_ID]: id})
                        
                        return successResponse(res, "Book Instance Status Updated Successfully.");
                    }
                }
                else{
                    return conflictRequestResponse(res, "Cannot change the status of an available book to anything other than 'L' or 'M'.");
                }
            }

            else if(currentStatus === 'M'){
                if(status === 'A'){
                    await BookInstance
                        .query()
                        .patch({
                            [BOOK_INSTANCE_STATUS]: status,
                            [BOOK_INSTANCE_USER_ID]: null,
                            [BOOK_INSTANCE_AVAILABLE_BY]: null
                        })
                        .where({[BOOK_INSTANCE_INSTANCE_ID]: id})
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

exports.book_instances_issued_by_user = [
    authenticate,

    authorize([userRoles.ROLE_SUPER_ADMIN, userRoles.ROLE_LIBRARIAN]),

    ...idValidator,

    asyncHandler(async(req, res, next)=>{
        try {
            const instanceFields = [BOOK_INSTANCE_BOOK_ID, BOOK_INSTANCE_INSTANCE_ID, BOOK_INSTANCE_IMPRINT, BOOK_INSTANCE_AVAILABLE_BY, BOOK_INSTANCE_STATUS];
            const bookFields = [BOOKS_TITLE];

            const instanceDetails = await BookInstance
                .query()
                .where(BOOK_INSTANCE_USER_ID, req.params.id)
                .select(instanceFields);

            if (!instanceDetails || instanceDetails.length === 0) {
                return notFoundResponse(res);
            } 

            const response = await Promise.all(instanceDetails.map(async (instance) => {
                const bookDetails = await Book
                    .query()
                    .select(bookFields)
                    .findById(instance[BOOK_INSTANCE_BOOK_ID]);

                return { ...instance, ...bookDetails };
            }));

            res.json(response);
        }
        catch (error) {
            errorResponse(res, error.message);
        }
    })
]

exports.book_instances_issued_by_me = [
    authenticate,

    authorize([userRoles.ROLE_USER]),

    asyncHandler(async(req, res, next)=>{
        try {
            const instanceFields = [BOOK_INSTANCE_BOOK_ID, BOOK_INSTANCE_INSTANCE_ID, BOOK_INSTANCE_IMPRINT, BOOK_INSTANCE_AVAILABLE_BY, BOOK_INSTANCE_RENEWALS, BOOK_INSTANCE_STATUS];
            const bookFields = [BOOKS_TITLE];

            const instanceDetails = await BookInstance
                .query()
                .where(BOOK_INSTANCE_USER_ID, req.user[USERS_USER_ID])
                .select(instanceFields);
            if (!instanceDetails || instanceDetails.length === 0) {
                return notFoundResponse(res);
            } 

            const bookDetailsPromises = instanceDetails.map(instance => 
                Book.query().findById(instance[BOOK_INSTANCE_BOOK_ID]).select(bookFields)
            );
            const bookDetails = await Promise.all(bookDetailsPromises);

            const response = instanceDetails.map((instance, index) => ({
                ...instance,
                book: bookDetails[index]
            }));

            res.json(response);
        }
        catch (error) {
            errorResponse(res, error.message);
        }
    })
]

exports.get_user_for_book_instance = [
    authenticate,

    authorize([userRoles.ROLE_SUPER_ADMIN, userRoles.ROLE_LIBRARIAN]),

    ...idValidator,

    asyncHandler(async(req, res, next)=>{
        try{
            const userId = await BookInstance
                .query()
                .findById(req.params.id)
                .select(BOOK_INSTANCE_USER_ID)
    
            return successResponse(res, '', userId);
        }
        catch(err){
            return errorResponse(res, err.message);
        }
    })
]

exports.get_fine_for_book_instance = [
    authenticate,

    authorize([userRoles.ROLE_SUPER_ADMIN, userRoles.ROLE_LIBRARIAN]),

    ...idValidator,

    asyncHandler(async(req, res, next)=>{
        try{
            const expectedDateOfReturnData = await BookInstance
                .query()
                .findById(req.params.id)
                .select(BOOK_INSTANCE_AVAILABLE_BY)

            const expectedDateOfReturn = new Date(expectedDateOfReturnData[BOOK_INSTANCE_AVAILABLE_BY]);
            const today = new Date();

            if (expectedDateOfReturn > today) {
                return successResponse(res, '', 0);
            }

            const fineMoneyData = await LibraryPolicy
                .query()
                .select(LIBRARY_POLICIES_VALUE)
                .where({[LIBRARY_POLICIES_PROPERTY]: LATE_RETURN_PENALTY_PER_DAY})
                .first()

            console.log(fineMoneyData);
            const fineMoney = parseFloat(fineMoneyData[LIBRARY_POLICIES_VALUE]);
            console.log(fineMoney);
            
            const daysLate = Math.ceil((today - expectedDateOfReturn) / (1000 * 60 * 60 * 24));
            const totalFine = fineMoney * daysLate;

            console.log(totalFine);

            return successResponse(res, '', totalFine);
        }
        catch(err){
            return errorResponse(res, err.message);
        }
    })
]

exports.renew_book_instance = [
    authenticate,

    authorize([userRoles.ROLE_USER]),

    ...idValidator,

    asyncHandler(async(req, res, next)=>{
        try {
            const bookInstanceData = await BookInstance 
                .query()
                .findById(req.params.id)

            if(bookInstanceData[BOOK_INSTANCE_USER_ID] !== req.user[USERS_USER_ID]){
                return unauthorizedRequestResponse(res);
            }

            const maxRenewalsData = await LibraryPolicy
                .query()
                .where({[LIBRARY_POLICIES_PROPERTY]: MAX_RENEWALS_PER_BOOK})
                .first()
            
            const maxRenewals = parseFloat(maxRenewalsData[LIBRARY_POLICIES_VALUE]);

            if(bookInstanceData[BOOK_INSTANCE_RENEWALS] < maxRenewals){
                const newAvailableBy = new Date(bookInstanceData[BOOK_INSTANCE_AVAILABLE_BY]);
                newAvailableBy.setDate(newAvailableBy.getDate() + 15);
                const newAvailableByFormatted = newAvailableBy.toISOString().split('T')[0];

                await BookInstance
                    .query()
                    .patch({
                        [BOOK_INSTANCE_AVAILABLE_BY]: newAvailableByFormatted,
                        [BOOK_INSTANCE_RENEWALS]: bookInstanceData[BOOK_INSTANCE_RENEWALS] + 1
                    })
                    .where({[BOOK_INSTANCE_INSTANCE_ID]: req.params.id});

                return successResponse(res);
            }

            return badRequestResponse(res, "Maximum renewals reached");
        }

        catch(err) {
            console.log(err.message);
            return errorResponse(res, err.message);
        }
    })
]

exports.max_renewals = [
    authenticate,

    asyncHandler(async(req, res , next)=>{
        try{
            const maxRenewalsData = await LibraryPolicy
                .query()
                .where({[LIBRARY_POLICIES_PROPERTY]: MAX_RENEWALS_PER_BOOK})
                .first()
            
            const maxRenewals = parseFloat(maxRenewalsData[LIBRARY_POLICIES_VALUE]);

            return successResponse(res, '', maxRenewals);
        }
        catch(err) {
            return errorResponse(res, err.message);
        }
    })
]

exports.delete_my_reservation = [
    authenticate,
    
    authorize([userRoles.ROLE_USER]),

    ...idValidator,

    asyncHandler(async(req, res, next)=>{
        try{
            const bookInstanceData = await BookInstance
                .query()
                .findById(req.params.id)

            if(!bookInstanceData){
                return notFoundResponse(res);
            }
            
            if(req.user[USERS_USER_ID] !== bookInstanceData[BOOK_INSTANCE_USER_ID]){
                return unauthorizedRequestResponse(res);
            }

            await BookInstance
                .query()
                .patch({
                    [BOOK_INSTANCE_USER_ID]: null,
                    [BOOK_INSTANCE_AVAILABLE_BY]: null,
                    [BOOK_INSTANCE_STATUS]: 'A'
                })
                .where({[BOOK_INSTANCE_INSTANCE_ID]: req.params.id})
                
            return successResponse(res);
        }
        catch(err){
            return errorResponse(res, err.message);
        }
    })
]