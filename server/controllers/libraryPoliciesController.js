/**
 * This module exports functions that handle requests to the library policies resource.
 * 
 * The functions handle the following requests:
 * - GET all library policies
 * - GET a specific library policy by its ID
 * - POST a new library policy
 * - PATCH an existing library policy
 * - DELETE a library policy
 * - SEARCH library policies based on a query
 * 
 * Each function uses the LibraryPolicy model to interact with the database and utility functions to send responses and handle errors.
 */

const LibraryPolicy = require('../models/librarypolicies');
const asyncHandler = require('express-async-handler');
const {v4: uuidv4} = require('uuid');

// Middleware Functions
const {idValidator} = require('../middlewares/idValidator');
const {queryValidator} = require('../validators/queryValidator');
const { validatePage } = require('../validators/validatePage');
const validatePolicyValue = require('../middlewares/policiesValueValidator');
const maintenanceDaysIfRequired = require('../middlewares/maintenanceDaysIfRequired');
const validatePolicyValueFromBody = require('../validators/validatePolicyValueFromBody');
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
const { LIBRARY_POLICIES_PROPERTY, LIBRARY_POLICIES_POLICY_ID, LIBRARY_POLICIES_VALUE, LIBRARY_POLICIES_CORE, LIBRARY_POLICIES_VALUE_IS_INT, LIBRARY_BUDGET_BUDGET_ID} = require('../constants/fieldNames');
const { PAGINATION_LIMIT } = require('../constants/paginationConstants');
const { MAINTENANCE_DAYS } = require('../constants/policyConstants')

// Authentication Middlewares and Functions
const authenticate = require('../auth/authenticateUser');

exports.all_policies = [
    // Authenticate User
    authenticate,

    ...validatePage,

    asyncHandler(async(req, res, next)=>{
        try{
            const offset = (req.query.page - 1 || 0) * PAGINATION_LIMIT;
            const authors = await LibraryPolicy
                .query()
                .select()
                .orderBy('Property') // Order by 'Property' in ascending order
                .limit(PAGINATION_LIMIT)
                .offset(offset)

            return res.json(authors);
        }

        catch ( err ) {
            return errorResponse(res, err.message);
        }
    })
]

exports.policy_details = [
    authenticate,

    ...idValidator,

    asyncHandler(async(req, res, next)=>{
        try{
            const policyFields = [LIBRARY_POLICIES_PROPERTY, LIBRARY_POLICIES_VALUE];
            const policyDetails = await LibraryPolicy
                .query()
                .findById(req.params.id)
                .select(policyFields)
            
            res.json(policyDetails);
        }
        catch(err){
            errorResponse(res, res.message);
        }
    })
]

exports.create_policy = [
    authenticate,

    authorize([userRoles.ROLE_SUPER_ADMIN, userRoles.ROLE_ADMIN]),

    allowedFields([LIBRARY_POLICIES_PROPERTY, LIBRARY_POLICIES_VALUE, LIBRARY_POLICIES_CORE, LIBRARY_POLICIES_VALUE_IS_INT]),
    
    validateAndSanitize(),

    validatePolicyValueFromBody,

    asyncHandler(async(req, res, next)=>{
        if (!req.body[LIBRARY_POLICIES_PROPERTY] || !req.body[LIBRARY_POLICIES_VALUE]) {
            return badRequestResponse(res, "Missing required fields.");
        }
        
        try{
            req.body[LIBRARY_POLICIES_POLICY_ID] = uuidv4();
            await LibraryPolicy
                .query()
                .insert(req.body);
    
            return successResponse(res, "Policy Created Successfully.");
        }
        catch(err){
            return errorResponse(res, err.message);
        }
    })
]

exports.update_policy = [
    authenticate,

    authorize([userRoles.ROLE_SUPER_ADMIN, userRoles.ROLE_ADMIN]),

    allowedFields([LIBRARY_POLICIES_PROPERTY, LIBRARY_POLICIES_VALUE, LIBRARY_POLICIES_CORE]),
    
    validateAndSanitize(),

    validatePolicyValue,

    maintenanceDaysIfRequired,

    ...idValidator,

    asyncHandler(async(req, res, next)=>{
        try{
            const policy = req.policy;
            
            if(!policy || policy.length === 0){
                return notFoundResponse(res);
            }

            if(policy[LIBRARY_POLICIES_CORE] && (req.body[LIBRARY_POLICIES_PROPERTY] || req.body[LIBRARY_POLICIES_CORE])){
                return conflictRequestResponse(res, "Only the Value field can be updated for core policies.");
            }

            await LibraryPolicy
                .query()
                .findById(req.params.id)
                .patch(req.body);
        
            return successResponse(res, "Policy Updated Successfully.");
        }
        catch(err){
            return errorResponse(res, err.message);
        }
    })
]

exports.delete_policy = [
    authenticate,
    
    authorize([userRoles.ROLE_SUPER_ADMIN, userRoles.ROLE_ADMIN]),

    // Validate id
    ...idValidator,

    asyncHandler(async(req, res, next)=>{
        try{
            const policy = await LibraryPolicy
                .query()
                .findById(req.params.id)
            
            if(!policy || policy.length === 0){
                return notFoundResponse(res);
            }
            if(policy.Core){
                return conflictRequestResponse(res, "Core Policies can not be deleted.");
            }

            await LibraryPolicy
                .query()
                .deleteById(req.params.id)

            return successResponse(res, "Policy Deleted Successfully.");
        }

        catch ( err ) {
            return errorResponse(res, err.message);
        }
    })
]

exports.search_policies = [
    authenticate,

    ...queryValidator,

    ...validatePage,

    asyncHandler(async(req, res, next)=>{
        const validFields = [LIBRARY_POLICIES_POLICY_ID, LIBRARY_POLICIES_PROPERTY, LIBRARY_POLICIES_VALUE];
        const query = req.params.query;
        const offset = (req.query.page - 1 || 0) * PAGINATION_LIMIT;

        const policies = await LibraryPolicy
            .query()
            .select(validFields)
            .where(LIBRARY_POLICIES_PROPERTY, 'like', `%${query}%`)
            .orderByRaw(`position('${query}' in ${LIBRARY_POLICIES_PROPERTY})`)
            .offset(offset)
            .limit(PAGINATION_LIMIT);

        return res.json(policies);
    })
]