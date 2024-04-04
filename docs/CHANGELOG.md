# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added

- Completed Sidebar with all necessary functions.
- Added Policy related pages.
- Implemented new admin features and updated files for role-based restrictions.
- Added issued book renewal button and display fine on book return.
- Added reservation search page.
- Added reservations pages.
- Added pages to display top of the category.
- Implemented delete and update operations.
- Added profile display and editing pages and all announcements page.
- Added pages to list all books, genres, authors, and book instances.
- Added basic dashboard and basic functions.
- Added test files for /login and /signup.
- Added login page functionality.
- Added Signup page functionality.
- Added Error Page.
- Restructured project and added Home page with corresponding components, tests, and styles.
- Integrated Swagger for API documentation. This includes the installation of necessary packages and setup of Swagger UI for interactive API exploration.
- Added a note in the `tests` directory indicating plans to return to writing tests at a later stage.
- Added new `constants/daysOfWeek.js` and `constants/policyConstants.js` files.
- Added new `middlewares/maintenanceDaysIfRequired.js` and `middlewares/policiesValueValidator.js` files.
- Added new `migrations/20240314063353_add_core_field_in_library_policies_table.js`, `migrations/20240314091417_add_ValueIsInt_column_in_library_policies_table.js`, `migrations/20240316063311_remove_instance_id_field_and_add_book_id_in_reservations_table.js`, and `migrations/20240316073201_update_issued_to_user_id_column_name_to_user_id_in_book_instances_table.js` files.
- Added new `utils/updateBookInstance.js` file.
- Added new `validators/statusValidator.js`, `validators/validateBoolean.js`, `validators/validateDays.js`, `validators/validateISBN.js`, `validators/validatePolicyValueFromBody.js`, `validators/validateStatus.js`, and `validators/validateUUID.js` files.
- Added new `constants/paginationConstants.js` and `constants/tableNames.js` files.
- Added new `migrations/20240311092617_create_books_genres_table.js` and `migrations/20240311093435_remove_GenreID_from_books.js` files.
- Added new `models/booksGenres.js` file.
- Added new `seeds/10_books_genres_seed.js` file.
- Added new `utils/allowedFields.js` and `utils/incrementDate.js` files.
- Added new `validators/descriptionValidator.js`, `validators/moneyValidator.js`, `validators/queryValidator.js`, `validators/validateDateRange.js`, `validators/validateMoneyRange.js`, and `validators/validatePage.js` files.
- Initial project setup and basic functionality.
- Software Requirements Specification (SRS) for the Library Management System.
- Software Design Document (SDD) for the Library Management System.
- Project timeline and task breakdown.
- Switched from TypeORM and MySQL npm packages to Objection.js, Knex.js, and MariaDB npm package for database operations.
- Created migrations folder and files for setting up the tables in the MySQL database.
- Created seeds directory and files for seeding the database with initial data.
- Created models for each of the tables in the database using Objection.js.
- Created new `constants` directory for storing constant values.
- Created new `middlewares` directory for storing middleware functions.
- Created new `validators` directory for storing validation functions.
- Added new routes for `announcements`, `authors`, `bookInstances`, `books`, `genres`, `libraryBudgets`, `libraryPolicies`, `reservations`, and `users`.
- Added new `server/auth/` directory for authentication-related code.

### Changed

- Improved user authentication and authorization.
- Refactor server structure and update models.
- Refactor controllers and models for better error handling and validation.
- Updated `package.json` and `package-lock.json` to include Swagger-related dependencies.
- Modified `docs/DataDict.csv`.
- Modified `server/app.js`.
- Modified `server/constants/errorMessages.js`, `server/constants/fieldNames.js`, and `server/constants/validationConstants.js`.
- Updated controller logic in `server/controllers/authorsController.js`, `server/controllers/bookInstancesController.js`, `server/controllers/booksController.js`, `server/controllers/libraryPoliciesController.js`, and `server/controllers/reservationsController.js`.
- Enhanced middleware in `server/middlewares/authorize.js` and `server/middlewares/bodyValidator.js`.
- Modified models in `server/models/bookinstance.js`, `server/models/books.js`, `server/models/librarypolicies.js`, and `server/models/reservations.js`.
- Updated routes in `server/routes/bookInstances.js`, `server/routes/books.js`, `server/routes/libraryPolicies.js`, `server/routes/reservations.js`, and `server/routes/users.js`.
- Modified seeds in `server/seeds/05_book_instances_seed.js`, `server/seeds/06_reservations_seed.js`, and `server/seeds/07_library_policies_seed.js`.
- Refactored models to use constants.
- Made updates to the `DataDict.csv` file to reflect changes in the database schema.
- Modified `DataDict.csv`.
- Modified `app.js`.
- Modified `users.js` model.
- Updated `package.json` and `package-lock.json`.
- Refactored error messages in `server/constants/errorMessages.js`.
- Updated user controller logic in `server/controllers/usersController.js`.
- Enhanced authorization middleware in `server/middlewares/authorize.js`.
- Modified password verification utility in `server/utils/verifyPassword.js`.
- Adjusted password validation in `server/validators/validatePassword.js`.

### Removed

- Deleted `index.js` from `routes` directory.

### Other

- Added more comments in various files.
- Added Top Level comments in various files.
- Minor Syntactical Error Resolved in DataDict.csv.
- Minor Changes in SDD.
- Updated SRS link in README from .md to .pdf.
- Resolved merge conflict in README.
- Created new `utils` directory.