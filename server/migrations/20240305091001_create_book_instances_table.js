/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('book_instances', function(table) {
        table.string('InstanceID', 36).primary();
        table.string('BookID', 36).notNullable();
        table.string('Status', 1).notNullable();
        table.date('AvailableBy');
        table.string('Imprint', 256).notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('book_instances');
};