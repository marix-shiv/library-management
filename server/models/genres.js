/**
 * This module defines the Genre model for the 'genres' table in the database.
 * The Genre model extends the Objection.js Model class and defines the table name, ID column, and a JSON schema.
 * The JSON schema describes the shape of the Genre objects and is used for validation before inserting or updating records.
 * The Genre model is exported so it can be used in other parts of the application to perform operations on the 'genres' table.
 */

const { Model } = require('objection');

class Genre extends Model {
    static get tableName() {
        return 'genres';
    }

    static get idColumn() {
        return 'GenreID';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['Name'],
            properties: {
                GenreID: { type: 'string', length: 36 },
                Name: { type: 'string', minLength: 1, maxLength: 256 },
            },
        };
    }
}

module.exports = Genre;