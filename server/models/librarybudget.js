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