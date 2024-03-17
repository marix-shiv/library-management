/**
 * This module defines the Book model for the 'books' table in the database.
 * The Book model extends the Objection.js Model class and defines the table name, ID column, a JSON schema, and relation mappings.
 * The JSON schema describes the shape of the Book objects and is used for validation before inserting or updating records.
 * The relation mappings define the relationship between the Book model and the Author model.
 * The Book model is exported so it can be used in other parts of the application to perform operations on the 'books' table.
 */

const { Model } = require('objection');
const { BOOKS_TABLE, AUTHORS_TABLE } = require('../constants/tableNames');
const { BOOKS_BOOK_ID, BOOKS_AUTHOR_ID, BOOKS_GENRE_ID, BOOKS_ISBN, BOOKS_SUMMARY, BOOKS_TITLE, AUTHORS_AUTHOR_ID } = require('../constants/fieldNames');
const { ID_MIN_MAX_LENGTH, NAME_MIN_LENGTH, NAME_MAX_LENGTH, DESC_MIN, DESC_MAX, ISBN_MIN_MAX_LENGTH } = require('../constants/validationConstants');

class Book extends Model {
    static get tableName() {
        return BOOKS_TABLE;
    }

    static get idColumn() {
        return BOOKS_BOOK_ID;
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: [BOOKS_TITLE, BOOKS_AUTHOR_ID, BOOKS_SUMMARY, BOOKS_ISBN],
            properties: {
                [BOOKS_BOOK_ID]: { type: 'string', minLength: ID_MIN_MAX_LENGTH, maxLength: ID_MIN_MAX_LENGTH },
                [BOOKS_TITLE]: { type: 'string', minLength: NAME_MIN_LENGTH, maxLength: NAME_MAX_LENGTH },
                [BOOKS_AUTHOR_ID]: { type: 'string', minLength: ID_MIN_MAX_LENGTH, maxLength: ID_MIN_MAX_LENGTH },
                [BOOKS_SUMMARY]: { type: 'string', minLength: DESC_MIN, maxLength: DESC_MAX },
                [BOOKS_ISBN]: { type: 'string', minLength: ISBN_MIN_MAX_LENGTH, maxLength: ISBN_MIN_MAX_LENGTH },
            },
        };
    }

    static get relationMappings() {
        const Author = require('./authors');

        return {
            author: {
                relation: Model.BelongsToOneRelation,
                modelClass: Author,
                join: {
                    from: `${BOOKS_TABLE}.${BOOKS_AUTHOR_ID}`,
                    to: `${AUTHORS_TABLE}.${AUTHORS_AUTHOR_ID}`
                }
            }
        };
    }
}

module.exports = Book;