/**
 * This module exports an Express router for the authors API.
 * The router defines routes for CRUD operations on authors and routes for getting all authors, searching for authors, getting top authors based on the number of books written, and getting author information and books written by an author by id.
 * Each route is associated with a controller function from the authorsController module.
 * The router is used by the main app to mount the authors API at a specific path.
 */

const express = require('express');
const router = express.Router();

// Require the controller module
const authors_controller = require("../controllers/authorsController");

///// AUTHORS ROUTES //////

// Get all authors
router.get('/', authors_controller.all_authors);

// Search for authors
router.get('/search/:query', authors_controller.search_authors);

// Top authors (based on number of books written)
router.get('/top', authors_controller.top_authors);

// Get author information and books written by author by id
router.get('/:id', authors_controller.author_details);

// Create a new author
router.post('/', authors_controller.create_author);

// Update an author
router.put('/:id', authors_controller.update_author);

// Delete an author
router.delete('/:id', authors_controller.delete_author);



module.exports = router;