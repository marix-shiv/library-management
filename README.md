# Library Management System

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

## Installation Instructions

1. Clone the repository to your local machine using `https://github.com/PriyanshDimri/library-management.git`.
2. Navigate to the project directory using `cd library-management`.

### Server Setup

1. Install MySQL on your machine if you haven't already. You can download it from [here](https://dev.mysql.com/downloads/).
2. Set up a MySQL database for the project and note down the connection details.
3. Create a `.env` file in the `server` directory with the following environment variables:

    ```properties
    DB_NAME=<your_database_name>
    DB_USER=<your_database_user>
    DB_PASSWORD=<your_database_password>
    DB_HOST=<your_database_host>
    JWT_SECRET=<your_jwt_secret>
    ```

    Replace `<your_database_name>`, `<your_database_user>`, `<your_database_password>`, `<your_database_host>`, and `<your_jwt_secret>` with your actual database name, user, password, host, and JWT secret.

    For the `JWT_SECRET`, use a long, complex, and unique string. You can generate a 64-byte string (which will be 128 characters long in hexadecimal) using `require('crypto').randomBytes(64).toString('hex')` in a Node.js environment. Alternatively, you can use an online tool such as [128 Digit Hex Codes Generator](https://numbergenerator.org/random-128-digit-hex-codes-generator) to generate a random string.

4. Install the server dependencies using `cd server` and then `npm install`.
5. Run the database migrations using `npx knex migrate:latest`.
6. Seed the database using `npx knex seed:run`.

### Client Setup

7. Navigate to the client directory using `cd client` from the root directory.
8. Install the client dependencies using `npm install`.

### Running the Application

9. Navigate back to the `server` directory using `cd ../server`.
10. Start the application using `npm run dev`.

The application should now be running on `localhost:3000`.

## User Guide

This application provides a user-friendly interface for managing a library system. Here's a brief overview of how to use it:

1. **Home Page**: When you first open the application, you'll be taken to the home page.

2. **Registration and Login**: If you don't have an account, you can create one by clicking on the 'Register' button. If you already have an account, you can log in by clicking on the 'Login' button.

> :exclamation: **IMPORTANT:** New accounts need to be verified by a super admin before they can be used. For testing purposes, you can use one of the pre-made super admin accounts created by `npx knex seed:run` to verify your account. Remember to delete these pre-made accounts in a production environment to secure your application.

3. **Accessing Functions**: Click on the gear icon at the bottom left of the page to open the sidebar. This sidebar contains links to all the functions of the application.

Different types of users have different permissions. Regular users can view books and make reservations, librarians can manage books and reservations, admins can manage library policies, budgets and announcements, and super admin can perform every other action along with managing user accounts.

For more detailed instructions on how to use each feature, please refer to the [User Manual](/docs/UserManual.md).

## License

This project is licensed under the terms of the MIT license. See the [LICENSE](LICENSE) file for details.

## References

- IEEE Standard for Software Requirements Specifications, IEEE Std 830-1998
- User Interface Style Guide, Version 2.0, ABC Corp, 2023

## Software Requirements Specification (SRS)

For more detailed information about the requirements and design of the Library Management System, please refer to the [Software Requirements Specification (SRS)](docs/Software_Requirement_Specification.pdf) document.