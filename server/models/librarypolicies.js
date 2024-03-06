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