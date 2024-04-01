import React, { useEffect, useState } from "react";
import { ListGroup, Col, Button, Spinner } from "react-bootstrap";
import axios from "axios";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {toast} from 'react-toastify';  

const IssuedByUser = ({ byMe, userId = null }) => {
    
    const [books, setBooks] = useState([]);
    const [maxRenewals, setMaxRenewals] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        let url = byMe ? "/bookinstances/issued-by-me" : `/bookinstances/user/${userId}`;
        axios
            .get(url)
            .then((response) => {
                setBooks(response.data);
            })
            .catch((err) => {
                console.log(err.message);
                setBooks([]);
            });

        axios
            .get("/bookinstances/max-renewals")
            .then((response) => {
                setMaxRenewals(response.data.data);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, [byMe, userId]);

    const handleRenew = (id, event) => {
        event.preventDefault();
        event.stopPropagation();
        setIsLoading(true);
        axios
            .put(`/bookinstances/renew/${id}`)
            .then(() => {
                toast.success("Book Renewed!");
                setIsLoading(false);

                // Re-fetch the books after a successful renewal
                let url = byMe ? "/bookinstances/issued-by-me" : `/bookinstances/user/${userId}`;
                axios
                    .get(url)
                    .then((response) => {
                        setBooks(response.data);
                    })
                    .catch(() => {
                        setBooks([]);
                    });
            })
            .catch(() => {
                toast.error("Something went wrong!");
                setIsLoading(false);
            });
    };

    return (
        <Col className='bg-dark-purple text-light pt-4 pb-5 px-5 mb-5 mx-3 rounded-md text-break shadow-md-screen justify-content-center rounded'>
            <h2 className="gradient-text mb-3">Books Issued By {byMe ? "You" : userId}</h2>
            {books.length === 0 ? (
                <p className="lead slab-font fw-bold oscillate">No Books Issued</p>
            ) : (
                <ListGroup>
                    {books.map((book, index) => (
                        <Link to={`/book-instance-detail/${book.InstanceID}`} key={index}>
                            <ListGroup.Item className="bg-dark-purple pt-4 text-light mx-md-5">
                                <h3>{book.book.Title}</h3>
                                <p>Imprint: {book.Imprint}</p>
                                <p>Due Date: {book.AvailableBy.split('T')[0]}</p>
                                {byMe ? 
                                    <div>
                                        <p>Renewals Remaining: {maxRenewals - book.Renewals}</p>
                                        {book.Renewals < maxRenewals ? 
                                            isLoading ? 
                                                <Spinner animation="border" /> 
                                            : 
                                                <Button onClick={(event) => handleRenew(book.InstanceID, event)}>Renew</Button>
                                        : ''}
                                    </div>
                                : ''}
                            </ListGroup.Item>
                        </Link>
                    ))}
                </ListGroup>
            )}
        </Col>
    );
};
IssuedByUser.propTypes = {
    byMe: PropTypes.bool,
    userId: PropTypes.string
};
export default IssuedByUser;