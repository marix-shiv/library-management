/**
 * This module defines the Announcement model for the 'announcements' table in the database.
 * The Announcement model extends the Objection.js Model class and defines the table name, ID column, and a JSON schema.
 * The JSON schema describes the shape of the Announcement objects and is used for validation before inserting or updating records.
 * The Announcement model is exported so it can be used in other parts of the application to perform operations on the 'announcements' table.
 */

const { Model } = require('objection');

class Announcement extends Model {
    static get tableName() {
        return 'announcements';
    }

    static get idColumn() {
        return 'AnnouncementID';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['Title', 'Content', 'DatePosted'],
            properties: {
                AnnouncementID: { type: 'string', length: 36 },
                Title: { type: 'string', minLength: 1, maxLength: 256 },
                Content: { type: 'string', minLength: 1, maxLength: 10000 },
                DatePosted: { type: 'string', format: 'date' },
            },
        };
    }
}

module.exports = Announcement;