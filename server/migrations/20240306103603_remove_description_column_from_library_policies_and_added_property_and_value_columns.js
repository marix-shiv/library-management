/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.table('library_policies', function(table) {
        table.dropColumn('Description');
        table.string('Property', 256).notNullable();
        table.string('Value', 256).notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.table('library_policies', function(table) {
        table.dropColumn('Property');
        table.dropColumn('Value');
        table.text('Description').notNullable();
    });
};