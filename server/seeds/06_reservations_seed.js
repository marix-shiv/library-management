/**
 * This script seeds the 'reservations' table in the database.
 * 
 * It first deletes all existing entries in the 'reservations' table.
 * Then, it inserts new entries into the 'reservations' table.
 * 
 * Each reservation entry includes a unique ID, user ID, book instance ID, and date of reservation.
 * The user ID for each reservation is retrieved by querying the 'users' table with the username.
 * The book instance ID for each reservation is retrieved by querying the 'book_instances' table with the imprint.
 * 
 * This script uses the 'uuid' library to generate unique IDs.
 */

const {v4: uuidv4} = require('uuid');

exports.seed = async function(knex) {
    // Deletes ALL existing entries
    await knex('reservations').del();

    // Inserts seed entries
    return knex('reservations').insert([
        {
            ReservationID: '123e4567-e89b-12d3-a456-426614174005',
            UserID: (await knex('users').where({Username: 'testUsername1'}).first()).UserID,
            BookID: (await knex('books').where({Title: "Test Book 1"}).first()).BookID,
            DateOfReservation: new Date().toISOString().split('T')[0]
        },
        {
            ReservationID: uuidv4(),
            UserID: (await knex('users').where({Username: 'jane_smith_456'}).first()).UserID,
            BookID: (await knex('books').where({Title: "1984"}).first()).BookID,
            DateOfReservation: new Date().toISOString().split('T')[0]
        },
        {
            ReservationID: uuidv4(),
            UserID: (await knex('users').where({Username: 'michael_345'}).first()).UserID,
            BookID: (await knex('books').where({Title: "The Great Gatsby"}).first()).BookID,
            DateOfReservation: new Date().toISOString().split('T')[0]
        },
        {
            ReservationID: uuidv4(),
            UserID: (await knex('users').where({Username: 'sarah_jones_012'}).first()).UserID,
            BookID: (await knex('books').where({Title: "Animal Farm"}).first()).BookID,
            DateOfReservation: new Date().toISOString().split('T')[0]
        },
        {
            ReservationID: uuidv4(),
            UserID: (await knex('users').where({Username: 'jim_brown_789'}).first()).UserID,
            BookID: (await knex('books').where({Title: "The Shining"}).first()).BookID,
            DateOfReservation: new Date().toISOString().split('T')[0]
        },
        {
            ReservationID: uuidv4(),
            UserID: (await knex('users').where({Username: 'jim_brown_789'}).first()).UserID,
            BookID: (await knex('books').where({Title: "Misery"}).first()).BookID,
            DateOfReservation: new Date().toISOString().split('T')[0]
        },
        {
            ReservationID: uuidv4(),
            UserID: (await knex('users').where({Username: 'sarah_jones_012'}).first()).UserID,
            BookID: (await knex('books').where({Title: "The Adventures of Sherlock Holmes"}).first()).BookID,
            DateOfReservation: new Date().toISOString().split('T')[0]
        },
    ]);
};