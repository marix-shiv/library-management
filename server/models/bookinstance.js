/**
 * This module defines the BookInstance model for the 'book_instances' table in the database.
 * The BookInstance model extends the Objection.js Model class and defines the table name, ID column, and a JSON schema.
 * The JSON schema describes the shape of the BookInstance objects and is used for validation before inserting or updating records.
 * The BookInstance model is exported so it can be used in other parts of the application to perform operations on the 'book_instances' table.
 */

const { Model } = require('objection');
const { BOOK_INSTANCES_TABLE } = require('../constants/tableNames');
const { BOOK_INSTANCE_INSTANCE_ID, BOOK_INSTANCE_IMPRINT, BOOK_INSTANCE_AVAILABLE_BY, BOOK_INSTANCE_BOOK_ID, BOOK_INSTANCE_STATUS, BOOK_INSTANCE_USER_ID } = require('../constants/fieldNames');
const { ID_MIN_MAX_LENGTH, NAME_MIN_LENGTH, NAME_MAX_LENGTH, GENRE_MIN_MAX_LENGTH } = require('../constants/validationConstants');

class BookInstance extends Model {
    static get tableName() {
        return BOOK_INSTANCES_TABLE;
    }

    static get idColumn() {
        return BOOK_INSTANCE_INSTANCE_ID;
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: [BOOK_INSTANCE_BOOK_ID, BOOK_INSTANCE_STATUS, BOOK_INSTANCE_IMPRINT],
            properties: {
                [BOOK_INSTANCE_INSTANCE_ID]: { type: 'string', minLength: ID_MIN_MAX_LENGTH, maxLength: ID_MIN_MAX_LENGTH },
                [BOOK_INSTANCE_BOOK_ID]: { type: 'string', minLength: ID_MIN_MAX_LENGTH, maxLength: ID_MIN_MAX_LENGTH },
                [BOOK_INSTANCE_STATUS]: { type: 'string', minLength: GENRE_MIN_MAX_LENGTH, maxLength: GENRE_MIN_MAX_LENGTH },
                [BOOK_INSTANCE_AVAILABLE_BY]: { type: ['string', 'null'], format: 'date' },
                [BOOK_INSTANCE_IMPRINT]: { type: 'string', minLength: NAME_MIN_LENGTH, maxLength: NAME_MAX_LENGTH },
                [BOOK_INSTANCE_USER_ID]: { type: ['string', 'null'], minLength: ID_MIN_MAX_LENGTH, maxLength: ID_MIN_MAX_LENGTH },
            },
        }
    }
}

module.exports = BookInstance;