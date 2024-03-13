/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('books_genres', function(table) {
        table.string('BookID', 36).notNullable();
        table.string('GenreID', 36).notNullable();
        table.primary(['BookID', 'GenreID']);
        table.foreign('BookID').references('books.BookID').onDelete('CASCADE');
        table.foreign('GenreID').references('genres.GenreID').onDelete('CASCADE');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('books_genres');
};
