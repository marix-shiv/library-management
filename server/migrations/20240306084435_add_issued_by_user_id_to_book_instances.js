/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.table('book_instances', function(table) {
        table.string('IssuedToUserID', 36);
    });
};

exports.down = function(knex) {
    return knex.schema.table('book_instances', function(table) {
        table.dropColumn('IssuedToUserID');
    });
};