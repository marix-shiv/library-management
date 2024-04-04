/**
 * SearchResult.js
 * 
 * This is a React component that displays a single search result for a book. If no result is provided, it displays a message indicating that no books were found.
 * 
 * The component receives a result prop, which is an object containing the details of a book. These details are displayed in a ListGroup.Item component from the react-bootstrap library.
 * 
 * The title of the book is a link that navigates to the detail page for that book.
 * 
 * The component uses PropTypes to validate the type of the result prop.
 * 
 * @module components/SearchResult
 */

import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const SearchResult = ({ result }) => (
    result ? (
        <ListGroup.Item className="bg-light pt-3">
            <Link to={`/book-detail/${result.BookID}`} style={{"textDecoration": "none"}}>
                <h3>{result.Title}</h3>
                <h5>by {result.LastName}, {result.FirstName}</h5>
                <p>{result.Summary}</p>
            </Link>
        </ListGroup.Item>
    ):(
        <ListGroup.Item className="bg-light pt-3">
            <h3>No Books Found</h3>
            <p>
                Sorry, we could not find any books that match your search. Please
                try using different keywords or fewer letters.
            </p>
        </ListGroup.Item>
    )
);

SearchResult.propTypes = {
    result: PropTypes.shape({
        BookID: PropTypes.string,
        Title: PropTypes.string,
        LastName: PropTypes.string,
        FirstName: PropTypes.string,
        Summary: PropTypes.string,
    }),
};

export default SearchResult;