# Changelog

All notable changes to this project will be documented in this file.

## [1.2.1]

### Added
- Created migrations folder and files for setting up the tables in the MySQL database.
- Created seeds directory and files for seeding the database with initial data.
- Created models for each of the tables in the database using Objection.js.

### Changed
- Made updates to the `DataDict.csv` file to reflect changes in the database schema.

## [1.2.0] - 2024-04-05
### Changed
- Switched from TypeORM and MySQL npm packages to Objection.js, Knex.js, and MariaDB npm package for database operations. This change was made to resolve issues with the previous setup and to take advantage of the features provided by Objection.js and Knex.js. The MariaDB npm package is used as a MySQL client to connect to the MySQL database.

## [1.1.1] - 2022-04-05
### Added
- Project timeline and task breakdown.

## [1.1.0] - 2022-04-04
### Added
- Software Design Document (SDD) for the Library Management System.

## [1.0.0] - 2022-04-01
### Added
- Initial project setup and basic functionality.
- Software Requirements Specification (SRS) for the Library Management System.
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
