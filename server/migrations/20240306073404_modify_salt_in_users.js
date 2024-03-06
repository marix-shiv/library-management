exports.up = function(knex) {
    return knex.schema.alterTable('users', function(table) {
        table.string('Salt', 256).notNullable().alter();
    });
};

exports.down = function(knex) {
    return knex.schema.alterTable('users', function(table) {
        table.string('Salt', 256).nullable().alter();
    });
};