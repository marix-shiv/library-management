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