const {v4: uuidv4} = require('uuid');

exports.seed = async function(knex) {
    // Deletes ALL existing entries
    await knex('books').del();

    // Inserts seed entries
    return Promise.all([
        knex('books').insert({
            BookID: uuidv4(),
            Title: "1984",
            AuthorID: (await knex('authors').where({FirstName: 'George', LastName: 'Orwell'}).first()).AuthorID,
            Summary: "A dystopian future where critical thought is suppressed.",
            ISBN: "9780451524935",
            GenreID: (await knex('genres').where({Name: 'Dystopian'}).first()).GenreID
        }),
        knex('books').insert({
            BookID: uuidv4(),
            Title: "To Kill a Mockingbird",
            AuthorID: (await knex('authors').where({FirstName: 'Harper', LastName: 'Lee'}).first()).AuthorID,
            Summary: "A girl's view of racial injustice in her town.",
            ISBN: "9780446310789",
            GenreID: (await knex('genres').where({Name: 'Classic'}).first()).GenreID
        }),
        knex('books').insert({
            BookID: uuidv4(),
            Title: "The Great Gatsby",
            AuthorID: (await knex('authors').where({FirstName: 'F. Scott', LastName: 'Fitzgerald'}).first()).AuthorID,
            Summary: "A man's tragedy among the wealthy elite.",
            ISBN: "9780743273565",
            GenreID: (await knex('genres').where({Name: 'Classic'}).first()).GenreID
        }),
        knex('books').insert({
            BookID: uuidv4(),
            Title: "Animal Farm",
            AuthorID: (await knex('authors').where({ FirstName: 'George', LastName: 'Orwell' }).first()).AuthorID,
            Summary: "A farm's animals revolting against their human owner.",
            ISBN: "9780451526342",
            GenreID: (await knex('genres').where({ Name: 'Satire' }).first()).GenreID
        }),
        knex('books').insert({
            BookID: uuidv4(),
            Title: "The Shining",
            AuthorID: (await knex('authors').where({ FirstName: 'Stephen', LastName: 'King' }).first()).AuthorID,
            Summary: "A haunted hotel preys on the sanity of its winter caretaker.",
            ISBN: "9780307743657",
            GenreID: (await knex('genres').where({ Name: 'Horror' }).first()).GenreID
        }),
        knex('books').insert({
            BookID: uuidv4(),
            Title: "Misery",
            AuthorID: (await knex('authors').where({ FirstName: 'Stephen', LastName: 'King' }).first()).AuthorID,
            Summary: "A bestselling author is held captive by his 'number one fan'.",
            ISBN: "9780451169525",
            GenreID: (await knex('genres').where({ Name: 'Thriller' }).first()).GenreID
        }),
        knex('books').insert({
            BookID: uuidv4(),
            Title: "The Adventures of Sherlock Holmes",
            AuthorID: (await knex('authors').where({ FirstName: 'Arthur', LastName: 'Conan Doyle' }).first()).AuthorID,
            Summary: "Collection of stories featuring the iconic detective Sherlock Holmes.",
            ISBN: "9780140439074",
            GenreID: (await knex('genres').where({ Name: 'Mystery' }).first()).GenreID
        }),
        knex('books').insert({
            BookID: uuidv4(),
            Title: "The Hound of the Baskervilles",
            AuthorID: (await knex('authors').where({ FirstName: 'Arthur', LastName: 'Conan Doyle' }).first()).AuthorID,
            Summary: "Sherlock Holmes investigates the legend of a ghostly hound.",
            ISBN: "9780199536962",
            GenreID: (await knex('genres').where({ Name: 'Detective' }).first()).GenreID
        }),
        
        // ... add more books here
    ]);
};
