# Library Management System

## Project Status: In Development

This project is currently in the early stages of development. More details, including installation instructions and usage examples, will be added to this README as the project progresses.

## :warning: Note on Contributions

This is a group project, and currently, we are not accepting contributions from outside the group. Thank you for your understanding.

## Description

The Library Management System is a web-based system designed to streamline virtually all operations in a library. It provides an efficient and user-friendly interface for utilizing library resources and services online.

## Features

- Account Registration, User Authentication, Manage Account Details
- Check Books in Library, Reserve Books, Renew Books
- Issue Books (Librarian), Manage Book Instances (Librarian)
- Set Library Policies (Admin), Manage Library Budget (Admin)

## User Classes

- System User
- Librarian
- Library Administrators
- Super Admin

## Operating Environment

The system will operate on standard commercial hardware platforms, running any modern operating system such as Windows, macOS, or Linux. All services will be cloud-based, including the database.

## Design and Implementation Constraints

The Library Management System must adhere to all applicable guidelines and requirements as set by our course instructor and college. 

## Assumptions and Dependencies

It is assumed that the Library Management System will have a fast internet connection for executing functions properly and securely. The system will be using the free tier of Heroku and MySQL, ExpressJS, ReactJS and NodeJS.

## Installation Instructions

1. Clone the repository to your local machine using `https://github.com/PriyanshDimri/library-management.git`.
2. Navigate to the project directory using `cd library-management`.
3. Install MySQL on your machine if you haven't already. You can download it from [here](https://dev.mysql.com/downloads/).
4. Set up a MySQL database for the project and note down the connection details.
5. Create a `.env` file in the `server` directory with the following environment variables:

    ```properties
    DB_NAME=<your_database_name>
    DB_USER=<your_database_user>
    DB_PASSWORD=<your_database_password>
    DB_HOST=<your_database_host>
    JWT_SECRET=<your_jwt_secret>
    ```

    Replace `<your_database_name>`, `<your_database_user>`, `<your_database_password>`, `<your_database_host>`, and `<your_jwt_secret>` with your actual database name, user, password, host, and JWT secret.

    For the `JWT_SECRET`, use a long, complex, and unique string. You can generate one using a password generator or by running `require('crypto').randomBytes(64).toString('hex')` in a Node.js environment.

6. Install the server dependencies using `cd server` and then `npm install`.
7. Run the database migrations using `npx knex migrate:latest`.
8. Seed the database using `npx knex seed:run`.
9. Start the server using `npm start`.

Note: The client side has not been implemented yet. Instructions for setting up the client side will be added once it's implemented.

## User Guide

Since the client side has not been implemented yet, there's no user interface to interact with the system. However, you can interact with the server using an API client like Postman.

Here are the available endpoints:

- `/api/authors`: GET, POST, PUT, DELETE methods for managing authors.
- `/api/bookInstances`: GET, POST, PUT, DELETE methods for managing book instances.
- `/api/books`: GET, POST, PUT, DELETE methods for managing books.
- `/api/libraryPolicies`: GET, POST, PUT, DELETE methods for managing library policies.
- `/api/reservations`: GET, POST, PUT, DELETE methods for managing reservations.

Each endpoint requires specific parameters and returns specific data. More detailed information about each endpoint will be added as the project progresses.

## License

This project is licensed under the terms of the MIT license. See the [LICENSE](LICENSE) file for details.

## References

- IEEE Standard for Software Requirements Specifications, IEEE Std 830-1998
- User Interface Style Guide, Version 2.0, ABC Corp, 2023

## User Documentation

The Library Management System will come with a comprehensive set of documentations for each user class along with this general README file. All documentations will be available in Markdown format.

## Software Requirements Specification (SRS)

For more detailed information about the requirements and design of the Library Management System, please refer to the [Software Requirements Specification (SRS)](docs/Software_Requirement_Specification.pdf) document.