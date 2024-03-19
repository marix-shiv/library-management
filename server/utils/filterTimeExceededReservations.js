const BookInstance = require('../models/bookinstance'); // Replace with the actual path to your BookInstance model
const {
    BOOK_INSTANCE_BOOK_ID,
    BOOK_INSTANCE_STATUS,
    BOOK_INSTANCE_AVAILABLE_BY,
    BOOK_INSTANCE_USER_ID,
    BOOK_INSTANCE_INSTANCE_ID
} = require('../constants/fieldNames'); // Replace with the actual path to your constants file

const filterTimeExceededReservations = async (bookId) => {
    try {
        const currentDate = new Date();

        const bookInstances = await BookInstance
            .query()
            .where({
                [BOOK_INSTANCE_BOOK_ID]: bookId,
                [BOOK_INSTANCE_STATUS]: 'R'
            });

        for (let instance of bookInstances) {
            const reservationDate = new Date(instance[BOOK_INSTANCE_AVAILABLE_BY]);

            if (reservationDate < currentDate) {
                await BookInstance
                    .query()
                    .patch({
                        [BOOK_INSTANCE_STATUS]: 'A',
                        [BOOK_INSTANCE_AVAILABLE_BY]: null,
                        [BOOK_INSTANCE_USER_ID]: null
                    })
                    .where({
                        [BOOK_INSTANCE_INSTANCE_ID]: instance[BOOK_INSTANCE_INSTANCE_ID]
                    });
            }
        }
    } catch (err) {
        console.error(err);
        throw err;
    }
};

module.exports = filterTimeExceededReservations;