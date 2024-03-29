/**
 * This module defines the routes for the /users endpoint.
 * It includes routes for getting all users, getting a user by ID,
 * creating a new user, updating a user's password,
 * updating a user's details, deleting a user, and logging in a user.
 * Each route is handled by a corresponding function in the usersController module.
 */

const express = require('express');
const router = express.Router();
const users_controller = require("../controllers/usersController");

/**
 * @swagger
 * /users:
 *   get:
 *     tags:
 *       - Users
 *     summary: Returns details of all users for authorized user
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: An array of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   UserID:
 *                     type: string
 *                     example: "98630294-1c1f-4b67-911d-9516938c66de"
 *                   Username:
 *                     type: string
 *                     example: "test_username"
 *                   Role:
 *                     type: string
 *                     example: "A"
 *                   first_name:
 *                     type: string
 *                     example: "test_first_name"
 *                   last_name:
 *                     type: string
 *                     example: "test_last_name"
 *                   date_of_birth:
 *                     type: string
 *                     format: date-time
 *                     example: "1770-01-01T18:06:32.000Z"
 *                   UStatus:
 *                     type: integer
 *                     example: 0
 *       500:
 *         description: Server error
 */
router.get('/', users_controller.all_users);

router.get('/my-data', users_controller.my_data);

/**
 * @swagger
 * /users/check-token:
 *   get:
 *     tags:
 *       - Users
 *     summary: Check if a token is valid
 *     description: Returns 200 if token is valid and error response otherwise
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Token is valid
 *       401:
 *         description: Unauthorized, token is invalid or not provided
 *       500:
 *         description: Server error
 */
router.get('/check-token', users_controller.check_token);

/**
 * @swagger
 * /users/search/{query}:
 *   get:
 *     tags:
 *       - Users
 *     summary: Search for users
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *           example: "a"
 *         description: The search query
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: The page number for pagination
 *     responses:
 *       200:
 *         description: An array of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   UserID:
 *                     type: string
 *                   Username:
 *                     type: string
 *                   first_name:
 *                     type: string
 *                   last_name:
 *                     type: string
 *                   date_of_birth:
 *                     type: string
 *                     format: date-time
 *       404:
 *         description: No users found
 *       500:
 *         description: Server error
 */
router.get('/search/:query', users_controller.search_user);

/**
 * @swagger
 * /users/username/{query}:
 *   get:
 *     tags:
 *       - Users
 *     summary: Check if a username is present
 *     description: Returns 200 if no user with such username is present, Conflict otherwise
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *           example: "testuser"
 *         description: The username to check
 *     responses:
 *       200:
 *         description: No user with such username is present
 *       409:
 *         description: Username already in use
 *       500:
 *         description: Server error
 */
router.get('/username/:query', users_controller.check_username_presence);

router.get('/get-id/:query', users_controller.get_id_from_username);

router.get('/get-my-user-id', users_controller.get_my_user_id);
/**
 * @swagger
 * /users/{id}:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get user information by id
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         example: "98630294-1c1f-4b67-911d-9516938c66de"
 *         schema:
 *           type: string
 *         description: The user id
 *     responses:
 *       200:
 *         description: The user information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 UserID:
 *                   type: string
 *                   example: "98630294-1c1f-4b67-911d-9516938c66de"
 *                 Username:
 *                   type: string
 *                   example: "test_username"
 *                 Role:
 *                   type: string
 *                   example: "A"
 *                 first_name:
 *                   type: string
 *                   example: "test_first_name"
 *                 last_name:
 *                   type: string
 *                   example: "test_last_name"
 *                 date_of_birth:
 *                   type: string
 *                   format: date-time
 *                   example: "1770-01-01T18:06:32.000Z"
 *                 UStatus:
 *                   type: integer
 *                   example: 0
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.get('/:id', users_controller.user_details);

/**
 * @swagger
 * /users:
 *   post:
 *     tags:
 *       - Users
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Username:
 *                 type: string
 *                 example: "test_username"
 *               Password:
 *                 type: string
 *                 example: "test_Password1"
 *               first_name:
 *                 type: string
 *                 example: "test_first_name"
 *               last_name:
 *                 type: string
 *                 example: "test_last_name"
 *               date_of_birth:
 *                 type: string
 *                 format: date
 *                 example: "1770-01-01"
 *               Role:
 *                 type: string
 *                 example: "A"
 *     responses:
 *       200:
 *         description: The created user
 *       409:
 *         description: Username already taken
 */
router.post('/', users_controller.create_user);

/**
 * @swagger
 * /users/{id}/password:
 *   put:
 *     tags:
 *       - Users
 *     summary: Update password of the user
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The user id
 *         example: "98630294-1c1f-4b67-911d-9516938c66de"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Password:
 *                 type: string
 *                 example: "New_Password123"
 *     responses:
 *       200:
 *         description: Password updated successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.put('/:id/password', users_controller.update_password);

/**
 * @swagger
 * /users/{id}/verify:
 *   put:
 *     tags:
 *       - Users
 *     summary: Alter UStatus of a user
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         example: "98630294-1c1f-4b67-911d-9516938c66de"
 *         required: true
 *         schema:
 *           type: string
 *         description: The user id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               UStatus:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: User verified successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.put('/:id/verify', users_controller.verify_user);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     tags:
 *       - Users
 *     summary: Update details of the user other than password and role
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         example: "98630294-1c1f-4b67-911d-9516938c66de"
 *         required: true
 *         schema:
 *           type: string
 *         description: The user id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Username:
 *                 type: string
 *                 example: "UpdatedUsername"
 *               first_name:
 *                 type: string
 *                 example: "Updated First Name"
 *               last_name:
 *                 type: string
 *                 example: "Updated Last Name"
 *               date_of_birth:
 *                 type: string
 *                 format: date-time
 *                 example: "2010-01-01"
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.put('/:id', users_controller.update_user_details);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     tags:
 *       - Users
 *     summary: Delete a user
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         example: "98630294-1c1f-4b67-911d-9516938c66de"
 *         schema:
 *           type: string
 *         description: The user id
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', users_controller.delete_user);

/**
 * @swagger
 * /users/login:
 *   post:
 *     tags:
 *       - Users
 *     summary: Login a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Username:
 *                 type: string
 *                 example: "jim_brown_789"
 *               Password:
 *                 type: string
 *                 example: "AaBb@#1300"
 *     responses:
 *       200:
 *         description: The logged in user
 *       401:
 *         description: Invalid username or password
 */
router.post('/login', users_controller.login_user);

/**
 * @swagger
 * /users/logout:
 *   post:
 *     tags:
 *       - Users
 *     summary: Logout a user
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Logged out successfully
 *       500:
 *         description: Server error
 */
router.post('/logout', users_controller.logout_user);

module.exports = router;