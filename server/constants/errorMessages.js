/**
 * This module exports an object that contains error messages for various validation checks.
 * These messages are used in the validation middleware to provide more detailed feedback to the client when a request fails validation.
 * The messages cover a range of issues, including invalid dates, incorrect username or password length, missing or invalid user roles, and empty request bodies.
 */

module.exports = {
    INVALID_DATE: 'Date of birth must be a valid date.',

    USERNAME_LENGTH: 'Username must be between 5 and 16 characters.',

    PASSWORD_LENGTH: 'Password must be between 8 and 64 characters.',
    PASSWORD_COMPLEXITY: 'Password must contain one uppercase, one lowercase, one digit and one special character.',
    
    NAME_LENGTH: 'Name must be between 1 and 256 characters.',

    ROLE_REQUIRED: 'Role is required.',
    ROLE_LENGTH: 'Role must be a single character.',
    ROLE_INVALID: 'Role must be one of "A", "S", "L", or "U".',

    USER_ID_REQUIRED: 'id is required.',
    USER_ID_UUID: 'id must be a valid UUID.',

    REQUEST_BODY_EMPTY: 'Request Body is Empty.',

    DATE_VALID: 'Date must be a valid date.'
};