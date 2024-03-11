/**
 * This file defines the controller functions for the User model.
 * Each function corresponds to a route for a CRUD operation (Create, Read, Update, Delete).
 * Middleware functions are used for validation, sanitization, and authorization.
 * Utility functions are used for password hashing and sending responses.
 */

const User = require('../models/users');
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

// Constants
const userRoles = require('../constants/userRoles');
const { USERS_USER_ID, USERS_USERNAME, USERS_PASSWORD, USERS_SALT, USERS_ROLE, USERS_FIRST_NAME, USERS_LAST_NAME, USERS_DATE_OF_BIRTH, USERS_STATUS } = require('../constants/fieldNames');
const unauthorizedRequestResponse = require('../utils/unauthorizedRequestResponse');

// Authentication Middlewares and Functions
const authenticateUser = require('../auth/authenticateUser');
const generateToken = require('../auth/generateToken');
const setTokenCookie = require('../auth/setTokenCookie');

// Returns details of all users for authorized user
exports.all_users = [
    // Authenticate User
    authenticateUser,

    // If the user is not an A, S or L, redirect them to 
    authorize([userRoles.ROLE_SUPER_ADMIN, userRoles.ROLE_ADMIN, userRoles.ROLE_LIBRARIAN]),

    asyncHandler(async(req, res, next)=>{
        let fieldsToSelect = [USERS_USER_ID, USERS_USERNAME, USERS_ROLE, USERS_FIRST_NAME, USERS_LAST_NAME, USERS_DATE_OF_BIRTH, USERS_STATUS];

        try{
            const users = await User.query().select(fieldsToSelect);
            return res.json(users);
        }
        catch (err) {
            return errorResponse(res, err.message);
        }
    })
]

// Get user information by id(UserID in this case)
exports.user_details = [
    // Authenticate User
    authenticateUser,

    // Validate id
    ...idValidator,

    // Data is valid

    // If the user is a U and they're trying to access another user's details, respond with 403 Forbidden
    authorize([userRoles.ROLE_SUPER_ADMIN, userRoles.ROLE_ADMIN, userRoles.ROLE_LIBRARIAN, userRoles.ROLE_USER], [userRoles.ROLE_USER]),

    asyncHandler(async(req, res, next)=>{
        // Only these fields will be returned using this function
        let fieldsToSelect = [USERS_USER_ID, USERS_USERNAME, USERS_ROLE, USERS_FIRST_NAME, USERS_LAST_NAME, USERS_DATE_OF_BIRTH, USERS_STATUS];

        try{
            const user = await User.query().findById(req.params.id).select(fieldsToSelect);
            if(!user){
                return notFoundResponse(res);
            }
            return res.json(user);
        }
        catch (err) {
            return errorResponse(res, err.message);
        }
    })
]

// Create a new user using req body after validation and sanitization
exports.create_user = [
    //Body contains Username, Password, date_of_birth, first_name, last_name, Role

    // Validate and sanitize the request body
    validateAndSanitize(),

    // Data is valid

    asyncHandler(async(req, res, next)=>{
        const { Username, Password } = req.body;
        try{
            // Check if a user with same Username already exists
            const existingUser = await User.query().where({[USERS_USERNAME]: Username}).first();
            if(existingUser){
                return conflictRequestResponse(res, "Username already taken.");
            }
        }
        catch (err) {
            return errorResponse(res);
        }
        const hashedPassword = await hashPassword(Password);

        // Update the Password and Salt properties in the request body
        req.body.Password = hashedPassword.key;
        req.body.Salt = hashedPassword.salt;
        req.body.Status = false;
        req.body.UserID = uuidv4();

        // Save user to database
        try {
            const user = await User.query().insert(req.body);
            // Create a new object with only the properties you want to return
            const userResponse = {
                Username: user.Username,
                Role: user.Role,
                'first_name': user['first_name'],
                'last_name': user['last_name'],
                Status: user.Status
            }
            return successResponse(res, "User Created Successfully", userResponse);
        }

        catch (err) {
            return errorResponse(res, err.message);
        }
    })
]

// Update details of the user other than password and role
exports.update_user_details = [
    // Authenticate User
    authenticateUser,

    // validate id
    ...idValidator,

    // Check if request body is empty
    checkEmptyRequestBody,

    // Custom validator to ensure no extra fields are present
    (req, res, next) => {
        const validFields = [USERS_USERNAME, USERS_FIRST_NAME, USERS_LAST_NAME, USERS_DATE_OF_BIRTH];
        const invalidFields = Object.keys(req.body).filter(field => !validFields.includes(field) && typeof req.body[field] !== 'object');

        if (invalidFields.length > 0) {
            return badRequestResponse( res , `Invalid field(s): ${invalidFields.join(', ')}` )
        }
        next();
    },
    
    // Optionally validate and sanitize the request body
    validateAndSanitize([USERS_USERNAME, USERS_FIRST_NAME, USERS_LAST_NAME, USERS_DATE_OF_BIRTH]),

    // Data is valid

    // S can update any account
    // Authenticated user can update only their own account
    authorize([userRoles.ROLE_SUPER_ADMIN, userRoles.ROLE_ADMIN, userRoles.ROLE_LIBRARIAN, userRoles.ROLE_USER], [userRoles.ROLE_ADMIN, userRoles.ROLE_LIBRARIAN, userRoles.ROLE_USER]),

    asyncHandler(async(req, res, next)=>{
        try {
            const user = await User.query().findById(req.params.id);

            const updatedData = Object.keys(req.body).reduce((result, field) => {
                if (typeof req.body[field] !== "object") {
                    result[field] = req.body[field];
                }
                return result;
            }, {});

            if(!user){
                return notFoundResponse(res);
            }
            await User
                .query()
                .findById(req.params.id)
                .patch(updatedData);
                
            return successResponse(res, "User Updated Successfully");
        }
        catch (err) {
            return errorResponse(res, err.message);
        }
    })
];

// Update password of the user
exports.update_password = [
    // Authenticate User
    authenticateUser,

    //validate id
    ...idValidator,

    // check if request body is empty
    checkEmptyRequestBody,

    // Sanitize and validate password
    validateAndSanitize(),
    
    // S can update password of any account
    // Authenticated user can update password of only their own account
    authorize([userRoles.ROLE_SUPER_ADMIN, userRoles.ROLE_ADMIN, userRoles.ROLE_LIBRARIAN, userRoles.ROLE_USER], [userRoles.ROLE_ADMIN, userRoles.ROLE_LIBRARIAN, userRoles.ROLE_USER]),

    asyncHandler(async(req, res, next)=>{
        try{
            const user = await User.query().findById(req.params.id);
            if(!user){
                return notFoundResponse(res);
            }
        }
        catch (err) {
            return errorResponse(res);
        }
        try{
            // Hash password
            const hashedPassword = await hashPassword(req.body[USERS_PASSWORD]);

            // Store the updated key and salt
            const updatedPasswordData = {
                [USERS_PASSWORD]: hashedPassword.key,
                [USERS_SALT]: hashedPassword.salt
            }

            // Update password
            await User.
                query().
                findById(req.params.id).
                patch(updatedPasswordData);
            return successResponse(res, "Password Updated Successfully");
        }
        catch (err) {
            return errorResponse(res);
        }
    })
]

// Delete user
exports.delete_user = [
    // Authenticate User
    authenticateUser,

    // validate id
    ...idValidator,

    // Data is valid

    // S can delete any account
    // Authenticated user can delete only their own account
    authorize([userRoles.ROLE_SUPER_ADMIN, userRoles.ROLE_ADMIN, userRoles.ROLE_LIBRARIAN, userRoles.ROLE_USER], [userRoles.ROLE_ADMIN, userRoles.ROLE_LIBRARIAN, userRoles.ROLE_USER]),

    asyncHandler(async(req, res, next)=>{
        try{
            const user = await User.query().findById(req.params.id);
            if(!user){
                return notFoundResponse(res);
            }
            await User.query().deleteById(req.params.id);

            // If the user being deleted is the same as the currently authenticated user, log them out.
            if (req.user[USERS_USER_ID] === req.params.id) {
                res.clearCookie('token');
                return successResponse(res, "User Deleted Successfully. You have been logged out.");
            }

            return successResponse(res, "User Deleted Successfully")
        }
        catch (err) {
            return errorResponse(res);
        }
    })
]

// Login a user
exports.login_user = [
    // Validate and sanitize fields.
    validateAndSanitize(),

    // Process request after validation and sanitization.
    asyncHandler(async (req, res, next) => {
        // Check if the user exists and the password is correct.
        const user = await User.query().findOne({ [USERS_USERNAME]: req.body[USERS_USERNAME] });
        if (!user || !(await verifyPassword(req.body[USERS_PASSWORD], user[USERS_PASSWORD], user[USERS_SALT]))) {
            unauthorizedRequestResponse(res, 'Invalid username or password.');
            return;
        }
        // User exists and password is correct. Log them in.
        // Generate a JWT and set it as a cookie.
        const token = generateToken(user);
        setTokenCookie(res, token);
        return successResponse(res, 'Logged in successfully.');
    })
];

// Logout a user
exports.logout_user = [
    authenticateUser,
    asyncHandler((req, res, next)=>{
        res.clearCookie('token');
        return successResponse(res, "Logged out successfully.");
    })
]