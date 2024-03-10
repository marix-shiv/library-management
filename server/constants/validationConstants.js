/**
 * This module exports an object that contains constants for various validation checks.
 * These constants define the minimum and maximum lengths for usernames, passwords, roles, and names.
 * They are used in the validation middleware to enforce constraints on the length of these fields.
 */

module.exports = {
    USERNAME_MIN_LENGTH: 5,
    USERNAME_MAX_LENGTH: 16,

    PASSWORD_MIN_LENGTH: 8,
    PASSWORD_MAX_LENGTH: 64,

    ROLE_MIN_MAX_LENGTH: 1,

    NAME_MIN_LENGTH: 1,
    NAME_MAX_LENGTH: 255
};