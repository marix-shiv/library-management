# :books: Library Management System

## :page_facing_up: Description

The Library Management System is a web-based system designed to streamline virtually all operations in a library. It provides an efficient and user-friendly interface for utilizing library resources and services online.

## :star2: Features

- :bust_in_silhouette: Account Registration, User Authentication, Manage Account Details
- :books: Check Books in Library, Reserve Books, Renew Books
- :outbox_tray: Issue Books (Librarian), Manage Book Instances (Librarian)
- :gear: Set Library Policies (Admin), Manage Library Budget (Admin)

## :people_holding_hands: User Classes 

- System User
- Librarian
- Library Administrators
- Super Admin

## :wrench: Installation Instructions

### Development Setup

1. Clone the repository to your local machine using `https://github.com/marix-shiv/library-management.git`.
2. Navigate to the project directory using `cd library-management`.

#### Server Setup

1. Install MySQL on your machine if you haven't already. You can download it from [here](https://dev.mysql.com/downloads/).
2. Set up a MySQL database for the project and note down the connection details.
3. Create a `.env` file in the `server` directory with the following environment variables:

    ```properties
    DB_NAME=<your_database_name>
    DB_USER=<your_database_user>
    DB_PASSWORD=<your_database_password>
    DB_HOST=<your_database_host>
    JWT_SECRET=<your_jwt_secret>
    WEBSITE_ORIGIN=http://localhost:3000
    ```

    Replace `<your_database_name>`, `<your_database_user>`, `<your_database_password>`, `<your_database_host>`, and `<your_jwt_secret>` with your actual database name, user, password, host, and JWT secret.

    For the `JWT_SECRET`, use a long, complex, and unique string. You can generate a 64-byte string (which will be 128 characters long in hexadecimal) using `require('crypto').randomBytes(64).toString('hex')` in a Node.js environment. Alternatively, you can use an online tool such as [128 Digit Hex Codes Generator](https://numbergenerator.org/random-128-digit-hex-codes-generator) to generate a random string.

4. Install the server dependencies using `cd server` and then `npm install`.
5. Run the database migrations using `npx knex migrate:latest`.
6. Seed the database using `npx knex seed:run`.

#### Client Setup

7. Navigate to the client directory using `cd client` from the root directory.
8. Install the client dependencies using `npm install`.
9. Create a `.env` file in the `client` directory with the following environment variable:

    ```properties
    PORT=3000
    ```

#### Running the Application

10. Navigate back to the `server` directory using `cd ../server`.
11. Start the application using `npm run dev`.

The application should now be running on `localhost:3000`.

### Production Setup

1. Clone the repository to your production server using `https://github.com/marix-shiv/library-management.git`.
2. Navigate to the project directory using `cd library-management`.

#### Server Setup

1. Set up a MySQL database for the project and note down the connection details.
2. Create a `.env` file in the `server` directory with the following environment variables:

    ```properties
    DB_NAME=<your_database_name>
    DB_USER=<your_database_user>
    DB_PASSWORD=<your_database_password>
    DB_HOST=<your_database_host>
    JWT_SECRET=<your_jwt_secret>
    WEBSITE_ORIGIN=<your_client_side_website_link>
    ```

    Replace `<your_database_name>`, `<your_database_user>`, `<your_database_password>`, `<your_database_host>`, `<your_jwt_secret>` and `<your_client_side_website_link>` with your actual database name, user, password, host, JWT secret, and client-side website link.

    > Note: Depending on your MySQL hosting service, you may need to configure additional environment variables or set up SSL certificates and may further alter the [knexfile](./server/knexfile.js).

3. Install the server dependencies using `cd server` and then `npm install`.
4. Run the database migrations using `npx knex migrate:latest`.
5. Seed the database using `npx knex seed:run`.

#### Client Setup

6. Navigate to the client directory using `cd client` from the root directory.
7. Install the client dependencies using `npm install`.
8. Create a `.env` file in the `client` directory with the following environment variable:

    ```properties
    REACT_APP_BACKEND_URL=<your_server_side_website_link>
    ```

    Replace `<your_server_side_website_link>` with sever-side website link.

8. Build the client for production using `npm run build`.

#### Running the Application

9. Navigate back to the `server` directory using `cd ../server`.
10. Start the application using `npm start`.

The application should now be running on your production server.

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

## Software Requirements Specification (SRS)

For more detailed information about the requirements and design of the Library Management System, please refer to the [Software Requirements Specification (SRS)](docs/Software_Requirement_Specification.pdf) document.
