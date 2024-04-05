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
const allowedFields = require('../utils/allowedFields');
const incrementDate = require('../utils/incrementDate');

// Constants
const userRoles = require('../constants/userRoles');
const { USERS_USER_ID, USERS_USERNAME, USERS_PASSWORD, USERS_SALT, USERS_ROLE, USERS_FIRST_NAME, USERS_LAST_NAME, USERS_DATE_OF_BIRTH, USERS_STATUS } = require('../constants/fieldNames');
const unauthorizedRequestResponse = require('../utils/unauthorizedRequestResponse');
const {PAGINATION_LIMIT} = require('../constants/paginationConstants');

// Authentication Middlewares and Functions
const authenticateUser = require('../auth/authenticateUser');
const authenticateWithoutStatusCheck = require('../auth/authenticateWithoutStatusCheck');
const generateToken = require('../auth/generateToken');
const setTokenCookie = require('../auth/setTokenCookie');
const { queryValidator } = require('../validators/queryValidator');
const { validatePage } = require('../validators/validatePage');

// Returns details of all users for authorized user
exports.all_users = [
    // Authenticate User
    authenticateUser,

    authorize([userRoles.ROLE_SUPER_ADMIN, userRoles.ROLE_ADMIN, userRoles.ROLE_LIBRARIAN]),

    asyncHandler(async(req, res, next)=>{
        let fieldsToSelect = [USERS_USER_ID, USERS_USERNAME, USERS_ROLE, USERS_FIRST_NAME, USERS_LAST_NAME, USERS_DATE_OF_BIRTH, USERS_STATUS];

        try{
            const users = await User
                .query()
                .select(fieldsToSelect)
                .orderBy(USERS_FIRST_NAME);

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

    authorize([userRoles.ROLE_SUPER_ADMIN, userRoles.ROLE_ADMIN, userRoles.ROLE_LIBRARIAN, userRoles.ROLE_USER], [userRoles.ROLE_USER]),
    
    // Validate id
    ...idValidator,

    // Data is valid

    asyncHandler(async(req, res, next)=>{
        // Only these fields will be returned using this function
        let fieldsToSelect = [USERS_USER_ID, USERS_USERNAME, USERS_ROLE, USERS_FIRST_NAME, USERS_LAST_NAME, USERS_DATE_OF_BIRTH, USERS_STATUS];

        try{
            const user = await User
                .query()
                .findById(req.params.id)
                .select(fieldsToSelect);
            
            if(!user || user.length === 0){
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

    allowedFields([USERS_USERNAME, USERS_PASSWORD, USERS_FIRST_NAME, USERS_LAST_NAME, USERS_DATE_OF_BIRTH, USERS_ROLE]),

    // Data is valid

    asyncHandler(async(req, res, next)=>{
        const { Username, Password } = req.body;
        try{
            // Check if a user with same Username already exists
            const existingUser = await User
            .query()
            .where({[USERS_USERNAME]: Username})
            .first();
            
            if(existingUser){
                return conflictRequestResponse(res, "Username already taken.");
            }
        }
        catch (err) {
            return errorResponse(res, err.message);
        }
        const hashedPassword = await hashPassword(Password);
        
        // Update the Password and Salt properties in the request body
        req.body[USERS_PASSWORD] = hashedPassword.key;
        req.body[USERS_SALT] = hashedPassword.salt;
        req.body[USERS_STATUS] = false;
        req.body[USERS_USER_ID] = uuidv4();
        req.body[USERS_DATE_OF_BIRTH] = incrementDate(req.body[USERS_DATE_OF_BIRTH]);
        
        // Save user to database
        try {
            const user = await User
            .query()
            .insert(req.body);
            
            return successResponse(res, "User Created Successfully");
        }
        
        catch (err) {
            console.log(err.data);
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

    allowedFields([USERS_USERNAME, USERS_PASSWORD, USERS_FIRST_NAME, USERS_LAST_NAME, USERS_DATE_OF_BIRTH, USERS_ROLE]),
    
    // Optionally validate and sanitize the request body
    validateAndSanitize([USERS_USERNAME, USERS_FIRST_NAME, USERS_LAST_NAME, USERS_DATE_OF_BIRTH]),

    // Data is valid

    // S can update any account
    // Authenticated user can update only their own account
    authorize([userRoles.ROLE_SUPER_ADMIN, userRoles.ROLE_ADMIN, userRoles.ROLE_LIBRARIAN, userRoles.ROLE_USER], [userRoles.ROLE_ADMIN, userRoles.ROLE_LIBRARIAN, userRoles.ROLE_USER]),

    asyncHandler(async(req, res, next)=>{
        try {
            const user = await User
                .query()
                .findById(req.params.id);

            if(!user){
                return notFoundResponse(res);
            }
            if(req.body[USERS_DATE_OF_BIRTH]){
                req.body[USERS_DATE_OF_BIRTH] = incrementDate(req.body[USERS_DATE_OF_BIRTH]);
            }
            await User
                .query()
                .findById(req.params.id)
                .patch(req.body);
                
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

    allowedFields([USERS_PASSWORD]),

    // Sanitize and validate password
    validateAndSanitize(),
    
    // S can update password of any account
    // Authenticated user can update password of only their own account
    authorize([userRoles.ROLE_SUPER_ADMIN, userRoles.ROLE_ADMIN, userRoles.ROLE_LIBRARIAN, userRoles.ROLE_USER], [userRoles.ROLE_ADMIN, userRoles.ROLE_LIBRARIAN, userRoles.ROLE_USER]),

    asyncHandler(async(req, res, next)=>{
        try{
            const user = await User
                .query()
                .findById(req.params.id);

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
    authorize([userRoles.ROLE_SUPER_ADMIN, userRoles.ROLE_ADMIN, userRoles.ROLE_LIBRARIAN], [userRoles.ROLE_ADMIN, userRoles.ROLE_LIBRARIAN]),

    asyncHandler(async(req, res, next)=>{
        try{
            const user = await User
                .query()
                .findById(req.params.id);

            if(!user || user.length === 0){
                return notFoundResponse(res);
            }

            await User
                .query()
                .deleteById(req.params.id);

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
        try {
            console.log("HERE 1");
            // Check if the user exists and the password is correct.
            const user = await User
                .query()
                .findOne({ [USERS_USERNAME]: req.body[USERS_USERNAME] });

            if (!user || !(await verifyPassword(req.body[USERS_PASSWORD], user[USERS_PASSWORD], user[USERS_SALT]))) {
                return unauthorizedRequestResponse(res, 'Invalid username or password.');
            }

            // User exists and password is correct. Log them in.
            // Generate a JWT and set it as a cookie.
            const token = generateToken(user);
            console.log("HERE 2");
            setTokenCookie(res, token);
            console.log("HERE 3");
            return successResponse(res, 'Logged in successfully.');
        }
        catch(err){
            console.log(err.message);
            return errorResponse(res, err.message);
        }
    })
];

// Logout a user
exports.logout_user = [
    authenticateWithoutStatusCheck,
    asyncHandler((req, res, next)=>{
        res.clearCookie('token');
        return successResponse(res, "Logged out successfully.");
    })
]

// Search for users
exports.search_user = [
    authenticateUser,

    authorize([userRoles.ROLE_SUPER_ADMIN, userRoles.ROLE_ADMIN, userRoles.ROLE_LIBRARIAN]),

    // Validate query
    ...queryValidator,

    // Validate page number
    ...validatePage,

    asyncHandler(async(req, res, next)=>{
        try{
            const validFields = [USERS_USER_ID, USERS_USERNAME, USERS_FIRST_NAME, USERS_LAST_NAME, USERS_DATE_OF_BIRTH];
            const query = req.params.query;
            const offset = (req.query.page - 1 || 0) * PAGINATION_LIMIT;
            
            // Query the 'User' table to get a list of users where the first name or last name matches the query.
            // The results are ordered by the position of the query in the full name (first name + last name), and then by the full name in alphabetical order, limited to 'PAGINATION_LIMIT' results, and offset by the 'offset' variable to support pagination.
            const users = await User
                .query()
                .select(validFields)
                .where(USERS_FIRST_NAME, 'like', `%${query}%`)
                .orWhere(USERS_LAST_NAME, 'like', `%${query}%`)
                .orderByRaw(`LOCATE(?, CONCAT(${USERS_FIRST_NAME}, ' ', ${USERS_LAST_NAME}))`, [query])
                .orderByRaw(`CONCAT(${USERS_FIRST_NAME}, ' ', ${USERS_LAST_NAME})`)
                .limit(PAGINATION_LIMIT)
                .offset(offset);
            
            if(!users || users.length === 0){
                return notFoundResponse(res);
            }
    
            return res.json(users);
        }
        
        catch (err) {
            errorResponse(res, err.message);
        }
    })
]

// Alter status of a user
exports.verify_user = [
    authenticateUser,

    authorize([userRoles.ROLE_SUPER_ADMIN]),

    allowedFields([USERS_STATUS]),

    validateAndSanitize(),

    ...idValidator,

    asyncHandler(async(req, res, next)=>{
        try{
            const user = await User
                .query()
                .findById(req.params.id);

            if(!user || user.length === 0){
                return notFoundResponse(res);
            }

            await User
                .query()
                .patch(req.body)
                .findById(req.params.id)
            if(req.body[USERS_STATUS] === 0){
                return successResponse(res, "User Banned Successfully.");
            }

            return successResponse(res, "User verified Successfully");
        }
        catch(err){
            errorResponse(res, err.message);
        }
    })
]

// Returns 200 if no user with such username is present, Conflict otherwise
exports.check_username_presence = [
    ...queryValidator,

    asyncHandler(async(req, res, next)=>{
        try {
            const username = req.params.query;

            const user = await User
                .query()
                .findOne({ [USERS_USERNAME]: username });

            if (user) {
                return conflictRequestResponse(res, "Username already in use");
            } else {
                return successResponse(res);
            }
        } catch (err) {
            errorResponse(res, err.message);
        }
    })
]

// Return 200 if token is valid and error response otherwise
exports.check_token = [
    authenticateUser,

    asyncHandler(async(req, res, next)=>{
        return successResponse(res);
    })
]

// Returns user's data using jwt token
exports.my_data = [
    authenticateWithoutStatusCheck,

    asyncHandler(async(req, res, next)=>{
        try{
            const { [USERS_USERNAME]: Username, [USERS_STATUS]: Status, [USERS_ROLE]: Role } = req.user;
            return successResponse(res, '', { Username, Status, Role });
        }
        catch(err){
            return errorResponse(res, err.message);
        }
    })
]

exports.get_id_from_username = [
    authenticateUser,

    authorize([userRoles.ROLE_SUPER_ADMIN, userRoles.ROLE_LIBRARIAN]),

    ...queryValidator,

    asyncHandler(async(req, res, next)=>{
        try {
            const username = req.params.query;

            const user = await User
                .query()
                .select(USERS_USER_ID, USERS_ROLE)
                .findOne({ [USERS_USERNAME]: username });

            if (user) {
                if (user[USERS_ROLE] !== userRoles.ROLE_USER) {
                    return errorResponse(res, "User's role is not ROLE_USER");
                }
                return successResponse(res, '' ,user);
            } else {
                return badRequestResponse(res);
            }
        } catch (err) {
            errorResponse(res, err.message);
        }
    })
]

exports.get_my_user_id=[
    authenticateUser,

    asyncHandler(async(req, res, next)=>{
        try{
            const { [USERS_USER_ID]: UserID } = req.user;
            return successResponse(res, '', {UserID}); 

        }
        catch{
            return errorResponse(res, err.message);
        }
    })
]