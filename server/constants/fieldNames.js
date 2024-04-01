/**
 * This module exports an object that contains the field names for various models in the application.
 * These field names correspond to the column names in the database tables.
 * They are used throughout the application to ensure consistency when referring to these fields.
 */

module.exports = {

    USERS_USER_ID: 'UserID',
    USERS_USERNAME: 'Username',
    USERS_PASSWORD: 'Password',
    USERS_SALT: 'Salt',
    USERS_ROLE: 'Role',
    USERS_FIRST_NAME: 'first_name',
    USERS_LAST_NAME: 'last_name',
    USERS_DATE_OF_BIRTH: 'date_of_birth',
    USERS_STATUS: 'UStatus',

    BOOKS_BOOK_ID: 'BookID',
    BOOKS_TITLE: 'Title',
    BOOKS_AUTHOR_ID: 'AuthorID',
    BOOKS_SUMMARY: 'Summary',
    BOOKS_ISBN: 'ISBN',
    BOOKS_GENRE_ID: 'GenreID',

    AUTHORS_AUTHOR_ID: 'AuthorID',
    AUTHORS_FIRST_NAME: 'FirstName',
    AUTHORS_LAST_NAME: 'LastName',
    AUTHORS_DATE_OF_BIRTH: 'DateOfBirth',
    AUTHORS_DATE_OF_DEATH: 'DateOfDeath',

    GENRES_GENRE_ID: 'GenreID',
    GENRES_NAME: 'Name',

    BOOK_INSTANCE_INSTANCE_ID: 'InstanceID',
    BOOK_INSTANCE_STATUS: 'Status',
    BOOK_INSTANCE_AVAILABLE_BY: 'AvailableBy',
    BOOK_INSTANCE_IMPRINT: 'Imprint',
    BOOK_INSTANCE_BOOK_ID: 'BookID',
    BOOK_INSTANCE_USER_ID: 'UserID',
    BOOK_INSTANCE_RENEWALS: 'Renewals',

    LIBRARY_BUDGET_BUDGET_ID: 'BudgetID',
    LIBRARY_BUDGET_DATE: 'Date',
    LIBRARY_BUDGET_MONEY: 'Money',
    LIBRARY_BUDGET_DESCRIPTION: 'Description',

    LIBRARY_POLICIES_POLICY_ID: 'PolicyID',
    LIBRARY_POLICIES_PROPERTY: 'Property',
    LIBRARY_POLICIES_VALUE: 'Value',
    LIBRARY_POLICIES_CORE: 'Core',
    LIBRARY_POLICIES_VALUE_IS_INT: 'ValueIsInt',

    RESERVATIONS_RESERVATION_ID: 'ReservationID',
    RESERVATIONS_USER_ID: 'UserID',
    RESERVATIONS_BOOK_ID: 'BookID',
    RESERVATIONS_DATE_OF_RESERVATION: 'DateOfReservation',

    ANNOUNCEMENTS_ANNOUNCEMENT_ID: 'AnnouncementID',
    ANNOUNCEMENTS_TITLE: 'Title',
    ANNOUNCEMENTS_CONTENT: 'Content',
    ANNOUNCEMENTS_DATE_POSTED: 'DatePosted',

    BOOKS_GENRES_GENRE_ID: "GenreID",
    BOOKS_GENRES_BOOK_ID: "BookID"
};