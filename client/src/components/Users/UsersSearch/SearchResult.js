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