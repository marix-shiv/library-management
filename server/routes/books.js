/**
 * This module defines the routes for the /books endpoint of the API.
 * It provides the interface for managing books in the library, including operations like
 * retrieving, searching, creating, updating, and deleting books.
 * Each route is handled by a corresponding function in the booksController module.
 */

const express = require('express');
const router = express.Router();

// Require the controller module
const books_controller = require("../controllers/booksController");

///// BOOKS ROUTES //////

// Get All Books
router.get('/', books_controller.all_books);

// Search book by Title
router.get('/search/:query', books_controller.search_books);

// Get top books
router.get('/top', books_controller.top_books);

// Get book information by id(BookID in this case)
router.get('/:id', books_controller.book_details);

// Create a new book
router.post('/', books_controller.create_book);

// Update a book's details
router.put('/:id', books_controller.update_book);

// Delete a book
router.delete('/:id', books_controller.delete_book);

module.exports = router;