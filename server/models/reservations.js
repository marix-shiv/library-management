/**
 * This module defines the Reservation model for the 'reservations' table in the database.
 * The Reservation model extends the Objection.js Model class and defines the table name, ID column, and a JSON schema.
 * The JSON schema describes the shape of the Reservation objects and is used for validation before inserting or updating records.
 * The Reservation model is exported so it can be used in other parts of the application to perform operations on the 'reservations' table.
 */

const { Model } = require('objection');
const { RESERVATIONS_TABLE } = require('../constants/tableNames');
const { RESERVATIONS_RESERVATION_ID, RESERVATIONS_USER_ID, RESERVATIONS_INSTANCE_ID, RESERVATIONS_DATE_OF_RESERVATION } = require('../constants/fieldNames');
const { ID_MIN_MAX_LENGTH } = require('../constants/validationConstants');

class Reservation extends Model {
    static get tableName() {
        return RESERVATIONS_TABLE;
    }

    static get idColumn() {
        return RESERVATIONS_RESERVATION_ID;
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: [ RESERVATIONS_USER_ID, RESERVATIONS_INSTANCE_ID, RESERVATIONS_DATE_OF_RESERVATION],
            properties: {
                [RESERVATIONS_RESERVATION_ID]: { type: 'string', minLength: ID_MIN_MAX_LENGTH, maxLength: ID_MIN_MAX_LENGTH },
                [RESERVATIONS_USER_ID]: { type: 'string', minLength: ID_MIN_MAX_LENGTH, maxLength: ID_MIN_MAX_LENGTH },
                [RESERVATIONS_INSTANCE_ID]: { type: 'string', minLength: ID_MIN_MAX_LENGTH, maxLength: ID_MIN_MAX_LENGTH },
                [RESERVATIONS_DATE_OF_RESERVATION]: { type: 'string', format: 'date' },
            },
        };
    }
}

module.exports = Reservation;