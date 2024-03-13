/**
 * This module exports an object that maps constant names to table names in the database.
 * The object can be imported in other modules to use the table names, ensuring consistency and reducing the risk of typos.
 * If a table name changes, it only needs to be updated in this module.
 */

module.exports = {
    ANNOUNCEMENTS_TABLE: 'announcements',
    AUTHORS_TABLE: 'authors',
    BOOK_INSTANCES_TABLE: 'book_instances',
    BOOKS_TABLE: 'books',
    BOOKS_GENRES_TABLE: 'books_genres',
    GENRES_TABLE: 'genres',
    LIBRARY_BUDGETS_TABLE: 'library_budgets',
    LIBRARY_POLICIES_TABLE: 'library_policies',
    RESERVATIONS_TABLE: 'reservations',
    USERS_TABLE: 'users'
};