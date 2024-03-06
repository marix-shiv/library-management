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