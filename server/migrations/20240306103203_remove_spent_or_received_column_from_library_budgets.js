/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.table('library_budgets', function(table) {
        table.dropColumn('SpentOrReceived');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.table('library_budgets', function(table) {
        table.string('SpentOrReceived', 1).notNullable();
    });
};