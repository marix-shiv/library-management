/**
 * This module defines the routes for the /books endpoint of the API.
 * It provides the interface for managing books in the library, including operations like
 * retrieving, searching, creating, updating, and deleting books.
 * Each route is handled by a corresponding function in the booksController module.
 */

const express = require('express');
const router = express.Router();
const book_instances_controller = require("../controllers/bookInstancesController");

/**
 * @swagger
 * /bookinstances:
 *   get:
 *     tags:
 *       - Book Instances
 *     summary: Get all book instances
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
 *         description: An array of book instances
 *       500:
 *         description: Server error
 */
router.get('/', book_instances_controller.all_book_instances);

router.get('/max-renewals', book_instances_controller.max_renewals);

router.get('/issued-by-me', book_instances_controller.book_instances_issued_by_me);

/**
 * @swagger
 * /bookinstances/status/{status}:
 *   get:
 *     tags:
 *       - Book Instances
 *     summary: Get book instances by status
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: status
 *         required: true
 *         example: "A"
 *         schema:
 *           type: string
 *         description: The book instance status
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: The page number for pagination
 *     responses:
 *       200:
 *         description: An array of book instances
 *       404:
 *         description: No book instances found
 *       500:
 *         description: Server error
 */
router.get('/status/:status', book_instances_controller.book_instances_by_status);

router.get('/user/:id', book_instances_controller.book_instances_issued_by_user);

router.get('/get-user/:id', book_instances_controller.get_user_for_book_instance);

router.get('/get-fine/:id', book_instances_controller.get_fine_for_book_instance);

/**
 * @swagger
 * /bookinstances/{id}:
 *   get:
 *     tags:
 *       - Book Instances
 *     summary: Get book instance details by id
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         example: "f9b8b556-1f42-4e20-8364-8e8d15905b12"
 *         schema:
 *           type: string
 *         description: The book instance id
 *     responses:
 *       200:
 *         description: The book instance details
 *       404:
 *         description: Book instance not found
 *       500:
 *         description: Server error
 */
router.get('/:id', book_instances_controller.book_instance_details);

/**
 * @swagger
 * /bookinstances:
 *   post:
 *     tags:
 *       - Book Instances
 *     summary: Create a new book instance
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               BookId:
 *                 type: string
 *                 example: "bc0e219a-e4f3-40ec-b6fb-0719fd557cec"
 *               Imprint:
 *                 type: string
 *                 example: "Test Imprint"
 *               Status:
 *                 type: string
 *                 example: "A"
 *     responses:
 *       200:
 *         description: Book instance created successfully
 *       500:
 *         description: Server error
 */
router.post('/', book_instances_controller.create_book_instance);

router.put('/renew/:id', book_instances_controller.renew_book_instance);

/**
 * @swagger
 * /bookinstances/{id}/status/{status}:
 *   put:
 *     tags:
 *       - Book Instances
 *     summary: Update a book instance's status
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         example: "f9b8b556-1f42-4e20-8364-8e8d15905b12"
 *         schema:
 *           type: string
 *         description: The book instance id
 *       - in: path
 *         name: status
 *         required: true
 *         example: "M"
 *         schema:
 *           type: string
 *         description: The new status
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               UserID:
 *                 type: string
 *                 example: "98630294-1c1f-4b67-911d-9516938c66de"
 *     responses:
 *       200:
 *         description: Book instance status updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Book instance not found
 *       409:
 *         description: Conflict with the current status
 *       500:
 *         description: Server error
 */
router.put('/:id/status/:status', book_instances_controller.update_book_instance_status);

/**
 * @swagger
 * /bookinstances/{id}:
 *   put:
 *     tags:
 *       - Book Instances
 *     summary: Update a book instance
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         example: "f9b8b556-1f42-4e20-8364-8e8d15905b12"
 *         schema:
 *           type: string
 *         description: The book instance id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               BookID:
 *                 type: string
 *                 example: "bc0e219a-e4f3-40ec-b6fb-0719fd557cec"
 *               Imprint:
 *                 type: string
 *                 example: "Updated Imprint"
 *     responses:
 *       200:
 *         description: Book instance updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Book instance not found
 *       500:
 *         description: Server error
 */
router.put('/:id', book_instances_controller.update_book_instance);

router.delete('/my-reservation/:id', book_instances_controller.delete_my_reservation);

/**
 * @swagger
 * /bookinstances/{id}:
 *   delete:
 *     tags:
 *       - Book Instances
 *     summary: Delete a book instance
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         example: "f9b8b556-1f42-4e20-8364-8e8d15905b12"
 *         schema:
 *           type: string
 *         description: The book instance id
 *     responses:
 *       200:
 *         description: Book instance deleted successfully
 *       404:
 *         description: Book instance not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', book_instances_controller.delete_book_instance);

module.exports = router;