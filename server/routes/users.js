/**
 * This module defines the routes for the /users endpoint.
 * It includes routes for getting all users, getting a user by ID,
 * creating a new user, updating a user's password,
 * updating a user's details, deleting a user, and logging in a user.
 * Each route is handled by a corresponding function in the usersController module.
 */

const express = require('express');
const router = express.Router();

// Require the controller module
const users_controller = require("../controllers/usersController");

///// USERS ROUTES //////

// Get All Users Details
router.get('/', users_controller.all_users);

// Search user by First Name
router.get('/search/:query', users_controller.search_user);

// Get user information by id(UserID in this case)
router.get('/:id', users_controller.user_details);

// Create a new user
router.post('/', users_controller.create_user);

// Update a user's password
router.put('/:id/password', users_controller.update_password);

// Update a user
router.put('/:id', users_controller.update_user_details);

// Delete a user
router.delete('/:id', users_controller.delete_user);

// Login a user
router.post('/login', users_controller.login_user);

// Logout a user
router.post('/logout', users_controller.logout_user);

module.exports = router;