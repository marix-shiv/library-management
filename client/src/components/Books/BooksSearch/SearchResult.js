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