/**
 * This module defines the BookInstance model for the 'book_instances' table in the database.
 * The BookInstance model extends the Objection.js Model class and defines the table name, ID column, and a JSON schema.
 * The JSON schema describes the shape of the BookInstance objects and is used for validation before inserting or updating records.
 * The BookInstance model is exported so it can be used in other parts of the application to perform operations on the 'book_instances' table.
 */

const { Model } = require('objection');

class BookInstance extends Model {
    static get tableName() {
        return 'book_instances';
    }

    static get idColumn() {
        return 'InstanceID';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['BookID', 'Status', 'Imprint'],
            properties: {
                InstanceID: { type: 'string', length: 36 },
                BookID: { type: 'string', length: 36 },
                Status: { type: 'string', length: 1 },
                AvailableBy: { type: 'string', format: 'date' },
                Imprint: { type: 'string', minLength: 1, maxLength: 256 },
                IssuedToUserID: { type: ['string', 'null'], length: 36 }, // Add this line
            },
        };
    }
}

module.exports = BookInstance;