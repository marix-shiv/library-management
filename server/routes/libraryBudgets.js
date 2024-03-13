/**
 * This module exports an Express router for the library budgets API.
 * The router defines routes for CRUD operations on library budget transactions and routes for getting transactions by date range, money range, and description.
 * Each route is associated with a controller function from the libraryBudgetsController module.
 * The router is used by the main app to mount the library budgets API at a specific path.
 */

const express = require('express');
const router = express.Router();

// Require the controller module
const libraryBudgetController = require("../controllers/libraryBudgetsController");

///// LIBRARY BUDGET ROUTES //////

// Get all transactions
router.get('/', libraryBudgetController.all_transactions);

// Get transactions by date range
router.get('/date/:startDate/:endDate', libraryBudgetController.transactions_by_date_range);

// Get transactions by money range
router.get('/money/:minMoney/:maxMoney', libraryBudgetController.transactions_by_money_range);

// Search transaction by description
router.get('/search/:query', libraryBudgetController.search_transactions);

// Get transaction by id
router.get('/:id', libraryBudgetController.transaction_details);

// Create a new transaction
router.post('/', libraryBudgetController.create_transaction);

// Update a transaction
router.put('/:id', libraryBudgetController.update_transaction);

// Delete a transaction
router.delete('/:id', libraryBudgetController.delete_transaction);

module.exports = router;