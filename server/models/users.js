/**
 * This module defines the User model for the 'users' table in the database.
 * The User model extends the Objection.js Model class and defines the table name, ID column, and a JSON schema.
 * The JSON schema describes the shape of the User objects and is used for validation before inserting or updating records.
 * The User model is exported so it can be used in other parts of the application to perform operations on the 'users' table.
 */

const { Model } = require('objection');
const { USERS_TABLE } = require('../constants/tableNames');
const { USERS_USER_ID, USERS_USERNAME, USERS_PASSWORD, USERS_ROLE, USERS_FIRST_NAME, USERS_LAST_NAME, USERS_DATE_OF_BIRTH, USERS_STATUS, USERS_SALT } = require('../constants/fieldNames');
const { ID_MIN_MAX_LENGTH, USERNAME_MIN_LENGTH, USERNAME_MAX_LENGTH, PASSWORD_MIN_MAX_LENGTH, SALT_MIN_MAX_LENGTH, ROLE_MIN_MAX_LENGTH, NAME_MIN_LENGTH, NAME_MAX_LENGTH } = require('../constants/validationConstants');

class User extends Model {
    static get tableName() {
        return USERS_TABLE;
    }

    static get idColumn() {
        return USERS_USER_ID;
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: [USERS_USERNAME, USERS_PASSWORD, USERS_ROLE, USERS_FIRST_NAME, USERS_LAST_NAME, USERS_DATE_OF_BIRTH, USERS_STATUS, USERS_SALT],
            properties: {
                [USERS_USER_ID]: { type: 'string', minLength: ID_MIN_MAX_LENGTH, maxLength: ID_MIN_MAX_LENGTH },
                [USERS_USERNAME]: { type: 'string', minLength: USERNAME_MIN_LENGTH, maxLength: USERNAME_MAX_LENGTH },
                [USERS_PASSWORD]: { type: 'string', minLength: PASSWORD_MIN_MAX_LENGTH, maxLength: PASSWORD_MIN_MAX_LENGTH },
                [USERS_SALT]: { type: 'string', minLength: SALT_MIN_MAX_LENGTH, maxLength: SALT_MIN_MAX_LENGTH },
                [USERS_ROLE]: { type: 'string', minLength: ROLE_MIN_MAX_LENGTH, maxLength: ROLE_MIN_MAX_LENGTH },
                [USERS_FIRST_NAME]: { type: 'string', minLength: NAME_MIN_LENGTH, maxLength: NAME_MAX_LENGTH },
                [USERS_LAST_NAME]: { type: 'string', minLength: NAME_MIN_LENGTH, maxLength: NAME_MAX_LENGTH },
                [USERS_DATE_OF_BIRTH]: { type: 'string', format: 'date' },
                [USERS_STATUS]: { type: 'boolean' },
            },
        };
    }
}

module.exports = User;