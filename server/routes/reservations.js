/**
 * This module sets up all routes for the reservations resource.
 * 
 * The routes include:
 * - GET /: Get all reservations
 * - GET /user/:id: Get all reservations made by a specific user
 * - GET /book/:id: Get all reservations for a specific book
 * - GET /:id: Get a specific reservation by its ID
 * - POST /: Create a new reservation
 * - DELETE /:id: Delete a specific reservation by its ID
 * 
 * Each route is linked to a function in the reservations controller.
 */
const express = require('express');
const router = express.Router();
const reservationsController = require("../controllers/reservationsController");

/**
 * @swagger
 * /reservations:
 *   get:
 *     tags:
 *       - Reservations
 *     summary: Get all reservations
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
 *         description: A list of reservations
 *       500:
 *         description: Server error
 */
router.get('/', reservationsController.all_reservations);

/**
 * @swagger
 * /reservations/user/{id}:
 *   get:
 *     tags:
 *       - Reservations
 *     summary: Get reservations by user
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "3d00d927-bc77-4692-ae5b-fca632121eda"
 *         description: The user id
 *     responses:
 *       200:
 *         description: A list of reservations
 *       404:
 *         description: No reservations found
 *       500:
 *         description: Server error
 */
router.get('/user/:id', reservationsController.reservations_by_user);

/**
 * @swagger
 * /reservations/book/{id}:
 *   get:
 *     tags:
 *       - Reservations
 *     summary: Get reservations by book
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "3d00d927-bc77-4692-ae5b-fca632121eda"
 *         description: The book id
 *     responses:
 *       200:
 *         description: A list of reservations
 *       404:
 *         description: No reservations found
 *       500:
 *         description: Server error
 */
router.get('/book/:id', reservationsController.reservations_by_book);

/**
 * @swagger
 * /reservations/{id}:
 *   get:
 *     tags:
 *       - Reservations
 *     summary: Get reservation details
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "3d00d927-bc77-4692-ae5b-fca632121eda"
 *         description: The reservation id
 *     responses:
 *       200:
 *         description: Reservation details
 *       404:
 *         description: Reservation not found
 *       500:
 *         description: Server error
 */
router.get('/:id', reservationsController.reservation_details);

/**
 * @swagger
 * /reservations:
 *   post:
 *     tags:
 *       - Reservations
 *     summary: Create a reservation
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               BookID:
 *                 type: string
 *                 example: "3d00d927-bc77-4692-ae5b-fca632121eda"
 *               DateOfReservation:
 *                 type: string
 *                 example: "2022-01-01"
 *               UserID:
 *                 type: string
 *                 example: "6fa6fd90-8c4c-4ea3-8554-bf1da81009ca"
 *     responses:
 *       200:
 *         description: Reservation created successfully
 *       400:
 *         description: Bad request
 *       409:
 *         description: Conflict with existing reservation
 *       500:
 *         description: Server error
 */
router.post('/', reservationsController.create_reservation);

/**
 * @swagger
 * /reservations/{id}:
 *   delete:
 *     tags:
 *       - Reservations
 *     summary: Delete a reservation
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "3d00d927-bc77-4692-ae5b-fca632121eda"
 *         description: The reservation id
 *     responses:
 *       200:
 *         description: Reservation deleted successfully
 *       404:
 *         description: Reservation not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', reservationsController.delete_reservation);

module.exports = router;