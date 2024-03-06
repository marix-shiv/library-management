/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('library_budgets', function(table) {
        table.string('BudgetID', 36).primary();
        table.date('Date').notNullable();
        table.string('SpentOrReceived', 1).notNullable();
        table.decimal('Money', 18, 2).notNullable();
        table.text('Description').notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('library_budgets');
};