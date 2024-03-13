/**
 * This module defines the BooksGenres model for the 'books_genres' table in the database.
 * The BooksGenres model extends the Objection.js Model class and defines the table name, ID columns, a JSON schema, and relation mappings.
 * The JSON schema describes the shape of the BooksGenres objects and is used for validation before inserting or updating records.
 * The relation mappings define the relationship between the BooksGenres model and other models.
 * The BooksGenres model is exported so it can be used in other parts of the application to perform operations on the 'books_genres' table.
 */

const { Model } = require('objection');
const { BOOKS_GENRES_TABLE, BOOKS_TABLE, GENRES_TABLE } = require('../constants/tableNames');
const { BOOKS_BOOK_ID, GENRES_GENRE_ID, BOOKS_GENRES_BOOK_ID, BOOKS_GENRES_GENRE_ID } = require('../constants/fieldNames');
const { ID_MIN_MAX_LENGTH } = require('../constants/validationConstants');

class BooksGenres extends Model {
    static get tableName() {
        return BOOKS_GENRES_TABLE;
    }

    static get idColumn() {
        return [BOOKS_GENRES_BOOK_ID, BOOKS_GENRES_GENRE_ID]; // Assuming composite primary key
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: [BOOKS_GENRES_BOOK_ID, BOOKS_GENRES_GENRE_ID],
            properties: {
                [BOOKS_GENRES_BOOK_ID]: { type: 'string', minLength: ID_MIN_MAX_LENGTH, maxLength: ID_MIN_MAX_LENGTH },
                [BOOKS_GENRES_GENRE_ID]: { type: 'string', minLength: ID_MIN_MAX_LENGTH, maxLength: ID_MIN_MAX_LENGTH },
            },
        };
    }

    static get relationMappings() {
        const Book = require('./books'); // Assuming the Book model is in the same directory
        const Genre = require('./genres'); // Assuming the Genre model is in the same directory

        return {
            book: {
                relation: Model.BelongsToOneRelation,
                modelClass: Book,
                join: {
                    from: `${BOOKS_GENRES_TABLE}.${BOOKS_GENRES_BOOK_ID}`,
                    to: `${BOOKS_TABLE}.${BOOKS_BOOK_ID}`
                }
            },
            genre: {
                relation: Model.BelongsToOneRelation,
                modelClass: Genre,
                join: {
                    from: `${BOOKS_GENRES_TABLE}.${BOOKS_GENRES_GENRE_ID}`,
                    to: `${GENRES_TABLE}.${GENRES_GENRE_ID}`
                }
            }
        };
    }
}

module.exports = BooksGenres;
