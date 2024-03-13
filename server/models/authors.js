/**
 * This module defines the Author model for the 'authors' table in the database.
 * The Author model extends the Objection.js Model class and defines the table name, ID column, and a JSON schema.
 * The JSON schema describes the shape of the Author objects and is used for validation before inserting or updating records.
 * The Author model is exported so it can be used in other parts of the application to perform operations on the 'authors' table.
 */

const { Model } = require('objection');
const { AUTHORS_TABLE } = require('../constants/tableNames');
const { AUTHORS_AUTHOR_ID, AUTHORS_FIRST_NAME, AUTHORS_LAST_NAME, AUTHORS_DATE_OF_BIRTH, AUTHORS_DATE_OF_DEATH } = require('../constants/fieldNames');
const { ID_MIN_MAX_LENGTH, NAME_MIN_LENGTH, NAME_MAX_LENGTH,  } = require('../constants/validationConstants');

class Author extends Model {
    static get tableName() {
        return AUTHORS_TABLE;
    }

    static get idColumn() {
        return AUTHORS_AUTHOR_ID;
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: [AUTHORS_FIRST_NAME, AUTHORS_LAST_NAME, AUTHORS_DATE_OF_BIRTH],
            properties: {
                [AUTHORS_AUTHOR_ID]: { type: 'string', minLength: ID_MIN_MAX_LENGTH , maxLength: ID_MIN_MAX_LENGTH},
                [AUTHORS_FIRST_NAME]: { type: 'string', minLength: NAME_MIN_LENGTH, maxLength: NAME_MAX_LENGTH },
                [AUTHORS_LAST_NAME]: { type: 'string', minLength: NAME_MIN_LENGTH, maxLength: NAME_MAX_LENGTH },
                [AUTHORS_DATE_OF_BIRTH]: { type: 'string', format: 'date' },
                [AUTHORS_DATE_OF_DEATH]: { type: 'string', format: 'date' },
            },
        };
    }
}

module.exports = Author;