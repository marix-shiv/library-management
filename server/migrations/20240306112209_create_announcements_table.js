/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('announcements', function(table) {
        table.string('AnnouncementID', 36).primary();
        table.string('Title', 256).notNullable();
        table.string('Content', 10000).notNullable();
        table.date('DatePosted').notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('announcements');
};