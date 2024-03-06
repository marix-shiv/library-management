exports.up = function(knex) {
    return knex.schema.table('users', function(table) {
        table.string('Salt', 256);
    });
};

exports.down = function(knex) {
    return knex.schema.table('users', function(table) {
        table.dropColumn('Salt');
    });
};