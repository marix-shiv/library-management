/**
 * This module defines the routes for the /books endpoint of the API.
 * It provides the interface for managing books in the library, including operations like
 * retrieving, searching, creating, updating, and deleting books.
 * Each route is handled by a corresponding function in the booksController module.
 */

const express = require('express');
const router = express.Router();

// Require the controller module
const book_instances_controller = require("../controllers/bookInstancesController");

///// BOOK INSTANCES ROUTES //////

// Get All Book Instances
router.get('/', book_instances_controller.all_book_instances);

// Get Book Instances By Status
router.get('/status/:status', book_instances_controller.book_instances_by_status);

// Get book instance by id(InstanceID in this case)
router.get('/:id', book_instances_controller.book_instance_details);

// Create a new book instance
router.post('/', book_instances_controller.create_book_instance);

// Update book instance's status
router.put('/:id/status/:status', book_instances_controller.update_book_instance_status);

// Update a book instance's details
router.put('/:id', book_instances_controller.update_book_instance);

// Delete a book instance
router.delete('/:id', book_instances_controller.delete_book_instance);

module.exports = router;