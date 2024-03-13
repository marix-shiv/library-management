/**
 * This module exports an Express router for the announcements API.
 * The router defines routes for CRUD operations on announcements and routes for getting all announcements, the most recent announcement, announcements in a date range, and searching announcements by title or content.
 * Each route is associated with a controller function from the announcementsController module.
 * The router is used by the main app to mount the announcements API at a specific path.
 */

const express = require('express');
const router = express.Router();

// Require the controller module
const announcementsController = require("../controllers/announcementsController");

///// ANNOUNCEMENTS ROUTES /////

// Get all announcements
router.get('/', announcementsController.all_announcements);

// Get the most recent announcement
router.get('/latest', announcementsController.latest_announcement);

// Get announcements in date range
router.get('/date/:startDate/:endDate', announcementsController.announcement_by_date_range);

// Search announcements by title or content
router.get('/search/:query', announcementsController.search_announcements);

// Get announcement by ID
router.get('/:id', announcementsController.announcement_details);

// Create a new announcement
router.post('/', announcementsController.create_announcement);

// Update an announcement
router.put('/:id', announcementsController.update_announcement);

// Delete an announcement
router.delete('/:id', announcementsController.delete_announcement);

module.exports = router;