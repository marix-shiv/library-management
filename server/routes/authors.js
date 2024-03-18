/**
 * This module exports an Express router for the authors API.
 * The router defines routes for CRUD operations on authors and routes for getting all authors, searching for authors, getting top authors based on the number of books written, and getting author information and books written by an author by id.
 * Each route is associated with a controller function from the authorsController module.
 * The router is used by the main app to mount the authors API at a specific path.
 */

const express = require('express');
const router = express.Router();
const authors_controller = require("../controllers/authorsController");

/**
 * @swagger
 * /authors:
 *   get:
 *     tags:
 *       - Authors
 *     summary: Get all authors
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         example: 1
 *         schema:
 *           type: integer
 *         description: The page number for pagination
 *     responses:
 *       200:
 *         description: An array of authors
 *       500:
 *         description: Server error
 */
router.get('/', authors_controller.all_authors);

/**
 * @swagger
 * /authors/search/{query}:
 *   get:
 *     tags:
 *       - Authors
 *     summary: Search for authors
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: query
 *         required: true
 *         example: "a"
 *         schema:
 *           type: string
 *         description: The search query
 *       - in: query
 *         name: page
 *         example: 1
 *         schema:
 *           type: integer
 *         description: The page number for pagination
 *     responses:
 *       200:
 *         description: An array of authors
 *       404:
 *         description: No authors found
 *       500:
 *         description: Server error
 */
router.get('/search/:query', authors_controller.search_authors);

/**
 * @swagger
 * /authors/top:
 *   get:
 *     tags:
 *       - Authors
 *     summary: Get top authors based on number of books written
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: The page number for pagination
 *     responses:
 *       200:
 *         description: An array of top authors
 *       500:
 *         description: Server error
 */
router.get('/top', authors_controller.top_authors);

/**
 * @swagger
 * /authors/{id}:
 *   get:
 *     tags:
 *       - Authors
 *     summary: Get author details by id
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         example: "ea026a4c-a8b0-45ab-bc00-39fc1a5f0452"
 *         schema:
 *           type: string
 *         description: The author id
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: The page number for pagination
 *     responses:
 *       200:
 *         description: The author details
 *       500:
 *         description: Server error
 */
router.get('/:id', authors_controller.author_details);

/**
 * @swagger
 * /authors:
 *   post:
 *     tags:
 *       - Authors
 *     summary: Create a new author
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               FirstName:
 *                 type: string
 *                 example: "Test Author First Name"
 *               LastName:
 *                 type: string
 *                 example: "Test Author Last Name"
 *               DateOfBirth:
 *                 type: string
 *                 format: date-time
 *                 example: "2020-10-10"
 *               DateOfDeath:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Author created successfully
 *       409:
 *         description: Author already exists
 *       500:
 *         description: Server error
 */
router.post('/', authors_controller.create_author);

/**
 * @swagger
 * /authors/{id}:
 *   put:
 *     tags:
 *       - Authors
 *     summary: Update an author
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         example: "ea026a4c-a8b0-45ab-bc00-39fc1a5f0452"
 *         schema:
 *           type: string
 *         description: The author id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               FirstName:
 *                 type: string
 *                 example: "Test Updated First Name"
 *               LastName:
 *                 type: string
 *                 example: "Test Updated Last Name"
 *               DateOfBirth:
 *                 type: string
 *                 format: date-time
 *                 example: "2020-10-11"
 *               DateOfDeath:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       200:
 *         description: Author updated successfully
 *       404:
 *         description: Author not found
 *       500:
 *         description: Server error
 */
router.put('/:id', authors_controller.update_author);

/**
 * @swagger
 * /authors/{id}:
 *   delete:
 *     tags:
 *       - Authors
 *     summary: Delete an author
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         example: "ea026a4c-a8b0-45ab-bc00-39fc1a5f0452"
 *         schema:
 *           type: string
 *         description: The author id
 *     responses:
 *       200:
 *         description: Author deleted successfully
 *       404:
 *         description: Author not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', authors_controller.delete_author);

module.exports = router;