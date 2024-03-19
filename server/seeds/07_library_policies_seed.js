/**
 * This script seeds the 'library_policies' table in the database.
 * 
 * It first deletes all existing entries in the 'library_policies' table.
 * Then, it inserts new entries into the 'library_policies' table.
 * 
 * Each policy entry includes a unique ID, property, and value.
 * The property is the name of the policy, and the value is the policy's value.
 * 
 * This script uses the 'uuid' library to generate unique IDs.
 */

const {v4: uuidv4} = require('uuid');
const policies = require('../constants/policyConstants');

exports.seed = async function(knex) {
    // Deletes ALL existing entries
    await knex('library_policies').del();

    // Inserts seed entries
    return knex('library_policies').insert([
        {
            PolicyID: '123e4567-e89b-12d3-a456-426614174006',
            Property: "Test Policy 1",
            Value: '100', // Maximum number of books a user can reserve at a time
            Core: false,
            ValueIsInt: true
        },
        {
            PolicyID: uuidv4(),
            Property: policies.MAX_RESERVATIONS_PER_USER,
            Value: '5', // Maximum number of books a user can reserve at a time
            Core: true,
            ValueIsInt: true
        },
        {
            PolicyID: uuidv4(),
            Property: policies.MAX_LOAN_DURATION,
            Value: '14', // Maximum duration (in days) for which a user can borrow a book
            Core: true,
            ValueIsInt: true
        },
        {
            PolicyID: uuidv4(),
            Property: policies.MAX_RENEWALS_PER_BOOK,
            Value: '3', // Maximum number of times a user can renew a book loan
            Core: true,
            ValueIsInt: true
        },
        {
            PolicyID: uuidv4(),
            Property: policies.LATE_RETURN_PENALTY_PER_DAY,
            Value: '1', // Penalty (in your currency) a user has to pay for each day a book is returned late
            Core: true,
            ValueIsInt: true
        },
        {
            PolicyID: uuidv4(),
            Property: policies.MAX_RESERVATION_DURATION,
            Value: '7', // Duration (in days) for which a book is reserved for a user before it becomes available to others if not picked up
            Core: true,
            ValueIsInt: true
        },
        {
            PolicyID: uuidv4(),
            Property: policies.MAX_ISSUED_BOOKS_PER_USER,
            Value: '5', // Maximum number of books a user can issue at a time
            Core: true,
            ValueIsInt: true
        },
        {
            PolicyID: uuidv4(),
            Property: policies.MAINTENANCE_DAYS,
            Value: 'Saturday, Sunday', // Holiday Days separated by commas and space
            Core: true,
            ValueIsInt: false
        },
        {
            PolicyID: uuidv4(),
            Property: policies.LOST_BOOK_FEE_PERCENTAGE,
            Value: '150', // 150% of the book's cost
            Core: true,
            ValueIsInt: true
        },
        {
            PolicyID: uuidv4(),
            Property: policies.MINOR_DAMAGE_FEE_PERCENTAGE,
            Value: '10',
            Core: true,
            ValueIsInt: true
        },
        {
            PolicyID: uuidv4(),
            Property: policies.MODERATE_DAMAGE_FEE_PERCENTAGE,
            Value: '25',
            Core: true,
            ValueIsInt: true
        },
        {
            PolicyID: uuidv4(),
            Property: policies.MAJOR_DAMAGE_FEE_PERCENTAGE,
            Value: '50',
            Core: true,
            ValueIsInt: true
        },
        {
            PolicyID: uuidv4(),
            Property: policies.SEVERE_DAMAGE_FEE_PERCENTAGE,
            Value: '100',
            Core: true,
            ValueIsInt: true
        },
        {
            PolicyID: uuidv4(),
            Property: policies.PRINTING_FEE_PER_PAGE,
            Value: '1',
            Core: true,
            ValueIsInt: true
        },
        {
            PolicyID: uuidv4(),
            Property: policies.MAX_PRINT_PAGES_PER_DAY,
            Value: '200',
            Core: true,
            ValueIsInt: true
        },
        {
            PolicyID: uuidv4(),
            Property: policies.MEMBERSHIP_FEES,
            Value: '1000',
            Core: true,
            ValueIsInt: true
        },
        {
            PolicyID: uuidv4(),
            Property: policies.MEMBERSHIP_DURATION_IN_MONTHS,
            Value: '12',
            Core: true,
            ValueIsInt: true
        }
    ]);
};