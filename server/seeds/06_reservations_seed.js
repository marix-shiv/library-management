const {v4: uuidv4} = require('uuid');

exports.seed = async function(knex) {
    // Deletes ALL existing entries
    await knex('reservations').del();

    // Inserts seed entries
    return knex('reservations').insert([
        {
            ReservationID: uuidv4(),
            UserID: (await knex('users').where({Username: 'jane_smith_456'}).first()).UserID,
            InstanceID: (await knex('book_instances').where({Imprint: 'Grand Central Publishing'}).first()).InstanceID,
            DateOfReservation: new Date().toISOString().split('T')[0]
        },
        {
            ReservationID: uuidv4(),
            UserID: (await knex('users').where({Username: 'michael_345'}).first()).UserID,
            InstanceID: (await knex('book_instances').where({Imprint: 'Oxford University Press'}).first()).InstanceID,
            DateOfReservation: new Date().toISOString().split('T')[0]
        },
        {
            ReservationID: uuidv4(),
            UserID: (await knex('users').where({Username: 'sarah_jones_012'}).first()).UserID,
            InstanceID: (await knex('book_instances').where({Imprint: 'Pantheon Books'}).first()).InstanceID,
            DateOfReservation: new Date().toISOString().split('T')[0]
        },
        {
            ReservationID: uuidv4(),
            UserID: (await knex('users').where({Username: 'jim_brown_789'}).first()).UserID,
            InstanceID: (await knex('book_instances').where({Imprint: 'Houghton Mifflin Harcourt'}).first()).InstanceID,
            DateOfReservation: new Date().toISOString().split('T')[0]
        },
        {
            ReservationID: uuidv4(),
            UserID: (await knex('users').where({Username: 'jim_brown_789'}).first()).UserID,
            InstanceID: (await knex('book_instances').where({Imprint: 'Bloomsbury Publishing'}).first()).InstanceID,
            DateOfReservation: new Date().toISOString().split('T')[0]
        },
    ]);
};