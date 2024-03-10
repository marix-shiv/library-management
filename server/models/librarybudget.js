/**
 * This module defines the LibraryBudget model for the 'library_budgets' table in the database.
 * The LibraryBudget model extends the Objection.js Model class and defines the table name, ID column, and a JSON schema.
 * The JSON schema describes the shape of the LibraryBudget objects and is used for validation before inserting or updating records.
 * The LibraryBudget model is exported so it can be used in other parts of the application to perform operations on the 'library_budgets' table.
 */

const { Model } = require('objection');

class LibraryBudget extends Model {
    static get tableName() {
        return 'library_budgets';
    }

    static get idColumn() {
        return 'BudgetID';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['Date', 'Money', 'Description'],
            properties: {
                BudgetID: { type: 'string', length: 36 },
                Date: { type: 'string', format: 'date' },
                Money: { type: 'number' },
                Description: { type: 'string', minLength: 1, maxLength: 10000 },
            },
        };
    }
}

module.exports = LibraryBudget;