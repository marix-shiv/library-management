/**
 * This function updates the status of a book instance.
 * If a reservation exists for the book, the function sets the book instance's status to "R",
 * sets the user ID to the ID of the user who made the reservation,
 * and sets the available by date to today's date plus the maximum reservation duration.
 * The function then deletes the reservation.
 * 
 * @param {string} instanceId - The ID of the book instance to update.
 * @param {string} bookId - The ID of the book.
 */

const Reservation= require('../models/reservations');
const LibraryPolicy = require('../models/librarypolicies');
const BookInstance = require('../models/bookinstance');
const { RESERVATIONS_BOOK_ID, RESERVATIONS_USER_ID, RESERVATIONS_DATE_OF_RESERVATION, LIBRARY_POLICIES_VALUE, LIBRARY_POLICIES_PROPERTY, BOOK_INSTANCE_AVAILABLE_BY, BOOK_INSTANCE_USER_ID, BOOK_INSTANCE_STATUS, BOOK_INSTANCE_INSTANCE_ID, RESERVATIONS_RESERVATION_ID } = require('../constants/fieldNames');
const { MAX_RESERVATION_DURATION } = require('../constants/policyConstants');

async function updateBookInstanceStatus(instanceId, bookId) {
    const reqReservation = await Reservation
        .query()
        .select()
        .where(RESERVATIONS_BOOK_ID, bookId)
        .orderBy(RESERVATIONS_DATE_OF_RESERVATION, 'asc')
        .first()

    if(reqReservation && reqReservation.length !== 0){
        const maxReservationDuration = await LibraryPolicy
            .query()
            .select([LIBRARY_POLICIES_VALUE])
            .where({[LIBRARY_POLICIES_PROPERTY]: MAX_RESERVATION_DURATION})

        const availableByDate = new Date();
        availableByDate.setDate(availableByDate.getDate() + maxReservationDuration[0][LIBRARY_POLICIES_VALUE]);

        await BookInstance
            .query()
            .patch({
                [BOOK_INSTANCE_AVAILABLE_BY]: availableByDate.toISOString().split('T')[0],
                [BOOK_INSTANCE_USER_ID]: reqReservation[RESERVATIONS_USER_ID],
                [BOOK_INSTANCE_STATUS]: "R"
            })
            .where({ [BOOK_INSTANCE_INSTANCE_ID]: instanceId });


        await Reservation
            .query()
            .delete()
            .findById(reqReservation[RESERVATIONS_RESERVATION_ID]);
    }  
}

module.exports = updateBookInstanceStatus;