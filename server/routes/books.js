/**
 * This module defines the routes for the /books endpoint of the API.
 * It provides the interface for managing books in the library, including operations like
 * retrieving, searching, creating, updating, and deleting books.
 * Each route is handled by a corresponding function in the booksController module.
 */

const express = require('express');
const router = express.Router();
const books_controller = require("../controllers/booksController");

/**
 * @swagger
 * /books:
 *   get:
 *     tags:
 *       - Books
 *     summary: Get all books
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
 *         description: A list of books
 *       500:
 *         description: Server error
 */
router.get('/', books_controller.all_books);

/**
 * @swagger
 * /books/search/{query}:
 *   get:
 *     tags:
 *       - Books
 *     summary: Search books
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
 *         description: Page number for pagination
 *     responses:
 *       200:
 *         description: A list of books
 *       404:
 *         description: No books found
 *       500:
 *         description: Server error
 */
router.get('/search/:query', books_controller.search_books);

/**
 * @swagger
 * /books/top:
 *   get:
 *     tags:
 *       - Books
 *     summary: Get top books
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
 *         description: A list of top books
 *       500:
 *         description: Server error
 */
router.get('/top', books_controller.top_books);

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     tags:
 *       - Books
 *     summary: Get book details
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         example: "bc0e219a-e4f3-40ec-b6fb-0719fd557cec"
 *         schema:
 *           type: string
 *         description: The book id
 *     responses:
 *       200:
 *         description: Book details
 *       404:
 *         description: Book not found
 *       500:
 *         description: Server error
 */
router.get('/:id', books_controller.book_details);

/**
 * @swagger
 * /books:
 *   post:
 *     tags:
 *       - Books
 *     summary: Create a book
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ISBN:
 *                 type: string
 *                 example: "1234123412341"
 *               Title:
 *                 type: string
 *                 example: "Test Title"
 *               GenreId:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["ff1830b9-950e-47bf-8685-f6bed5f2b7d9", "f8de736d-d294-4373-b744-112b69bf7b50"]
 *               AuthorId:
 *                 type: string
 *                 example: "47a097f6-6f9d-40b0-9897-939095cafa0c"
 *               Summary:
 *                 type: string
 *                 example: "Test Summary"
 *     responses:
 *       200:
 *         description: Book created successfully
 *       400:
 *         description: Bad request
 *       409:
 *         description: Conflict with existing book
 *       500:
 *         description: Server error
 */
router.post('/', books_controller.create_book);

/**
 * @swagger
 * /books/{id}:
 *   put:
 *     tags:
 *       - Books
 *     summary: Update a book
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         example: "bc0e219a-e4f3-40ec-b6fb-0719fd557cec"
 *         schema:
 *           type: string
 *         description: The book id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ISBN:
 *                 type: string
 *                 example: "5987654321123"
 *               Title:
 *                 type: string
 *                 example: "Updated Test Title"
 *               Summary:
 *                 type: string
 *                 example: "Updated Test Summary"
 *               AuthorId:
 *                 type: string
 *                 example: "371bdf73-f2c7-443a-99f7-0db400fc2efa"
 *               GenreId:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["5c5cff05-b7c3-42c7-8e6e-947dc0153115", "694a198d-fcdd-4da6-a982-ef4542b150aa"]
 *     responses:
 *       200:
 *         description: Book updated successfully
 *       400:
 *         description: Bad request
 *       409:
 *         description: Conflict with existing book
 *       500:
 *         description: Server error
 */
router.put('/:id', books_controller.update_book);

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     tags:
 *       - Books
 *     summary: Delete a book
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         example: "bc0e219a-e4f3-40ec-b6fb-0719fd557cec"
 *         schema:
 *           type: string
 *         description: The book id
 *     responses:
 *       200:
 *         description: Book deleted successfully
 *       404:
 *         description: Book not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', books_controller.delete_book);

module.exports = router;