/**
 * This module defines the LibraryPolicy model for the 'library_policies' table in the database.
 * The LibraryPolicy model extends the Objection.js Model class and defines the table name, ID column, and a JSON schema.
 * The JSON schema describes the shape of the LibraryPolicy objects and is used for validation before inserting or updating records.
 * The LibraryPolicy model is exported so it can be used in other parts of the application to perform operations on the 'library_policies' table.
 */

const { Model } = require('objection');
const { LIBRARY_POLICIES_TABLE } = require('../constants/tableNames');
const { LIBRARY_POLICIES_POLICY_ID, LIBRARY_POLICIES_PROPERTY, LIBRARY_POLICIES_VALUE } = require('../constants/fieldNames');
const { ID_MIN_MAX_LENGTH, NAME_MIN_LENGTH, NAME_MAX_LENGTH, DESC_MIN, DESC_MAX } = require('../constants/validationConstants');

class LibraryPolicy extends Model {
    static get tableName() {
        return LIBRARY_POLICIES_TABLE;
    }

    static get idColumn() {
        return LIBRARY_POLICIES_POLICY_ID;
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: [ LIBRARY_POLICIES_PROPERTY, LIBRARY_POLICIES_VALUE ],
            properties: {
                [LIBRARY_POLICIES_POLICY_ID]: { type: 'string', minLength: ID_MIN_MAX_LENGTH, maxLength: ID_MIN_MAX_LENGTH },
                [LIBRARY_POLICIES_PROPERTY]: { type: 'string', minLength: NAME_MIN_LENGTH, maxLength: NAME_MAX_LENGTH },
                [LIBRARY_POLICIES_VALUE]: { type: 'string', minLength: NAME_MIN_LENGTH, maxLength: NAME_MAX_LENGTH },
            },
        };
    }
}

module.exports = LibraryPolicy;