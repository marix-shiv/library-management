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
const validateBoolean = require('../validators/validateBoolean');
const validateISBN = require('../validators/validateISBN');
const validateUUID = require('../validators/validateUUID');
const validateStatus = require('../validators/validateStatus');
const { validate } = require('uuid');

// Regex Tests
// Checks if the string has the word 'date' case-insensitive
const isSomeDate = /date/i;
// Check if the string has the word 'first' or 'last' for first or last names case-insensitive
const isSomeName = /name/i;
// Check if the string has the word 'description' case-insensitive
const isSomeDescription = /description/i;
// Check if the string has the word 'description' case-insensitive
const isSomeContent = /content/i;
// Check if the string has the word 'title' case-insensitive
const isSomeTitle = /title/i;
// Check if the string has the word 'id' case-insensitive
const isSomeID = /id/i;
// Check if the string has the word 'summary' case-insensitive
const isSomeSummary = /summary/i;

function validateAndSanitize(optionalFields = []) {
    return async (req, res, next) => {
        const validationMiddleware = [];
    
        Object.keys(req.body).forEach(field => {
    
            let validator;

            // Validate any kind of date
            // Using custom test case because express-validator isDate isn't working properly
            if (isSomeDate.test(field)){
                validator = validateDate(field);
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
            
            else if ( isSomeName.test(field) || 
                    field === fieldNames.ANNOUNCEMENTS_TITLE ||
                    field === fieldNames.LIBRARY_POLICIES_PROPERTY ||
                    isSomeTitle.test(field)) {
                validator = validateName(field);
            }
    
            else if (field === fieldNames.USERS_ROLE) {
                validator = validateRole();
            }

            else if (field === fieldNames.LIBRARY_BUDGET_MONEY){
                validator = validateMoney();
            }

            else if(isSomeDescription.test(field) || isSomeContent.test(field) || isSomeSummary.test(field)){
                validator = validateDescription(field);
            }

            else if(field === fieldNames.LIBRARY_POLICIES_CORE ||
                field === fieldNames.LIBRARY_POLICIES_VALUE_IS_INT ||
                field === fieldNames.USERS_STATUS){
                validator = validateBoolean(field);
            }

            else if(field === fieldNames.BOOKS_ISBN){
                validator = validateISBN(field);
            }

            else if(isSomeID.test(field)){
                validator = validateUUID(field);
            }

            else if(field === fieldNames.BOOK_INSTANCE_STATUS){
                validator = validateStatus(field);
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
        
        // Apply each validation middleware in sequence
        function runMiddleware(index) {
            if (index < validationMiddleware.length) {
                validationMiddleware[index](req, res, () => runMiddleware(index + 1));
            } else {
                next();
            }
        }

        runMiddleware(0);
    }
}


module.exports = validateAndSanitize;