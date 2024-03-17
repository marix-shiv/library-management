/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.table('book_instances', function(table) {
        table.renameColumn('IssuedToUserID', 'UserID');
    });
};

exports.down = function(knex) {
    return knex.schema.table('book_instances', function(table) {
        table.renameColumn('UserID', 'IssuedToUserID');
    });
};