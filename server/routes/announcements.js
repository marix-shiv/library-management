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

/**
 * @swagger
 * /announcements:
 *   get:
 *     tags:
 *       - Announcements
 *     summary: Get all announcements
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         example: 1
 *         schema:
 *           type: integer
 *         description: The page number for pagination
 *     responses:
 *       200:
 *         description: An array of announcements
 *       500:
 *         description: Server error
 */
router.get('/', announcementsController.all_announcements);

/**
 * @swagger
 * /announcements/latest:
 *   get:
 *     tags:
 *       - Announcements
 *     summary: Get the latest announcement
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: The latest announcement
 *       500:
 *         description: Server error
 */
router.get('/latest', announcementsController.latest_announcement);

/**
 * @swagger
 * /announcements/date/{startDate}/{endDate}:
 *   get:
 *     tags:
 *       - Announcements
 *     summary: Get announcements by date range
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: startDate
 *         example: 2000-01-01
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: The start date
 *       - in: path
 *         name: endDate
 *         example: 2050-01-01
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: The end date
 *       - in: query
 *         name: page
 *         example: 1
 *         schema:
 *           type: integer
 *         description: The page number for pagination
 *     responses:
 *       200:
 *         description: An array of announcements
 *       500:
 *         description: Server error
 */
router.get('/date/:startDate/:endDate', announcementsController.announcement_by_date_range);

/**
 * @swagger
 * /announcements/search/{query}:
 *   get:
 *     tags:
 *       - Announcements
 *     summary: Search for announcements
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: query
 *         required: true
 *         example: "test"
 *         schema:
 *           type: string
 *         description: The search query
 *       - in: query
 *         name: page
 *         example: 1
 *         schema:
 *           type: integer
 *         description: The page number for pagination
 *     responses:
 *       200:
 *         description: An array of announcements
 *       404:
 *         description: No announcements found
 *       500:
 *         description: Server error
 */
router.get('/search/:query', announcementsController.search_announcements);

/**
 * @swagger
 * /announcements/{id}:
 *   get:
 *     tags:
 *       - Announcements
 *     summary: Get announcement details by id
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         example: "110c4165-7894-456f-826d-c10ee4f5c7bf"
 *         schema:
 *           type: string
 *         description: The announcement id
 *     responses:
 *       200:
 *         description: The announcement details
 *       404:
 *         description: Announcement not found
 *       500:
 *         description: Server error
 */
router.get('/:id', announcementsController.announcement_details);

/**
 * @swagger
 * /announcements:
 *   post:
 *     tags:
 *       - Announcements
 *     summary: Create a new announcement
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Title:
 *                 type: string
 *                 example: "Test Announcement"
 *               Content:
 *                 type: string
 *                 example: "Test Content"
 *               DatePosted:
 *                 type: string
 *                 format: date-time
 *                 example: "2001-01-01"
 *     responses:
 *       200:
 *         description: Announcement created successfully
 *       500:
 *         description: Server error
 */
router.post('/', announcementsController.create_announcement);

/**
 * @swagger
 * /announcements/{id}:
 *   put:
 *     tags:
 *       - Announcements
 *     summary: Update an announcement
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         example: "110c4165-7894-456f-826d-c10ee4f5c7bf"
 *         schema:
 *           type: string
 *         description: The announcement id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Title:
 *                 type: string
 *                 example: "Updated Announcement Title"
 *               Content:
 *                 type: string
 *                 example: "Updated Announcement Content"
 *               DatePosted:
 *                 type: string
 *                 format: date-time
 *                 example: "2050-01-01"
 *     responses:
 *       200:
 *         description: Announcement updated successfully
 *       404:
 *         description: Announcement not found
 *       500:
 *         description: Server error
 */
router.put('/:id', announcementsController.update_announcement);

/**
 * @swagger
 * /announcements/{id}:
 *   delete:
 *     tags:
 *       - Announcements
 *     summary: Delete an announcement
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         example: "110c4165-7894-456f-826d-c10ee4f5c7bf"
 *         schema:
 *           type: string
 *         description: The announcement id
 *     responses:
 *       200:
 *         description: Announcement deleted successfully
 *       404:
 *         description: Announcement not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', announcementsController.delete_announcement);

module.exports = router;