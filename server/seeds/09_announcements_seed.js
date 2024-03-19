/**
 * This script seeds the 'announcements' table in the database.
 * 
 * It first deletes all existing entries in the 'announcements' table.
 * Then, it inserts new entries into the 'announcements' table.
 * 
 * Each announcement entry includes a unique ID, title, content, and date posted.
 * 
 * This script uses the 'uuid' library to generate unique IDs.
 */

const { v4: uuidv4 } = require('uuid');

exports.seed = async function(knex) {
    // Deletes ALL existing entries
    await knex('announcements').del();

    // Inserts seed entries
    return knex('announcements').insert([
        {
            AnnouncementID: '123e4567-e89b-12d3-a456-426614174008',
            Title: 'Test Announcement 1',
            Content: 'Test Content 1',
            DatePosted: '2000-01-01'
        },
        {
            AnnouncementID: uuidv4(),
            Title: 'Library Closed for Maintenance',
            Content: 'The library will be closed for maintenance on 01/01/2023.',
            DatePosted: '2023-01-01'
        },
        {
            AnnouncementID: uuidv4(),
            Title: 'New Books Added',
            Content: 'We have added new books to our collection. Come check them out!',
            DatePosted: '2023-01-02'
        },
        {
            AnnouncementID: uuidv4(),
            Title: 'Book Club Meeting',
            Content: 'Join us for our monthly book club meeting next Tuesday at 6pm.',
            DatePosted: '2023-01-03'
        },
        {
            AnnouncementID: uuidv4(),
            Title: 'Summer Reading Program',
            Content: 'Sign up for our summer reading program and win prizes!',
            DatePosted: '2023-01-04'
        },
        {
            AnnouncementID: uuidv4(),
            Title: 'Library Hours Extended',
            Content: 'We are now open until 9pm on weekdays.',
            DatePosted: new Date().toISOString().split('T')[0]
        },
    ]);
};