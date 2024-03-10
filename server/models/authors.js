/**
 * This module defines the Author model for the 'authors' table in the database.
 * The Author model extends the Objection.js Model class and defines the table name, ID column, and a JSON schema.
 * The JSON schema describes the shape of the Author objects and is used for validation before inserting or updating records.
 * The Author model is exported so it can be used in other parts of the application to perform operations on the 'authors' table.
 */

const { Model } = require('objection');

class Author extends Model {
    static get tableName() {
        return 'authors';
    }

    static get idColumn() {
        return 'AuthorID';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['FirstName', 'LastName', 'DateOfBirth'],
            properties: {
                AuthorID: { type: 'string', length: 36 },
                FirstName: { type: 'string', minLength: 1, maxLength: 256 },
                LastName: { type: 'string', minLength: 1, maxLength: 256 },
                DateOfBirth: { type: 'string', format: 'date' },
                DateOfDeath: { type: 'string', format: 'date' },
            },
        };
    }
}

module.exports = Author;