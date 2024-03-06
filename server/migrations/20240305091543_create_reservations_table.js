/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('reservations', function(table) {
        table.string('ReservationID', 36).primary();
        table.string('UserID', 36).notNullable();
        table.string('BookID', 36).notNullable();
        table.date('DateOfReservation').notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('reservations');
};