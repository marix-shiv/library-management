# Library Management System

## Project Status: In Development

This project is currently in the early stages of development. More details, including installation instructions and usage examples, will be added to this README as the project progresses.

## :warning: Note on Contributions

This is a group project, and currently, we are not accepting contributions from outside the group. Thank you for your understanding.

# Table of Contents
1. [Overview](#overview)
2. [Features](#features)
3. [User Classes](#user-classes)
4. [Operating Environment](#operating-environment)
5. [Design and Implementation Constraints](#design-and-implementation-constraints)
6. [User Documentation](#user-documentation)
7. [Assumptions and Dependencies](#assumptions-and-dependencies)
8. [References](#references)
9. [External Interface Requirements](#external-interface-requirements) 
    - [3.1 User Interfaces](#31-user-interfaces)
    - [3.2 Hardware Interfaces](#32-hardware-interfaces)
    - [3.3 Software Interfaces](#33-software-interfaces)
    - [3.4 Communications Interfaces](#34-communications-interfaces)
10. [System Features](#system-features)
    - [4.1 Account Creation (Registration)](#41-account-creation-registration)
    - [4.2 Checking Registration Status](#42-checking-registration-status)
    - [4.3 Login](#43-login)
    - [4.4 Change Credentials](#44-change-credentials)
    - [4.5 Check Books in Library](#45-check-books-in-library)
    - [4.6 Renew Books](#46-renew-books)
    - [4.7 Reserve Books](#47-reserve-books)
    - [4.8 Reserve Books from Librarian Side](#48-reserve-books-from-librarian-side)
    - [4.9 Issue Book to System User by Librarian](#49-issue-book-to-system-user-by-librarian)
    - [4.10 Manage All Book Instances in the Library](#410-manage-all-book-instances-in-the-library)
    - [4.11 Setting Library Policies by Library Administrators](#411-setting-library-policies-by-library-administrators)
    - [4.12 Managing Library Budget by Library Administrators](#412-managing-library-budget-by-library-administrators)
11. [Other Nonfunctional Requirements](#other-nonfunctional-requirements) 
    - [5.1 Performance Requirements](#51-performance-requirements)
    - [5.2 Safety Requirements](#52-safety-requirements)
    - [5.3 Security Requirements](#53-security-requirements)
    - [5.4 Software Quality Attributes](#54-software-quality-attributes)
    - [5.5 Business Rules](#55-business-rules)
12. [Other Requirements](#other-requirements) 

## Overview

The Library Management System is a web-based system designed to streamline virtually all operations in a library. It provides an efficient and user-friendly interface for utilizing library resources and services online.

## Features

- **Account Registration**: Allows users to create a new account based on specified roles.
- **User Authentication**: Users can log in using their username and password.
- **Manage Account Details**: Users can update their details.
- **Check Books in Library**: Get details about all the books in the library.
- **Reserve Books**: Users can reserve a limited number of books based on library policies.
- **Renew Books**: Users can renew borrowed books a limited number of times based on library policies.
- **Issue Books**: Librarians can issue books to system users who request them physically.
- **Manage Book Instances**: Librarians can manage the status and details of all book instances in the library.
- **Set Library Policies**: Administrators can manage all operations and policies in the library.
- **Manage Library Budget**: Administrators can manage the library's budget online.

## User Classes

- **System User**: Frequent users who need to reserve, renew, or get details of books in the library online.
- **Librarian**: Use the system to manage reservations, issue books to system users, and manage all book instances in the library.
- **Library Administrators**: Use the system to set, update, or delete library policies and manage the library budget and transactions online.
- **Super Admin**: Use the system to create, remove, or update all users in the Library Management System.

## Operating Environment

The system will operate on standard commercial hardware platforms, running any modern operating system such as Windows, macOS, or Linux. All services will be cloud-based, including the database.

## Design and Implementation Constraints

The Library Management System must adhere to all applicable regulatory policies and corporate guidelines.

## User Documentation

The Library Management System will come with a comprehensive set of documentations for each user class along with this general README file. All documentations will be available in Markdown format.

## Assumptions and Dependencies

It is assumed that the Library Management System will have a fast internet connection for executing functions properly and securely. The system will be using the free tier of Heroku and the MERN stack.

## References

- IEEE Standard for Software Requirements Specifications, IEEE Std 830-1998
- User Interface Style Guide, Version 2.0, ABC Corp, 2023
- System Requirements Specifications for Supermarket Management Systems, XYZ Corp, 2023

## External Interface Requirements

### 3.1 User Interfaces

The Library Management System will provide a user-friendly interface that is easy to navigate and understand. The interface will be designed with a focus on usability and accessibility, ensuring that all users, regardless of their technical proficiency, can effectively interact with the system.

#### 3.1.1 System User Interface

The interface for system users will include features for account registration, user authentication, account management, book reservation, book renewal, and book issuance. Users will be able to view and manage their account details, check the availability of books in the library, reserve books, renew borrowed books, and issue books.

#### 3.1.2 Librarian Interface

The librarian interface will include features for managing book reservations, issuing books to system users, and managing book instances in the library. Librarians will be able to view and manage all book reservations, issue books to users, and manage the status and details of all book instances in the library.

#### 3.1.3 Library Administrator Interface

The library administrator interface will include features for setting, updating, or deleting library policies and managing the library's budget online. Administrators will be able to view and manage all operations and policies in the library, as well as manage the library's budget.

#### 3.1.4 Super Admin Interface

The super admin interface will include features for creating, removing, or updating all users in the Library Management System. Super admins will have full control over user management within the system.

The user interfaces will be designed to be intuitive and easy to use, with clear instructions and prompts. They will be compatible with all modern operating systems such as Windows, macOS, and Linux, and will be accessible via a web browser for ease of access and use. The interfaces will adhere to all applicable regulatory policies and corporate guidelines. The design will also take into consideration the constraints of the free tier of the web hosting platform, Heroku, and the MERN stack along with HTML5/CSS3 with JS for scalability.

### 3.2 Hardware Interfaces

The Library Management System will be designed to be compatible with a wide range of hardware interfaces. This includes but is not limited to personal computers, laptops, tablets, and smartphones. The system will support devices running on modern operating systems such as Windows, macOS, Linux, iOS, and Android.

#### 3.2.1 Personal Computers and Laptops

The system will support personal computers and laptops with a minimum of 4GB RAM and 2GHz processor speed. The system will be accessible via a web browser, requiring an active internet connection.

#### 3.2.2 Tablets and Smartphones

The system will support tablets and smartphones with a minimum of 2GB RAM and 1.5GHz processor speed. The system will be accessible via a web browser, requiring an active internet connection.

#### 3.2.3 Communication Protocols

The system will use standard internet protocols (HTTP/HTTPS) for data transmission. It will also support WebSocket for real-time data updates.

#### 3.2.4 Data Interactions

The system will interact with the hardware to store and retrieve data from the device’s local storage. It will also use the device’s network interface for communicating with the server.


### 3.3 Software Interfaces

The Library Management System will interact with several software components to provide a seamless and efficient service.

#### 3.3.1 Operating Systems

The system will be compatible with all modern operating systems such as Windows (version 10 and above), macOS (version 10.15 and above), Linux (Ubuntu 18.04 and above), iOS (version 13 and above), and Android (version 9 and above).

#### 3.3.2 Databases

The system will interact with MongoDB (version 4.4 and above) for data storage. The database will store information about users, books, reservations, and transactions.

#### 3.3.3 Libraries and Tools

The system will be built using the MERN stack, which includes MongoDB, Express.js, React.js, and Node.js. It will also use HTML5/CSS3 for front-end development and JavaScript for back-end development.

#### 3.3.4 Integrated Commercial Components

The system will integrate with commercial components such as SendGrid for email notifications.

#### 3.3.5 Data Sharing

Data will be shared across software components using JSON format. The system will use RESTful API for communication between the front-end and the back-end. The API will follow standard HTTP methods for CRUD operations.

#### 3.3.6 Communication

The system will use HTTP/HTTPS protocols for communication between the client and the server. It will also use WebSocket for real-time updates.

### 3.4 Communications Interfaces

The Library Management System will utilize various communication interfaces to ensure efficient and secure data transfer.

#### 3.4.1 Email

The system will use SMTP protocol for sending emails. Emails will be used for account verification, password reset, reservation confirmation, and other notifications. The system will integrate with SendGrid for email services.

#### 3.4.2 Web Browser

The system will be accessible via a web browser. It will support all modern web browsers such as Google Chrome, Mozilla Firefox, Safari, and Microsoft Edge.

#### 3.4.3 Network Server Communications Protocols

The system will use HTTP/HTTPS for client-server communication. It will also use WebSocket for real-time updates.

#### 3.4.4 Electronic Forms

The system will use electronic forms for user registration, book reservation, and other data entry tasks. The forms will be designed with a focus on usability and accessibility.

#### 3.4.5 Communication Standards

The system will adhere to standard internet protocols such as HTTP, HTTPS, SMTP, and WebSocket.

#### 3.4.6 Communication Security and Encryption

All communication between the client and the server will be encrypted using SSL/TLS protocols to ensure data security. Passwords will be hashed and stored in the database.

#### 3.4.7 Data Transfer Rates and Synchronization

The system will be designed to optimize data transfer rates and minimize latency. It will use WebSocket for real-time updates.

## 4. System Features

### 4.1 Account Creation (Registration)
**Description and Priority:** This feature allows new users to create an account in the Library Management System. It is of High priority as it is the entry point for users to access the system's services.

**Stimulus/Response Sequences:**
- User selects the option to create a new account.
- System prompts the user to enter required details.
- User enters details and submits the form.
- System validates the information and creates a new account.

**Functional Requirements:**
- REQ-1: System must prompt the user to enter a unique username, a valid email address, and a strong password.
- REQ-2: System must validate the information provided by the user.
- REQ-3: System must display an error message if the entered email is already associated with an existing account.
- REQ-4: System must display a success message and send a verification email upon successful account creation.

### 4.2 Checking Registration Status

**Description and Priority:** This feature allows users to check their registration status. It is of Medium priority.

**Stimulus/Response Sequences:**
- User logs into their account.
- User navigates to the account settings page.
- System displays the user's registration status.

**Functional Requirements:**
- REQ-1: System must display the user's registration status on the account settings page.
- REQ-2: System must update the registration status in real-time.

### 4.3 Login

**Description and Priority:** This feature allows users to log into their account. It is of High priority as it is necessary for users to access their accounts.

**Stimulus/Response Sequences:**
- User enters their username and password.
- System validates the credentials.
- If the credentials are valid, the system logs the user in and redirects them to their dashboard.

**Functional Requirements:**
- REQ-1: System must prompt the user to enter their username and password.
- REQ-2: System must validate the entered credentials.
- REQ-3: System must display an error message if the entered credentials are incorrect.

### 4.4 Change Credentials

**Description and Priority:** This feature allows users to change their login credentials. It is of Medium priority.

**Stimulus/Response Sequences:**
- User navigates to the account settings page.
- User selects the option to change credentials.
- System prompts the user to enter their current password and their new credentials.
- User enters the required information and submits the form.
- System validates the information and updates the user's credentials.

**Functional Requirements:**
- REQ-1: System must prompt the user to enter their current password and their new credentials.
- REQ-2: System must validate the entered information.
- REQ-3: System must update the user's credentials upon successful validation.
- REQ-4: System must display a success message upon successful update of credentials.

## 4.5 Check Books in Library

### 4.5.1 Description and Priority
This feature allows users to check the availability of books in the library. It is of High priority as it is necessary for users to access the library’s resources.

### 4.5.2 Stimulus/Response Sequences
- User navigates to the library catalog page.
- User enters the name or ISBN of the book they are looking for.
- System searches the library database and displays the availability status of the book.

### 4.5.3 Functional Requirements
- REQ-1: System must prompt the user to enter the name or ISBN of the book.
- REQ-2: System must search the library database for the entered book.
- REQ-3: System must display the availability status of the book.
- REQ-4: System must display an error message if the entered book is not found in the library database.

## 4.6 Renew Books

### 4.6.1 Description and Priority
This feature allows users to renew their borrowed books. It is of High priority as it is necessary for users to extend their borrowing period.

### 4.6.2 Stimulus/Response Sequences
- User navigates to their account page.
- User selects the option to renew a borrowed book.
- System extends the due date of the borrowed book.

### 4.6.3 Functional Requirements
- REQ-1: System must display the list of borrowed books in the user's account page.
- REQ-2: System must allow the user to select a borrowed book to renew.
- REQ-3: System must extend the due date of the selected book upon renewal.

## 4.7 Reserve Books

### 4.7.1 Description and Priority
This feature allows users to reserve books. It is of High priority as it is necessary for users to secure a book they wish to borrow.

### 4.7.2 Stimulus/Response Sequences
- User navigates to the library catalog page.
- User selects a book to reserve.
- System reserves the selected book for the user.

### 4.7.3 Functional Requirements
- REQ-1: System must display the list of available books in the library catalog page.
- REQ-2: System must allow the user to select a book to reserve.
- REQ-3: System must reserve the selected book for the user.

## 4.8 Reserve Books from Librarian Side

### 4.8.1 Description and Priority
This feature allows librarians to reserve books for users. It is of Medium priority.

### 4.8.2 Stimulus/Response Sequences
- User provides their account details and the book they wish to reserve to the librarian.
- Librarian enters the user's account details and the book details into the system.
- System reserves the book for the user.

### 4.8.3 Functional Requirements
- REQ-1: System must allow the librarian to enter the user's account details and the book details.
- REQ-2: System must reserve the selected book for the user.

## 4.9 Issue Book to System User by Librarian

### 4.9.1 Description and Priority
This feature allows librarians to issue books to users. It is of High priority as it is necessary for users to borrow books.

### 4.9.2 Stimulus/Response Sequences
- User provides their account details and the book they wish to borrow to the librarian.
- Librarian enters the user's account details and the book details into the system.
- System issues the book to the user.

### 4.9.3 Functional Requirements
- REQ-1: System must allow the librarian to enter the user's account details and the book details.
- REQ-2: System must issue the selected book to the user.

## 4.10 Manage All Book Instances in the Library

### 4.10.1 Description and Priority
This feature allows librarians to manage all book instances in the library. It is of High priority as it is necessary for maintaining the library's catalog.

### 4.10.2 Stimulus/Response Sequences
- Librarian navigates to the library management page.
- Librarian selects an action (add, delete, update) to perform on a book instance.
- System performs the selected action on the book instance.

### 4.10.3 Functional Requirements
- REQ-1: System must display the list of all book instances in the library management page.
- REQ-2: System must allow the librarian to select an action to perform on a book instance.
- REQ-3: System must perform the selected action on the book instance.

## 4.11 Setting Library Policies by Library Administrators

### 4.11.1 Description and Priority
This feature allows library administrators to set library policies. It is of High priority as it is necessary for maintaining the library's operations.

### 4.11.2 Stimulus

/Response Sequences
- Library administrator navigates to the library policies page.
- Library administrator enters the new policy details.
- System updates the library policies.

### 4.11.3 Functional Requirements
- REQ-1: System must display the current library policies in the library policies page.
- REQ-2: System must allow the library administrator to enter new policy details.
- REQ-3: System must update the library policies with the new policy details.

## 4.12 Managing Library Budget by Library Administrators

### 4.12.1 Description and Priority
This feature allows library administrators to manage the library's budget. It is of High priority as it is necessary for maintaining the library's financial health.

### 4.12.2 Stimulus/Response Sequences
- Library administrator navigates to the library budget page.
- Library administrator enters the new budget details.
- System updates the library budget.

### 4.12.3 Functional Requirements
- REQ-1: System must display the current library budget in the library budget page.
- REQ-2: System must allow the library administrator to enter new budget details.
- REQ-3: System must update the library budget with the new budget details.

## 5. Other Nonfunctional Requirements

### 5.1 Performance Requirements
The system should be able to handle multiple simultaneous user requests without significant degradation in response time. The system should also be able to process a book reservation or return within 2 seconds under normal load conditions.

### 5.2 Safety Requirements
The system should prevent unauthorized access to user data. It should also have safeguards in place to prevent data loss, such as regular backups and data recovery mechanisms.

### 5.3 Security Requirements
The system should use secure protocols for data transmission. User authentication should be enforced through secure methods like hashed passwords. The system should also comply with privacy regulations like GDPR.

### 5.4 Software Quality Attributes
- Adaptable to changes in the library’s policies or inventory.
- Available for use during the library’s operating hours.
- Correct in terms of processing transactions and managing data.
- Maintainable with clear, modular code.
- Reliable with minimal downtime.
- Usable with an intuitive user interface.

### 5.5 Business Rules
- Only authenticated users can reserve or return books.
- Librarians can add or remove books from the inventory.
- Only the super admin can create, remove, or update user accounts.

## 6. Other Requirements
The system should be able to support multiple languages (internationalization requirements). It should also comply with all relevant legal requirements, such as data protection and privacy laws. The system should be designed in a modular way to allow for reuse of components where possible.

## License

This project is licensed under the terms of the [MIT license](LICENSE).
