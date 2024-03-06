const { Model } = require('objection');

class Book extends Model {
    static get tableName() {
        return 'books';
    }

    static get idColumn() {
        return 'BookID';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['Title', 'AuthorID', 'Summary', 'ISBN', 'GenreID'],
            properties: {
                BookID: { type: 'string', length: 36 },
                Title: { type: 'string', minLength: 1, maxLength: 256 },
                AuthorID: { type: 'string', length: 36 },
                Summary: { type: 'string', minLength: 1, maxLength: 10000 },
                ISBN: { type: 'string', length: 13 },
                GenreID: { type: 'string', length: 36 },
            },
        };
    }

    static get relationMappings() {
        const Author = require('./Author'); // assuming the Author model is in the same directory

        return {
            author: {
                relation: Model.BelongsToOneRelation,
                modelClass: Author,
                join: {
                    from: 'books.AuthorID',
                    to: 'authors.AuthorID'
                }
            }
        };
    }
}

module.exports = Book;