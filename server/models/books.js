/**
 * This module defines the Book model for the 'books' table in the database.
 * The Book model extends the Objection.js Model class and defines the table name, ID column, a JSON schema, and relation mappings.
 * The JSON schema describes the shape of the Book objects and is used for validation before inserting or updating records.
 * The relation mappings define the relationship between the Book model and the Author model.
 * The Book model is exported so it can be used in other parts of the application to perform operations on the 'books' table.
 */

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