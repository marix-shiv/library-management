/**
 * This script seeds the 'books_genres' table in the database.
 * 
 * It first deletes all existing entries in the 'books_genres' table.
 * Then, it inserts new entries into the 'books_genres' table.
 * 
 * Each entry includes a book ID and a genre ID.
 * The book ID for each entry is retrieved by querying the 'books' table with the title.
 * The genre ID for each entry is retrieved by querying the 'genres' table with the name.
 * 
 * This script does not use any external libraries.
 */

exports.seed = async function(knex) {
    // Deletes ALL existing entries
    await knex('books_genres').del();

    // Inserts seed entries
    return knex('books_genres').insert([
        {
            BookID: (await knex('books').where({Title: '1984'}).first()).BookID,
            GenreID: (await knex('genres').where({Name: 'Dystopian'}).first()).GenreID
        },
        {
            BookID: (await knex('books').where({Title: '1984'}).first()).BookID,
            GenreID: (await knex('genres').where({Name: 'Science Fiction'}).first()).GenreID
        },
        {
            BookID: (await knex('books').where({Title: 'To Kill a Mockingbird'}).first()).BookID,
            GenreID: (await knex('genres').where({Name: 'Coming-of-age'}).first()).GenreID
        },
        {
            BookID: (await knex('books').where({Title: 'To Kill a Mockingbird'}).first()).BookID,
            GenreID: (await knex('genres').where({Name: 'Young Adult'}).first()).GenreID
        },
        {
            BookID: (await knex('books').where({Title: 'Animal Farm'}).first()).BookID,
            GenreID: (await knex('genres').where({Name: 'Satire'}).first()).GenreID
        },
        {
            BookID: (await knex('books').where({Title: 'Animal Farm'}).first()).BookID,
            GenreID: (await knex('genres').where({Name: 'Political Fiction'}).first()).GenreID
        },
        {
            BookID: (await knex('books').where({Title: 'The Adventures of Sherlock Holmes'}).first()).BookID,
            GenreID: (await knex('genres').where({Name: 'Mystery'}).first()).GenreID
        },
        {
            BookID: (await knex('books').where({Title: 'The Adventures of Sherlock Holmes'}).first()).BookID,
            GenreID: (await knex('genres').where({Name: 'Detective'}).first()).GenreID
        },
        {
            BookID: (await knex('books').where({Title: 'The Hound of the Baskervilles'}).first()).BookID,
            GenreID: (await knex('genres').where({Name: 'Mystery'}).first()).GenreID
        },
        {
            BookID: (await knex('books').where({Title: 'The Hound of the Baskervilles'}).first()).BookID,
            GenreID: (await knex('genres').where({Name: 'Detective'}).first()).GenreID
        },
        {
            BookID: (await knex('books').where({Title: 'The Shining'}).first()).BookID,
            GenreID: (await knex('genres').where({Name: 'Horror'}).first()).GenreID
        },
        {
            BookID: (await knex('books').where({Title: 'The Shining'}).first()).BookID,
            GenreID: (await knex('genres').where({Name: 'Thriller'}).first()).GenreID
        },
        {
            BookID: (await knex('books').where({Title: 'Misery'}).first()).BookID,
            GenreID: (await knex('genres').where({Name: 'Thriller'}).first()).GenreID
        },
        {
            BookID: (await knex('books').where({Title: 'Misery'}).first()).BookID,
            GenreID: (await knex('genres').where({Name: 'Psychological Fiction'}).first()).GenreID
        },
        {
            BookID: (await knex('books').where({Title: 'The Great Gatsby'}).first()).BookID,
            GenreID: (await knex('genres').where({Name: 'Romance'}).first()).GenreID
        },
        {
            BookID: (await knex('books').where({Title: 'The Great Gatsby'}).first()).BookID,
            GenreID: (await knex('genres').where({Name: 'Classic'}).first()).GenreID
        },
    ]);
};
