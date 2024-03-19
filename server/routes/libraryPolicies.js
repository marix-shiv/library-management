/**
 * This module defines the routes for the library policies in the application.
 * 
 * It includes routes for getting all library policies, getting a specific policy by its ID,
 * creating a new policy, deleting "Non-Core" policies and updating an existing policy.
 * 
 * Each route is associated with a controller function from the 'libraryPoliciesController' module.
 * These controller functions handle the business logic for the corresponding routes.
 */

const express = require('express');
const router = express.Router();
const libraryPoliciesController = require("../controllers/libraryPoliciesController");

/**
 * @swagger
 * /policies/:
 *   get:
 *     tags:
 *       - Library Policies
 *     summary: Get all policies
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
 *         description: A list of policies
 *       500:
 *         description: Server error
 */
router.get('/', libraryPoliciesController.all_policies);

/**
 * @swagger
 * /policies/search/{query}/:
 *   get:
 *     tags:
 *       - Library Policies
 *     summary: Search policies
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *           example: "a"
 *         description: The search query
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Page number for pagination
 *     responses:
 *       200:
 *         description: A list of policies
 *       404:
 *         description: No policies found
 *       500:
 *         description: Server error
 */
router.get('/search/:query', libraryPoliciesController.search_policies);

/**
 * @swagger
 * /policies/{id}/:
 *   get:
 *     tags:
 *       - Library Policies
 *     summary: Get policy details
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "a7e0f252-fba9-4801-9ddc-93e9dddcc44f"
 *         description: The policy id
 *     responses:
 *       200:
 *         description: Policy details
 *       404:
 *         description: Policy not found
 *       500:
 *         description: Server error
 */
router.get('/:id', libraryPoliciesController.policy_details);

/**
 * @swagger
 * /policies/:
 *   post:
 *     tags:
 *       - Library Policies
 *     summary: Create a policy
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Property:
 *                 type: string
 *                 example: "Policy1"
 *               Value:
 *                 type: string
 *                 example: "Value1"
 *               Core:
 *                 type: boolean
 *                 example: false
 *               ValueIsInt:
 *                 type: boolean
 *                 example: false
 *     responses:
 *       200:
 *         description: Policy created successfully
 *       400:
 *         description: Bad request
 *       409:
 *         description: Conflict with existing policy
 *       500:
 *         description: Server error
 */
router.post('/', libraryPoliciesController.create_policy);

/**
 * @swagger
 * /policies/{id}/:
 *   put:
 *     tags:
 *       - Library Policies
 *     summary: Update a policy
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "a7e0f252-fba9-4801-9ddc-93e9dddcc44f"
 *         description: The policy id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Value:
 *                 type: string
 *                 example: "100"
 *     responses:
 *       200:
 *         description: Policy updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Policy not found
 *       500:
 *         description: Server error
 */
router.put('/:id', libraryPoliciesController.update_policy);

/**
 * @swagger
 * /policies/{id}/:
 *   delete:
 *     tags:
 *       - Library Policies
 *     summary: Delete a policy
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "a7e0f252-fba9-4801-9ddc-93e9dddcc44f"
 *         description: The policy id
 *     responses:
 *       200:
 *         description: Policy deleted successfully
 *       404:
 *         description: Policy not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', libraryPoliciesController.delete_policy);

module.exports = router;