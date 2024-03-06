/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.table('reservations', function(table) {
        table.dropColumn('BookID');
        table.string('InstanceID', 36).notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.table('reservations', function(table) {
        table.dropColumn('InstanceID');
        table.string('BookID', 36).notNullable();
    });
};