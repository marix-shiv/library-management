const Book = require('../models/books'); 
const { BOOKS_BOOK_ID} = require('../constants/fieldNames'); 
const filterTimeExceededReservations = require('./filterTimeExceededReservations');

const cleanReservations = async () => {
    try {
        const books = await Book
            .query()
            .select(BOOKS_BOOK_ID);

        for (let book of books) {
            await filterTimeExceededReservations(book[BOOKS_BOOK_ID]);
        }
    } catch (err) {
        console.error(err);
        throw err;
    }
};

module.exports = cleanReservations;