/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('books', function(table) {
        table.string('BookID', 36).primary();
        table.string('Title', 256).notNullable();
        table.string('AuthorID', 36).notNullable();
        table.text('Summary').notNullable();
        table.string('ISBN', 13).notNullable();
        table.string('GenreID', 36).notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('books');
};