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

exports.seed = async function(knex) {
    // Deletes ALL existing entries
    await knex('library_policies').del();

    // Inserts seed entries
    return knex('library_policies').insert([
        {
            PolicyID: uuidv4(),
            Property: 'max_reservations_per_user',
            Value: '5' // Maximum number of books a user can reserve at a time
        },
        {
            PolicyID: uuidv4(),
            Property: 'max_loan_duration',
            Value: '14' // Maximum duration (in days) for which a user can borrow a book
        },
        {
            PolicyID: uuidv4(),
            Property: 'max_renewals_per_book',
            Value: '3' // Maximum number of times a user can renew a book loan
        },
        {
            PolicyID: uuidv4(),
            Property: 'late_return_penalty_per_day',
            Value: '1' // Penalty (in your currency) a user has to pay for each day a book is returned late
        },
        {
            PolicyID: uuidv4(),
            Property: 'reservation_duration',
            Value: '7' // Duration (in days) for which a book is reserved for a user before it becomes available to others if not picked up
        },
        {
            PolicyID: uuidv4(),
            Property: 'max_books_per_user',
            Value: '5' // Maximum number of books a user can borrow at a time
        },
    ]);
};