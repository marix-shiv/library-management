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

// Require the controller module
const libraryPoliciesController = require("../controllers/libraryPoliciesController");

///// LIBRARY POLICIES ROUTES /////

// Get all library policies
router.get('/', libraryPoliciesController.all_policies);

// Search library policies
router.get('/search/:query', libraryPoliciesController.search_policies);

// Get a specific library policy by ID
router.get('/:id', libraryPoliciesController.policy_details);

// Create a new library policy
router.post('/', libraryPoliciesController.create_policy);

// Update a library policy
router.put('/:id', libraryPoliciesController.update_policy);

// Delete a library policy
router.delete('/:id', libraryPoliciesController.delete_policy);

module.exports = router;