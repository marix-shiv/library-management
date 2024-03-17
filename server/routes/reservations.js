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