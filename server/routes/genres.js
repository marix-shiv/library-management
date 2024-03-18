/**
 * This module defines the routes for the 'genres' endpoint of the API.
 * 
 * It includes routes for getting all genres, getting the top genres based on the number of books, 
 * searching for genres, getting details for a specific genre, creating a new genre, updating a genre, 
 * and deleting a genre.
 * 
 * Each route is associated with a controller function in the 'genresController' module.
 * 
 * This module uses the 'express' library to define the routes and the 'router' object to register the routes.
 */

const express = require('express');
const router = express.Router();
const genres_controller = require("../controllers/genresController");

/**
 * @swagger
 * /genres:
 *   get:
 *     tags:
 *       - Genres
 *     summary: Get all genres
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         example: 1
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *     responses:
 *       200:
 *         description: A list of genres
 *       500:
 *         description: Server error
 */
router.get('/', genres_controller.all_genres);

/**
 * @swagger
 * /genres/top:
 *   get:
 *     tags:
 *       - Genres
 *     summary: Get top genres
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Page number for pagination
 *     responses:
 *       200:
 *         description: A list of top genres
 *       500:
 *         description: Server error
 */
router.get('/top', genres_controller.top_genres);

/**
 * @swagger
 * /genres/search/{query}:
 *   get:
 *     tags:
 *       - Genres
 *     summary: Search genres
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
 *         description: Page number for pagination
 *     responses:
 *       200:
 *         description: A list of genres
 *       404:
 *         description: No genres found
 *       500:
 *         description: Server error
 */
router.get('/search/:query', genres_controller.search_genres);

/**
 * @swagger
 * /genres/{id}:
 *   get:
 *     tags:
 *       - Genres
 *     summary: Get genre details
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         example: "694a198d-fcdd-4da6-a982-ef4542b150aa"
 *         schema:
 *           type: string
 *         description: The genre id
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Page number for pagination
 *     responses:
 *       200:
 *         description: Genre details
 *       404:
 *         description: Genre not found
 *       500:
 *         description: Server error
 */
router.get('/:id', genres_controller.genre_details);

/**
 * @swagger
 * /genres:
 *   post:
 *     tags:
 *       - Genres
 *     summary: Create a genre
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Name:
 *                 type: string
 *                 example: "Test Genre"
 *     responses:
 *       200:
 *         description: Genre created successfully
 *       400:
 *         description: Bad request
 *       409:
 *         description: Conflict with existing genre
 *       500:
 *         description: Server error
 */
router.post('/', genres_controller.create_genre);

/**
 * @swagger
 * /genres/{id}:
 *   put:
 *     tags:
 *       - Genres
 *     summary: Update a genre
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         example: "694a198d-fcdd-4da6-a982-ef4542b150aa"
 *         schema:
 *           type: string
 *         description: The genre id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Name:
 *                 type: string
 *                 example: "Updated Genre Name"
 *     responses:
 *       200:
 *         description: Genre updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Genre not found
 *       500:
 *         description: Server error
 */
router.put('/:id', genres_controller.update_genre);

/**
 * @swagger
 * /genres/{id}:
 *   delete:
 *     tags:
 *       - Genres
 *     summary: Delete a genre
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         example: "694a198d-fcdd-4da6-a982-ef4542b150aa"
 *         schema:
 *           type: string
 *         description: The genre id
 *     responses:
 *       200:
 *         description: Genre deleted successfully
 *       404:
 *         description: Genre not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', genres_controller.delete_genre);

module.exports = router;