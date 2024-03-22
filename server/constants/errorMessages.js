/**
 * This module exports an object that contains error messages for various validation checks.
 * These messages are used in the validation middleware to provide more detailed feedback to the client when a request fails validation.
 * The messages cover a range of issues, including invalid dates, incorrect username or password length, missing or invalid user roles, and empty request bodies.
 */

module.exports = {
    INVALID_DATE: 'Please enter a valid date.',

    USERNAME_LENGTH: 'Username must be between 5 and 16 characters.',

    PASSWORD_LENGTH: 'Password must be between 8 and 64 characters.',
    PASSWORD_COMPLEXITY: 'Password must contain one uppercase, one lowercase, one digit and one special character.',
    
    NAME_LENGTH: 'Name must be between 1 and 256 characters.',

    ROLE_REQUIRED: 'Role is required.',
    ROLE_LENGTH: 'Role must be a single character.',
    ROLE_INVALID: 'Invalid Role.',

    USER_ID_REQUIRED: 'id is required.',
    USER_ID_UUID: 'Invalid id',

    REQUEST_BODY_EMPTY: 'Request Body is Empty.',

    DATE_VALID: 'Invalid Date',

    ACCESS_DENIED: 'Access denied. No token provided.',
    INVALID_TOKEN: 'Invalid token.',

    INVALID_PAGE_NUMBER: 'Invalid Page Number',

    MONEY_REQUIRED: 'Money is required.',
    MONEY_VALID: 'Money must be an integer between 0 and 99999999999999999',
    MONEY_RANGE_INVALID: 'Money out of range',

    DESC_REQUIRED: 'Description is required.',
    DESC_LENGTH: 'Description must be between 1 and 10000 characters long',

    BOOLEAN_FIELD_INVALID: 'Boolean Value is required',

    INTEGER_VALUE_INVALID: 'Integer must be between 0 to 99999999999999999',
    STRING_VALUE_INVALID: 'String must be between 0 to 255',

    ISBN_INVALID: 'ISBN must be 13 digits integer',

    INVALID_STATUS: 'Status must be one of "A", "L", "M" or "R"',

    USER_NOT_VERIFIED: 'User must be verified to access this page.'
};