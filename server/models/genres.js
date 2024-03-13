/**
 * This module defines the Genre model for the 'genres' table in the database.
 * The Genre model extends the Objection.js Model class and defines the table name, ID column, and a JSON schema.
 * The JSON schema describes the shape of the Genre objects and is used for validation before inserting or updating records.
 * The Genre model is exported so it can be used in other parts of the application to perform operations on the 'genres' table.
 */

const { Model } = require('objection');
const { GENRES_TABLE } = require('../constants/tableNames');
const { GENRES_GENRE_ID, GENRES_NAME } = require('../constants/fieldNames');
const { ID_MIN_MAX_LENGTH, NAME_MIN_LENGTH, NAME_MAX_LENGTH } = require('../constants/validationConstants');

class Genre extends Model {
    static get tableName() {
        return GENRES_TABLE;
    }

    static get idColumn() {
        return GENRES_GENRE_ID;
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: [GENRES_NAME],
            properties: {
                [GENRES_GENRE_ID]: { type: 'string', minLength: ID_MIN_MAX_LENGTH, maxLength: ID_MIN_MAX_LENGTH },
                [GENRES_NAME]: { type: 'string', minLength: NAME_MIN_LENGTH, maxLength: NAME_MAX_LENGTH },
            },
        };
    }
}

module.exports = Genre;