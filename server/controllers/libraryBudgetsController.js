/**
 * This module exports a set of middleware functions for handling HTTP requests related to library budgets.
 * Each function corresponds to a specific HTTP method and route, and includes validation, authentication, and error handling.
 * The functions interact with the LibraryBudget model to query the database and return the appropriate response.
 */

const LibraryBudget = require('../models/librarybudget');
const asyncHandler = require('express-async-handler');
const {v4: uuidv4} = require('uuid');

// Middleware Functions
const {idValidator} = require('../middlewares/idValidator');
const {queryValidator} = require('../validators/queryValidator');
const {dateRangeValidator} = require('../validators/validateDateRange');
const {moneyRangeValidator} = require('../validators/validateMoneyRange');
const { validatePage } = require('../validators/validatePage');
const validateAndSanitize = require('../middlewares/bodyValidator');
const authorize = require('../middlewares/authorize');

// Utility Functions
const errorResponse = require('../utils/errorResponse');
const notFoundResponse = require('../utils/notFoundResponse');
const successResponse = require('../utils/successResponse');
const badRequestResponse = require('../utils/badRequestResponse');
const allowedFields = require('../utils/allowedFields');
const incrementDate = require('../utils/incrementDate');

// Constants
const userRoles = require('../constants/userRoles');
const { LIBRARY_BUDGET_BUDGET_ID, LIBRARY_BUDGET_MONEY, LIBRARY_BUDGET_DATE, LIBRARY_BUDGET_DESCRIPTION} = require('../constants/fieldNames');
const { PAGINATION_LIMIT } = require('../constants/paginationConstants');

// Authentication Middlewares and Functions
const authenticate = require('../auth/authenticateUser');

// Get all transactions
exports.all_transactions = [
    authenticate,

    authorize([userRoles.ROLE_SUPER_ADMIN, userRoles.ROLE_ADMIN]),

    ...validatePage,

    asyncHandler(async(req, res, next)=>{
        try{
            const offset = (req.query.page - 1 || 0) * PAGINATION_LIMIT;
            
            /**
             * This code snippet queries the 'LibraryBudget' table to get a list of budget transactions.
             * The 'LibraryBudget' table is queried to select all fields for each transaction.
             * The results are ordered by the transaction date in descending order, so the most recent transactions appear first.
             * The query is limited to 'PAGINATION_LIMIT' results and offset by the 'offset' variable to support pagination.
             */
            const transactions = await LibraryBudget
                .query()
                .select()
                .orderBy(LIBRARY_BUDGET_DATE, 'desc')
                .limit(PAGINATION_LIMIT)
                .offset(offset);

            return res.json(transactions);
        }

        catch (err){
            return errorResponse(res, err.message);
        }
    })
]

// Get transaction by id
exports.transaction_details = [
    // Authenticate User
    authenticate,

    // Validate id
    ...idValidator,

    // Data is valid

    authorize([userRoles.ROLE_SUPER_ADMIN, userRoles.ROLE_ADMIN]),

    asyncHandler(async(req, res, next)=>{
        try{
            const transactionDetails = await LibraryBudget
                .query()
                .findById(req.params.id)
                .select();
            
            if(!transactionDetails || transactionDetails.length === 0){
                return notFoundResponse(res);
            }

            return res.json(transactionDetails);
        }
        catch (err) {
            return errorResponse(res, err.message);
        }
    })

]

// Create a new transaction
exports.create_transaction = [
    authenticate,

    authorize([userRoles.ROLE_SUPER_ADMIN, userRoles.ROLE_ADMIN]),

    validateAndSanitize(),

    // Custom validator to ensure no extra fields are present
    allowedFields([LIBRARY_BUDGET_MONEY, LIBRARY_BUDGET_DATE, LIBRARY_BUDGET_DESCRIPTION]),

    asyncHandler(async(req, res, next)=>{
        try{
            req.body[LIBRARY_BUDGET_BUDGET_ID] = uuidv4();

            if (req.body[LIBRARY_BUDGET_DATE]) {
                req.body[LIBRARY_BUDGET_DATE] = incrementDate(req.body[LIBRARY_BUDGET_DATE]);
            }
            await LibraryBudget
                .query()
                .insert(req.body);
            return successResponse(res, "Transaction Added Successfully");
        }
        catch(err){
            return errorResponse(res, err.message);
        }
    })
]

// Update transaction
exports.update_transaction = [
    authenticate,

    authorize([userRoles.ROLE_SUPER_ADMIN, userRoles.ROLE_ADMIN]),

    ...idValidator,
    
    validateAndSanitize(),

    // Custom validator to ensure no extra fields are present
    allowedFields([LIBRARY_BUDGET_MONEY, LIBRARY_BUDGET_DATE, LIBRARY_BUDGET_DESCRIPTION]),

    asyncHandler(async(req, res, next)=>{
        try{
            const transaction = await LibraryBudget
                .query()
                .findById(req.params.id)

            if(!transaction || transaction.length === 0){
                return notFoundResponse(res);
            }
            
            // Increase Date to remove issues
            if(req.body[LIBRARY_BUDGET_DATE]){
                req.body[LIBRARY_BUDGET_DATE] = incrementDate(req.body[LIBRARY_BUDGET_DATE]); 
            }

            await LibraryBudget
                .query()
                .findById(req.params.id)
                .patch(req.body);
            
            return successResponse(res, "Transaction Updated Successfully.");
        }
        catch(err){
            return errorResponse(res, err.message);
        } 
    })
]

// Delete transaction
exports.delete_transaction = [
    authenticate,
    
    authorize([userRoles.ROLE_SUPER_ADMIN, userRoles.ROLE_ADMIN]),

    ...idValidator,

    asyncHandler(async(req, res, next)=>{
        try{
            const transaction = await LibraryBudget
                .query()
                .findById(req.params.id)

            if(!transaction || transaction.length === 0){
                return notFoundResponse(res);
            }

            await LibraryBudget
                .query()
                .deleteById(req.params.id);

            return successResponse(res, "Transaction Deleted Successfully");
        }

        catch ( err ) {
            return errorResponse(res, err.message);
        }
    })
]

// Transactions in Date Range
exports.transactions_by_date_range = [
    authenticate,

    authorize([userRoles.ROLE_SUPER_ADMIN, userRoles.ROLE_ADMIN]),

    // Validates the start and end dates and checks if end date is lesser than start date
    dateRangeValidator,

    validatePage,

    asyncHandler(async(req, res, next)=>{
        try{
            let startDate = new Date(req.params.startDate);
            let endDate = new Date(req.params.endDate);

            endDate.setDate(endDate.getDate() + 1);

            const offset = (req.query.page - 1 || 0) * PAGINATION_LIMIT;

            /**
             * This code snippet queries the 'LibraryBudget' table to get a list of budget transactions within a specific date range.
             * The 'LibraryBudget' table is queried to select all fields for each transaction where the date is between 'startDate' and 'endDate'.
             * The results are ordered by the transaction date in descending order, so the most recent transactions appear first.
             * The query is limited to 'PAGINATION_LIMIT' results and offset by the 'offset' variable to support pagination.
             */
            const transactions = await LibraryBudget
                .query()
                .whereBetween(LIBRARY_BUDGET_DATE, [startDate.toISOString(), endDate.toISOString()])
                .orderBy(LIBRARY_BUDGET_DATE, 'desc')
                .limit(PAGINATION_LIMIT)
                .offset(offset);

            return res.json(transactions);
        }
        catch(err){
            return errorResponse(res, err.message);
        }
    })
]

// Get transactions in money range
exports.transactions_by_money_range = [
    authenticate,

    authorize([userRoles.ROLE_SUPER_ADMIN, userRoles.ROLE_ADMIN]),

    // Validates the minMoney and maxMoney and checks if maxMoney is lesser than minMoney
    moneyRangeValidator,

    validatePage,

    asyncHandler(async(req, res, next)=>{
        try{
            const minMoney = req.params.minMoney;
            const maxMoney = req.params.maxMoney;

            const offset = (req.query.page - 1 || 0) * PAGINATION_LIMIT;

            // Query the 'LibraryBudget' table to get a list of budget transactions where the money is between 'minMoney' and 'maxMoney'.
            // The results are ordered by the money in descending order, limited to 'PAGINATION_LIMIT' results, and offset by the 'offset' variable to support pagination.
            const transactions = await LibraryBudget
                .query()
                .whereBetween(LIBRARY_BUDGET_MONEY, [minMoney, maxMoney])
                .orderBy(LIBRARY_BUDGET_MONEY, 'desc')
                .limit(PAGINATION_LIMIT)
                .offset(offset);

            return res.json(transactions);
        }
        catch(err){
            return errorResponse(res, err.message);
        }
    })
]

// Search transaction by description
exports.search_transactions = [
    authenticate,
    
    authorize([userRoles.ROLE_SUPER_ADMIN, userRoles.ROLE_ADMIN]),

    validatePage,

    queryValidator,

    asyncHandler(async(req, res, next)=>{
        const query = req.params.query;
        const offset = (req.query.page - 1 || 0) * PAGINATION_LIMIT;
        
        // Query the 'LibraryBudget' table to get a list of budget transactions where the description matches the query.
        // The results are ordered by the position of the query in the description, limited to 'PAGINATION_LIMIT' results, and offset by the 'offset' variable to support pagination.
        const transactions = await LibraryBudget
            .query()
            .select()
            .where(LIBRARY_BUDGET_DESCRIPTION, 'like', `%${query}%`)
            .orderByRaw(`LOCATE(?, ${LIBRARY_BUDGET_DESCRIPTION})`, [query])
            .limit(PAGINATION_LIMIT)
            .offset(offset);
                
        if(!transactions || transactions.length === 0){
            return notFoundResponse(res);
        }

        return res.json(transactions);
    })
]