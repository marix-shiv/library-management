/**
 * This module defines the User model for the 'users' table in the database.
 * The User model extends the Objection.js Model class and defines the table name, ID column, and a JSON schema.
 * The JSON schema describes the shape of the User objects and is used for validation before inserting or updating records.
 * The User model is exported so it can be used in other parts of the application to perform operations on the 'users' table.
 */

const { Model } = require('objection');

class User extends Model {
    static get tableName() {
        return 'users';
    }

    static get idColumn() {
        return 'UserID';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['Username', 'Password', 'Role', 'first_name', 'last_name', 'date_of_birth', 'Status', 'Salt'],
            properties: {
                UserID: { type: 'string', minLength: 36, maxLength: 36 },
                Username: { type: 'string', minLength: 5, maxLength: 255 },
                Password: { type: 'string', minLength: 8, maxLength: 255 },
                Salt: { type: 'string', minLength: 1, maxLength: 256 }, // Added Salt column
                Role: { type: 'string', minLength: 1, maxLength: 1 },
                first_name: { type: 'string', minLength: 1, maxLength: 256 },
                last_name: { type: 'string', minLength: 1, maxLength: 256 },
                date_of_birth: { type: 'string', format: 'date' },
                Status: { type: 'boolean' },
            },
        };
    }
}

module.exports = User;