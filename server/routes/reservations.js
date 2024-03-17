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

// Require the controller module
const reservationsController = require("../controllers/reservationsController");

///// RESERVATIONS ROUTES //////

// Get All Reservations
router.get('/', reservationsController.all_reservations);

// Get Reservations by User ID
router.get('/user/:id', reservationsController.reservations_by_user);

// Get Reservations by Book ID
router.get('/book/:id', reservationsController.reservations_by_book);

// Get Reservation by id (ReservationID in this case)
router.get('/:id', reservationsController.reservation_details);

// Create a new reservation
router.post('/', reservationsController.create_reservation);

// Delete a reservation
router.delete('/:id', reservationsController.delete_reservation);

module.exports = router;