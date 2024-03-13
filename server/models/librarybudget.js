/**
 * This module defines the LibraryBudget model for the 'library_budgets' table in the database.
 * The LibraryBudget model extends the Objection.js Model class and defines the table name, ID column, and a JSON schema.
 * The JSON schema describes the shape of the LibraryBudget objects and is used for validation before inserting or updating records.
 * The LibraryBudget model is exported so it can be used in other parts of the application to perform operations on the 'library_budgets' table.
 */

const { Model } = require('objection');
const { LIBRARY_BUDGETS_TABLE } = require('../constants/tableNames');
const { LIBRARY_BUDGET_BUDGET_ID, LIBRARY_BUDGET_MONEY, LIBRARY_BUDGET_DATE, LIBRARY_BUDGET_DESCRIPTION } = require('../constants/fieldNames');
const { ID_MIN_MAX_LENGTH, NAME_MIN_LENGTH, NAME_MAX_LENGTH, DESC_MIN, DESC_MAX } = require('../constants/validationConstants');

class LibraryBudget extends Model {
    static get tableName() {
        return LIBRARY_BUDGETS_TABLE;
    }

    static get idColumn() {
        return LIBRARY_BUDGET_BUDGET_ID;
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: [LIBRARY_BUDGET_DATE, LIBRARY_BUDGET_MONEY, LIBRARY_BUDGET_DESCRIPTION],
            properties: {
                [LIBRARY_BUDGET_BUDGET_ID]: { type: 'string', minLength: ID_MIN_MAX_LENGTH, maxLength: ID_MIN_MAX_LENGTH },
                [LIBRARY_BUDGET_DATE]: { type: 'string', format: 'date' },
                [LIBRARY_BUDGET_MONEY]: { type: 'number' },
                [LIBRARY_BUDGET_DESCRIPTION]: { type: 'string', minLength: DESC_MIN, maxLength: DESC_MAX },
            },
        };
    }
}

module.exports = LibraryBudget;