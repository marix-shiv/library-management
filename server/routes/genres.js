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

// Require the controller module
const genres_controller = require("../controllers/genresController");

///// GENRES ROUTES //////

// Get all genres
router.get('/', genres_controller.all_genres);

// Get the top genres (based on the number of books)
router.get('/top', genres_controller.top_genres);

// Search for genres
router.get('/search/:query', genres_controller.search_genres);

// Get genre information by id (GenreID in this case)
router.get('/:id', genres_controller.genre_details);

// Create a new genre
router.post('/', genres_controller.create_genre);

// Update a genre
router.put('/:id', genres_controller.update_genre);

// Delete a genre
router.delete('/:id', genres_controller.delete_genre);

module.exports = router;