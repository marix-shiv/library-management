/**
 * This module exports an object that contains constants for various validation checks.
 * These constants define the minimum and maximum lengths for usernames, passwords, roles, and names.
 * They are used in the validation middleware to enforce constraints on the length of these fields.
 */

module.exports = {
    ID_MIN_MAX_LENGTH: 36,

    USERNAME_MIN_LENGTH: 5,
    USERNAME_MAX_LENGTH: 20,

    // 128 characters is fixed due to hashing
    PASSWORD_MIN_MAX_LENGTH: 128,

    // 32 characters is fixed due to randomly generated 16 bytes converted to hexadecimal format making it 32 characters
    SALT_MIN_MAX_LENGTH: 32,

    ROLE_MIN_MAX_LENGTH: 1,

    NAME_MIN_LENGTH: 1,
    NAME_MAX_LENGTH: 255,

    PAGE_MIN_LENGTH: 1,

    MONEY_MIN: 0,
    MONEY_MAX: 99999999999999999,

    DESC_MIN: 1,
    DESC_MAX: 10000,

    GENRE_MIN_MAX_LENGTH: 1,

    ISBN_MIN_MAX_LENGTH: 13
};