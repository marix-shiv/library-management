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
                UserID: { type: 'string', length: 36 },
                Username: { type: 'string', minLength: 5, maxLength: 16 },
                Password: { type: 'string', minLength: 8, maxLength: 64 },
                Salt: { type: 'string', minLength: 1, maxLength: 256 }, // Added Salt column
                Role: { type: 'string', length: 1 },
                first_name: { type: 'string', minLength: 1, maxLength: 256 },
                last_name: { type: 'string', minLength: 1, maxLength: 256 },
                date_of_birth: { type: 'string', format: 'date' },
                Status: { type: 'boolean' },
            },
        };
    }
}

module.exports = User;