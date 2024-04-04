/**
 * SearchResult.js
 * 
 * This is a React component that displays the result of a user search. It takes a `result` prop, which is an object containing the user's details. The `result` object should have the properties `UserID`, `first_name`, `last_name`, `Username`, and `date_of_birth`.
 * 
 * If the `result` prop is truthy, it renders a `ListGroup.Item` component from the `react-bootstrap` library. This component displays the user's first name, last name, username, and date of birth. The user's name and username are displayed as headings, and the date of birth is displayed as a paragraph. The date of birth is split on 'T' to remove the time part. The `ListGroup.Item` is wrapped in a `Link` component from the `react-router-dom` library, which links to the user's profile page.
 * 
 * If the `result` prop is falsy, it renders a `ListGroup.Item` component with a message saying that no users were found.
 * 
 * The `UsersSearchResult` function is type checked with `PropTypes`. The `result` prop is an object with the properties `UserID`, `first_name`, `last_name`, `Username`, and `date_of_birth`, all of which are strings.
 * 
 * @module components/UsersSearchResult
 */

import React from 'react';
import PropTypes from 'prop-types';
import { ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const UsersSearchResult = ({ result }) => (
    result ? (
        <Link to={`/user-profile/${result.UserID}`} style={{ textDecoration: 'none' }}>
            <ListGroup.Item className="bg-light pt-3">
                <h3 className='text-center'>{result.first_name} {result.last_name}</h3>
                <h5 className='text-center'>Username: {result.Username}</h5>
                <p className='text-center'>Date of Birth: {result.date_of_birth.split('T')[0]}</p>
            </ListGroup.Item>
        </Link>
    ):(
        <ListGroup.Item className="bg-light pt-3">
            <h3 className='text-center'>No users Found</h3>
            <p className='text-center'>
                Sorry, we could not find any users that match your search. Please
                try using different keywords or fewer letters.
            </p>
        </ListGroup.Item>
    )
);

UsersSearchResult.propTypes = {
    result: PropTypes.shape({
        UserID: PropTypes.string,
        first_name: PropTypes.string,
        last_name: PropTypes.string,
        Username: PropTypes.string,
        date_of_birth: PropTypes.string,
    }),
};

export default UsersSearchResult;