/**
 * This module exports an Express router for the library budgets API.
 * The router defines routes for CRUD operations on library budget transactions and routes for getting transactions by date range, money range, and description.
 * Each route is associated with a controller function from the libraryBudgetsController module.
 * The router is used by the main app to mount the library budgets API at a specific path.
 */

const express = require('express');
const router = express.Router();
const libraryBudgetController = require("../controllers/libraryBudgetsController");

/**
 * @swagger
 * /budgets:
 *   get:
 *     tags:
 *       - Library Budgets
 *     summary: Get all transactions
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
 *         description: A list of transactions
 *       500:
 *         description: Server error
 */
router.get('/', libraryBudgetController.all_transactions);

/**
 * @swagger
 * /budgets/date/{startDate}/{endDate}:
 *   get:
 *     tags:
 *       - Library Budgets
 *     summary: Get transactions by date range
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: startDate
 *         required: true
 *         schema:
 *           type: string
 *           example: "2022-01-01"
 *         description: The start date
 *       - in: path
 *         name: endDate
 *         required: true
 *         schema:
 *           type: string
 *           example: "2022-12-31"
 *         description: The end date
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Page number for pagination
 *     responses:
 *       200:
 *         description: A list of transactions
 *       404:
 *         description: No transactions found
 *       500:
 *         description: Server error
 */
router.get('/date/:startDate/:endDate', libraryBudgetController.transactions_by_date_range);

/**
 * @swagger
 * /budgets/money/{minMoney}/{maxMoney}:
 *   get:
 *     tags:
 *       - Library Budgets
 *     summary: Get transactions by money range
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: minMoney
 *         required: true
 *         schema:
 *           type: number
 *           example: 100
 *         description: The minimum money
 *       - in: path
 *         name: maxMoney
 *         required: true
 *         schema:
 *           type: number
 *           example: 1000
 *         description: The maximum money
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *         description: Page number for pagination
 *     responses:
 *       200:
 *         description: A list of transactions
 *       404:
 *         description: No transactions found
 *       500:
 *         description: Server error
 */
router.get('/money/:minMoney/:maxMoney', libraryBudgetController.transactions_by_money_range);

/**
 * @swagger
 * /budgets/search/{query}/:
 *   get:
 *     tags:
 *       - Library Budgets
 *     summary: Search transactions
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
 *         description: A list of transactions
 *       404:
 *         description: No transactions found
 *       500:
 *         description: Server error
 */
router.get('/search/:query', libraryBudgetController.search_transactions);

/**
 * @swagger
 * /budgets/{id}/:
 *   get:
 *     tags:
 *       - Library Budgets
 *     summary: Get transaction details
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "957a9cc8-8262-437e-8e7d-2f40f701cfa0"
 *         description: The transaction id
 *     responses:
 *       200:
 *         description: Transaction details
 *       404:
 *         description: Transaction not found
 *       500:
 *         description: Server error
 */
router.get('/:id', libraryBudgetController.transaction_details);

/**
 * @swagger
 * /budgets/:
 *   post:
 *     tags:
 *       - Library Budgets
 *     summary: Create a transaction
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               LIBRARY_BUDGET_MONEY:
 *                 type: number
 *                 example: 200
 *               LIBRARY_BUDGET_DATE:
 *                 type: string
 *                 example: "2020-01-02"
 *               LIBRARY_BUDGET_DESCRIPTION:
 *                 type: string
 *                 example: "Updated Test Description"
 *     responses:
 *       200:
 *         description: Transaction created successfully
 *       400:
 *         description: Bad request
 *       409:
 *         description: Conflict with existing transaction
 *       500:
 *         description: Server error
 */
router.post('/', libraryBudgetController.create_transaction);

/**
 * @swagger
 * /budgets/{id}/:
 *   put:
 *     tags:
 *       - Library Budgets
 *     summary: Update a transaction
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "957a9cc8-8262-437e-8e7d-2f40f701cfa0"
 *         description: The transaction id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               LIBRARY_BUDGET_MONEY:
 *                 type: number
 *                 example: 100
 *               LIBRARY_BUDGET_DATE:
 *                 type: string
 *                 example: "2020-01-01"
 *               LIBRARY_BUDGET_DESCRIPTION:
 *                 type: string
 *                 example: "Test Description"
 *     responses:
 *       200:
 *         description: Transaction updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Transaction not found
 *       500:
 *         description: Server error
 */
router.put('/:id', libraryBudgetController.update_transaction);

/**
 * @swagger
 * /budgets/{id}/:
 *   delete:
 *     tags:
 *       - Library Budgets
 *     summary: Delete a transaction
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "957a9cc8-8262-437e-8e7d-2f40f701cfa0"
 *         description: The transaction id
 *     responses:
 *       200:
 *         description: Transaction deleted successfully
 *       404:
 *         description: Transaction not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', libraryBudgetController.delete_transaction);

module.exports = router;