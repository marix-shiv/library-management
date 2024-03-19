/**
 * This script seeds the 'genres' table in the database.
 * 
 * It first deletes all existing entries in the 'genres' table.
 * Then, it inserts new entries into the 'genres' table.
 * 
 * Each genre entry includes a unique ID and a name.
 * 
 * This script uses the 'uuid' library to generate unique IDs.
 */

const {v4: uuidv4} = require('uuid');

exports.seed = async function(knex) {
    // Deletes ALL existing entries
    await knex('genres').del();

    // Inserts seed entries in genre table
    return knex('genres').insert([
        {
            GenreID: '123e4567-e89b-12d3-a456-426614174001',
            Name: "Test Genre 1"
        },
        {
            GenreID: '123e4567-e89b-12d3-a456-426614174021',
            Name: "Test Genre 10"
        },
        {
            GenreID: uuidv4(),
            Name: "Fantasy"
        },
        {
            GenreID: uuidv4(),
            Name: "Adventure"
        },
        {
            GenreID: uuidv4(),
            Name: "Romance"
        },
        {
            GenreID: uuidv4(),
            Name: "Mystery"
        },
        {
            GenreID: uuidv4(),
            Name: "Horror"
        },
        {
            GenreID: uuidv4(),
            Name: "Science Fiction"
        },
        {
            GenreID: uuidv4(),
            Name: "Historical Fiction"
        },
        {
            GenreID: uuidv4(),
            Name: "Thriller"
        },
        {
            GenreID: uuidv4(),
            Name: "Crime"
        },
        {
            GenreID: uuidv4(),
            Name: "Dystopian"
        },
        {
            GenreID: uuidv4(),
            Name: "Autobiography"
        },
        {
            GenreID: uuidv4(),
            Name: "Biography"
        },
        {
            GenreID: uuidv4(),
            Name: "Classic"
        },
        {
            GenreID: uuidv4(),
            Name: "Contemporary"
        },
        {
            GenreID: uuidv4(),
            Name: "Non-Fiction"
        },
        {
            GenreID: uuidv4(),
            Name: "Historical"
        },
        {
            GenreID: uuidv4(),
            Name: "Young Adult"
        },
        {
            GenreID: uuidv4(),
            Name: "Children's"
        },
        {
            GenreID: uuidv4(),
            Name: "Graphic Novel"
        },
        {
            GenreID: uuidv4(),
            Name: "Paranormal"
        },
        {
            GenreID: uuidv4(),
            Name: 'Coming-of-age'
        },
        
        {
            GenreID: uuidv4(),
            Name: 'Gothic Fiction'
        },
        {
            GenreID: uuidv4(),
            Name: 'Tragedy'
        },
        {
            GenreID: uuidv4(),
            Name: 'Satire'
        },
        {
            GenreID: uuidv4(),
            Name: 'Detective'
        },
        {
            GenreID: uuidv4(),
            Name: "Political Fiction"
        },
        {
            GenreID: uuidv4(),
            Name: "Psychological Fiction"
        }
    ])
};
