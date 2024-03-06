/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('authors', function(table) {
        table.string('AuthorID', 36).primary();
        table.string('FirstName', 256).notNullable();
        table.string('LastName', 256).notNullable();
        table.date('DateOfBirth').notNullable();
        table.date('DateOfDeath');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('authors');
};