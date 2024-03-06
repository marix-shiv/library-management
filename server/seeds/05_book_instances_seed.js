const {v4: uuidv4} = require('uuid');

exports.seed = async function(knex) {
    // Deletes ALL existing entries
    await knex('book_instances').del();

    // Inserts seed entries
    return knex('book_instances').insert([
        {
            InstanceID: uuidv4(),
            BookID: (await knex('books').where({Title: '1984'}).first()).BookID,
            Status: 'A',
            AvailableBy: null,
            Imprint: 'Signet Classics',
            IssuedToUserID: null
        },
        {
            InstanceID: uuidv4(),
            BookID: (await knex('books').where({Title: 'To Kill a Mockingbird'}).first()).BookID,
            Status: 'R',
            AvailableBy: '2025-12-20',
            Imprint: 'Grand Central Publishing',
            IssuedToUserID: null
        },
        {
            InstanceID: uuidv4(),
            BookID: (await knex('books').where({Title: 'The Great Gatsby'}).first()).BookID,
            Status: 'L',
            AvailableBy: '2026-01-20',
            Imprint: 'Scribner',
            IssuedToUserID: (await knex('users').where({Username: 'john_doe_123'}).first()).UserID
        },
        {
            InstanceID: uuidv4(),
            BookID: (await knex('books').where({Title: 'Animal Farm'}).first()).BookID,
            Status: 'M',
            AvailableBy: '2025-01-24',
            Imprint: 'Penguin Classics',
            IssuedToUserID: null
        },
        {
            InstanceID: uuidv4(),
            BookID: (await knex('books').where({Title: 'The Shining'}).first()).BookID,
            Status: 'R',
            AvailableBy: '2025-12-20',
            Imprint: 'Oxford University Press',
            IssuedToUserID: null
        },
        {
            InstanceID: uuidv4(),
            BookID: (await knex('books').where({Title: 'Misery'}).first()).BookID,
            Status: 'R',
            AvailableBy: '2025-12-20',
            Imprint: 'Pantheon Books',
            IssuedToUserID: null
        },
        {
            InstanceID: uuidv4(),
            BookID: (await knex('books').where({Title: 'The Adventures of Sherlock Holmes'}).first()).BookID,
            Status: 'R',
            AvailableBy: '2025-12-20',
            Imprint: 'Houghton Mifflin Harcourt',
            IssuedToUserID: null
        },
        {
            InstanceID: uuidv4(),
            BookID: (await knex('books').where({Title: 'The Hound of the Baskervilles'}).first()).BookID,
            Status: 'R',
            AvailableBy: '2025-12-20',
            Imprint: 'Bloomsbury Publishing',
            IssuedToUserID: null
        },
    ]);
};