/**
 * This script seeds the 'book_instances' table in the database.
 * 
 * It first deletes all existing entries in the 'book_instances' table.
 * Then, it inserts new entries into the 'book_instances' table.
 * 
 * Each book instance entry includes a unique ID, book ID, status, available by date, imprint, and issued to user ID.
 * The book ID for each book instance is retrieved by querying the 'books' table with the title.
 * The issued to user ID for each book instance is retrieved by querying the 'users' table with the username.
 * 
 * This script uses the 'uuid' library to generate unique IDs.
 */

const {v4: uuidv4} = require('uuid');

exports.seed = async function(knex) {
    // Deletes ALL existing entries
    await knex('book_instances').del();

    // Inserts seed entries
    return knex('book_instances').insert([
        {
            InstanceID: '123e4567-e89b-12d3-a456-426614174004',
            BookID: (await knex('books').where({Title: 'Test Book 1'}).first()).BookID,
            Status: 'A',
            AvailableBy: null,
            Imprint: 'Test Imprint',
            UserID: null
        },
        {
            InstanceID: uuidv4(),
            BookID: (await knex('books').where({Title: '1984'}).first()).BookID,
            Status: 'A',
            AvailableBy: null,
            Imprint: 'Signet Classics',
            UserID: null
        },
        {
            InstanceID: uuidv4(),
            BookID: (await knex('books').where({Title: 'To Kill a Mockingbird'}).first()).BookID,
            Status: 'R',
            AvailableBy: '2025-12-20',
            Imprint: 'Grand Central Publishing',
            UserID: null
        },
        {
            InstanceID: uuidv4(),
            BookID: (await knex('books').where({Title: 'The Great Gatsby'}).first()).BookID,
            Status: 'L',
            AvailableBy: '2026-01-20',
            Imprint: 'Scribner',
            UserID: (await knex('users').where({Username: 'john_doe_123'}).first()).UserID
        },
        {
            InstanceID: uuidv4(),
            BookID: (await knex('books').where({Title: 'Animal Farm'}).first()).BookID,
            Status: 'M',
            AvailableBy: '2025-01-24',
            Imprint: 'Penguin Classics',
            UserID: null
        },
        {
            InstanceID: uuidv4(),
            BookID: (await knex('books').where({Title: 'The Shining'}).first()).BookID,
            Status: 'R',
            AvailableBy: '2025-12-20',
            Imprint: 'Oxford University Press',
            UserID: null
        },
        {
            InstanceID: uuidv4(),
            BookID: (await knex('books').where({Title: 'Misery'}).first()).BookID,
            Status: 'R',
            AvailableBy: '2025-12-20',
            Imprint: 'Pantheon Books',
            UserID: null
        },
        {
            InstanceID: uuidv4(),
            BookID: (await knex('books').where({Title: 'The Adventures of Sherlock Holmes'}).first()).BookID,
            Status: 'R',
            AvailableBy: '2025-12-20',
            Imprint: 'Houghton Mifflin Harcourt',
            UserID: null
        },
        {
            InstanceID: uuidv4(),
            BookID: (await knex('books').where({Title: 'The Hound of the Baskervilles'}).first()).BookID,
            Status: 'R',
            AvailableBy: '2025-12-20',
            Imprint: 'Bloomsbury Publishing',
            UserID: null
        },
    ]);
};