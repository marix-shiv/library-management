const {v4: uuidv4} = require('uuid');

exports.seed = async function(knex) {
    // Deletes ALL existing entries
    await knex('authors').del();

    // Inserts seed entries in genre table
    return knex('authors').insert([
        {
            AuthorID: uuidv4(),
            FirstName: "William",
            LastName: "Shakespeare",
            DateOfBirth: '1564-04-26',
            DateOfDeath: '1616-04-23'
        },
        {
            AuthorID: uuidv4(),
            FirstName: "George",
            LastName: "Orwell",
            DateOfBirth: '1903-06-25',
            DateOfDeath: '1950-01-21'
        },
        {
            AuthorID: uuidv4(),
            FirstName: "J.K.",
            LastName: "Rowling",
            DateOfBirth: '1965-07-31',
            DateOfDeath: null
        },
        {
            AuthorID: uuidv4(),
            FirstName: "Ernest",
            LastName: "Hemingway",
            DateOfBirth: '1899-07-21',
            DateOfDeath: '1961-07-02'
        },
        {
            AuthorID: uuidv4(),
            FirstName: "Mark",
            LastName: "Twain",
            DateOfBirth: '1835-11-30',
            DateOfDeath: '1910-04-21'
        },
        {
            AuthorID: uuidv4(),
            FirstName: "Jane",
            LastName: "Austen",
            DateOfBirth: '1775-12-16',
            DateOfDeath: '1817-07-18'
        },
        {
            AuthorID: uuidv4(),
            FirstName: "Charles",
            LastName: "Dickens",
            DateOfBirth: '1812-02-07',
            DateOfDeath: '1870-06-09'
        },
        {
            AuthorID: uuidv4(),
            FirstName: "F. Scott",
            LastName: "Fitzgerald",
            DateOfBirth: '1896-09-24',
            DateOfDeath: '1940-12-21'
        },
        {
            AuthorID: uuidv4(),
            FirstName: "Virginia",
            LastName: "Woolf",
            DateOfBirth: '1882-01-25',
            DateOfDeath: '1941-03-28'
        },
        {
            AuthorID: uuidv4(),
            FirstName: "Leo",
            LastName: "Tolstoy",
            DateOfBirth: '1828-09-09',
            DateOfDeath: '1910-11-20'
        },
        {
            AuthorID: uuidv4(),
            FirstName: "Emily",
            LastName: "Bronte",
            DateOfBirth: '1818-07-30',
            DateOfDeath: '1848-12-19'
        },
        {
            AuthorID: uuidv4(),
            FirstName: "Harper",
            LastName: "Lee",
            DateOfBirth: '1926-04-28',
            DateOfDeath: '2016-02-19'
        },
        {
            AuthorID: uuidv4(),
            FirstName: "Agatha",
            LastName: "Christie",
            DateOfBirth: '1890-09-15',
            DateOfDeath: '1976-01-12'
        },
        {
            AuthorID: uuidv4(),
            FirstName: "J.R.R.",
            LastName: "Tolkien",
            DateOfBirth: '1892-01-03',
            DateOfDeath: '1973-09-02'
        },
        {
            AuthorID: uuidv4(),
            FirstName: "Oscar",
            LastName: "Wilde",
            DateOfBirth: '1854-10-16',
            DateOfDeath: '1900-11-30'
        },
        {
            AuthorID: uuidv4(),
            FirstName: "Edgar Allan",
            LastName: "Poe",
            DateOfBirth: '1809-01-19',
            DateOfDeath: '1849-10-07'
        },
        {
            AuthorID: uuidv4(),
            FirstName: "Arthur",
            LastName: "Conan Doyle",
            DateOfBirth: '1859-05-22',
            DateOfDeath: '1930-07-07'
        },
        {
            AuthorID: uuidv4(),
            FirstName: "John",
            LastName: "Steinbeck",
            DateOfBirth: '1902-02-27',
            DateOfDeath: '1968-12-20'
        },
        {
            AuthorID: uuidv4(),
            FirstName: "Stephen",
            LastName: "King",
            DateOfBirth: '1947-09-21',
            DateOfDeath: null
        },
        {
            AuthorID: uuidv4(),
            FirstName: "Herman",
            LastName: "Melville",
            DateOfBirth: '1819-08-01',
            DateOfDeath: '1891-09-28'
        }
    ])
};
