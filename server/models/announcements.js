/**
 * This module defines the Announcement model for the 'announcements' table in the database.
 * The Announcement model extends the Objection.js Model class and defines the table name, ID column, and a JSON schema.
 * The JSON schema describes the shape of the Announcement objects and is used for validation before inserting or updating records.
 * The Announcement model is exported so it can be used in other parts of the application to perform operations on the 'announcements' table.
 */

const { Model } = require('objection');
const { ANNOUNCEMENTS_ANNOUNCEMENT_ID, ANNOUNCEMENTS_CONTENT, ANNOUNCEMENTS_DATE_POSTED, ANNOUNCEMENTS_TITLE } = require('../constants/fieldNames');
const { ID_MIN_MAX_LENGTH, NAME_MIN_LENGTH, NAME_MAX_LENGTH, DESC_MIN, DESC_MAX } = require('../constants/validationConstants');
const { ANNOUNCEMENTS_TABLE } = require('../constants/tableNames');

class Announcement extends Model {
    static get tableName() {
        return ANNOUNCEMENTS_TABLE;
    }

    static get idColumn() {
        return ANNOUNCEMENTS_ANNOUNCEMENT_ID;
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: [ANNOUNCEMENTS_TITLE, ANNOUNCEMENTS_CONTENT, ANNOUNCEMENTS_DATE_POSTED],
            properties: {
                [ANNOUNCEMENTS_ANNOUNCEMENT_ID]: { type: 'string', minLength: ID_MIN_MAX_LENGTH, maxLength: ID_MIN_MAX_LENGTH },
                [ANNOUNCEMENTS_TITLE]: { type: 'string', minLength: NAME_MIN_LENGTH, maxLength: NAME_MAX_LENGTH },
                [ANNOUNCEMENTS_CONTENT]: { type: 'string', minLength: DESC_MIN, maxLength: DESC_MAX },
                [ANNOUNCEMENTS_DATE_POSTED]: { type: 'string', format: 'date' },
            },
        };
    }
}

module.exports = Announcement;