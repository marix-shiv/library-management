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