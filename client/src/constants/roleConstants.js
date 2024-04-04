/**
 * roleConstants.js
 * 
 * This is a Node.js module that exports two objects with constants for the user roles.
 * 
 * The `ROLE_MAPPING` object has properties 'Super Admin', 'Reader', 'Librarian', and 'Library Administrator' which are set to 'S', 'U', 'L', and 'A' respectively. This object can be used to map the user roles to their corresponding single letter codes.
 * 
 * The `REVERSE_ROLE_MAPPING` object has properties 'S', 'U', 'L', and 'A' which are set to 'Super Admin', 'Reader', 'Librarian', and 'Library Administrator' respectively. This object can be used to map the single letter codes back to their corresponding user roles.
 * 
 * @module constants/roleConstants
 */

export const ROLE_MAPPING = {
    'Super Admin': 'S',
    'Reader': 'U',
    'Librarian': 'L',
    'Library Administrator': 'A'
};

export const REVERSE_ROLE_MAPPING = {
    'S': 'Super Admin',
    'U': 'Reader',
    'L': 'Librarian',
    'A': 'Library Administrator'
};