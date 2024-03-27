import React from 'react';
import { ListGroup } from 'react-bootstrap';

const SearchResult = ({ result }) => (
    result ? (
        <ListGroup.Item className="bg-light pt-3">
            <h3>{result.Title}</h3>
            <h5>by {result.LastName}, {result.FirstName}</h5>
            <p>{result.Summary}</p>
        </ListGroup.Item>
    ):(
        <ListGroup.Item className="bg-light pt-3">
            <h3>No Books Found</h3>
            <p>
                Sorry, we couldn't find any books that match your search. Please
                try using different keywords or fewer letters.
            </p>
        </ListGroup.Item>
    )
);

export default SearchResult;