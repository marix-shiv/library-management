/**
 * This file defines a middleware function for validating and sanitizing the request body.
 * The function checks each field in the request body and applies appropriate validation and sanitization.
 * It uses the express-validator library for validation and sanitization.
 * It also uses regular expressions to determine the type of some fields (e.g., dates, names).
 * If any validation errors are found, it sends a 400 Bad Request response with the validation errors.
 */

const { body, validationResult } = require('express-validator');
const express = require('express');
const router = express.Router();
const badRequestResponse = require('../utils/badRequestResponse');
const errorMessages = require('../constants/errorMessages');
const fieldNames = require('../constants/fieldNames');

// Validators
const validateDate = require('../validators/validateDate');
const validateUsername = require('../validators/validateUsername');
const validatePassword = require('../validators/validatePassword');
const validateName = require('../validators/validateName');
const validateRole = require('../validators/validateRole');
const validateMoney = require('../validators/moneyValidator');
const validateDescription = require('../validators/descriptionValidator');


// Regex Tests
// Checks if the string has the word 'date' case-insensitive
const isSomeDate = /date/i;
// Check if the string has the word 'first' or 'last' for first or last names case-insensitive
const isSomeName = /name/i;

// Check if the string has the word 'description' case-insensitive
const isSomeDescription = /description/i;

// Check if the string has the word 'description' case-insensitive
const isSomeContent = /content/i;

function validateAndSanitize(optionalFields = []) {
    return (req, res, next) => {
        const validationMiddleware = [];
    
        Object.keys(req.body).forEach(field => {
    
            let validator;

            // Validate any kind of date
            // Using custom test case because express-validator isDate isn't working properly
            if (isSomeDate.test(field)){
                validator = validateDate(field);
            }

            else if(typeof req.body[field] === 'object' && req.body[field] !== null){
                Object.keys(req.body[field]).forEach(subField => {
                    if(subField == fieldNames.USERS_ROLE){
                        validator = body(`${field}.${subField}`)
                            .exists()
                            .withMessage(errorMessages.ROLE_REQUIRED)
                            .trim()
                            .escape()
                    }
                });
            }

            else{
                validator = body(field)
                    .trim()
                    .escape();
            }

            if (field === fieldNames.USERS_USERNAME){
                validator = validateUsername()
            }

            else if (field === fieldNames.USERS_PASSWORD) {
                validator = validatePassword();
            }
            
            else if (isSomeName.test(field) || field === fieldNames.ANNOUNCEMENTS_TITLE) {
                validator = validateName(field);
            }
    
            else if (field === fieldNames.USERS_ROLE) {
                validator = validateRole();
            }

            else if (field === fieldNames.LIBRARY_BUDGET_MONEY){
                validator = validateMoney();
            }

            else if(isSomeDescription.test(field) || isSomeContent.test(field)){
                validator = validateDescription(field);
            }
    
            if (optionalFields.includes(field)) {
                validator = validator.optional();
            }
    
            validationMiddleware.push(validator);
        });
    
        // Error handling middleware
        validationMiddleware.push((req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return badRequestResponse(res, '', errors.array());
            }
            next();
        });
        
        // Use Express's built-in middleware chaining function to apply the validation middleware
        return router.use(validationMiddleware)(req, res, next);
    }
}


module.exports = validateAndSanitize;