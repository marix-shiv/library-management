# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added
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
- Created new `utils` directory.

<!-- 
NOTE: The following lines are the reference/example/format for the logs which will be added to this file:

## [Unreleased]

### Added
- New features that have been added since the last release.

### Changed
- Changes to existing functionality.

### Deprecated
- Features that are planned to be removed in a future release.

### Removed
- Features that have been removed.

### Fixed
- Any bugs that have been fixed.

### Security
- Any security improvements.

## [0.1.0] - 2022-01-01

### Added
- Initial release of the project. -->
