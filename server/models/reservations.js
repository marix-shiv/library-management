/**
 * This module defines the Reservation model for the 'reservations' table in the database.
 * The Reservation model extends the Objection.js Model class and defines the table name, ID column, and a JSON schema.
 * The JSON schema describes the shape of the Reservation objects and is used for validation before inserting or updating records.
 * The Reservation model is exported so it can be used in other parts of the application to perform operations on the 'reservations' table.
 */

const { Model } = require('objection');

class Reservation extends Model {
    static get tableName() {
        return 'reservations';
    }

    static get idColumn() {
        return 'ReservationID';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['UserID', 'InstanceID', 'DateOfReservation'],
            properties: {
                ReservationID: { type: 'string', length: 36 },
                UserID: { type: 'string', length: 36 },
                InstanceID: { type: 'string', length: 36 },
                DateOfReservation: { type: 'string', format: 'date' },
            },
        };
    }
}

module.exports = Reservation;