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