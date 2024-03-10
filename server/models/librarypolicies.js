/**
 * This module defines the LibraryPolicy model for the 'library_policies' table in the database.
 * The LibraryPolicy model extends the Objection.js Model class and defines the table name, ID column, and a JSON schema.
 * The JSON schema describes the shape of the LibraryPolicy objects and is used for validation before inserting or updating records.
 * The LibraryPolicy model is exported so it can be used in other parts of the application to perform operations on the 'library_policies' table.
 */

const { Model } = require('objection');

class LibraryPolicy extends Model {
    static get tableName() {
        return 'library_policies';
    }

    static get idColumn() {
        return 'PolicyID';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['Property', 'Value'],
            properties: {
                PolicyID: { type: 'string', length: 36 },
                Property: { type: 'string', minLength: 1, maxLength: 256 },
                Value: { type: 'string', minLength: 1, maxLength: 256 },
            },
        };
    }
}

module.exports = LibraryPolicy;