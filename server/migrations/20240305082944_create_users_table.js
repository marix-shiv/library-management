/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('users', function(table) {
        table.string('UserID', 36).primary();
        table.string('Username', 16).notNullable().unique();
        table.string('Password', 256).notNullable();
        table.string('Role', 1).notNullable();
        table.string('first_name', 256).notNullable();
        table.string('last_name', 256).notNullable();
        table.date('date_of_birth').notNullable();
        table.boolean('Status').notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('users');
};