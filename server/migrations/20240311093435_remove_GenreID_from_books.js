/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.table('books', function(table) {
        table.dropColumn('GenreID');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.table('books', function(table) {
        table.string('GenreID', 36).notNullable().references('genres.GenreID').onDelete('CASCADE');
    });
};
