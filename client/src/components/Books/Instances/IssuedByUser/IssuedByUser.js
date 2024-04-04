/**
 * IssuedByUser.js
 * 
 * This is a React component that fetches and displays the books issued by a specific user. It allows the user to renew a loaned book or delete a reservation.
 * 
 * The component uses the useState and useEffect hooks to manage the state and side effects. It also uses the axios library to send HTTP requests to the server.
 * 
 * The books are fetched from the `/bookinstances/issued-by-me` or `/bookinstances/user/:userId` endpoint, depending on whether the books are issued by the current user or another user.
 * 
 * The maximum number of renewals is fetched from the `/bookinstances/max-renewals` endpoint.
 * 
 * The renew operation is performed by sending a PUT request to the `/bookinstances/renew/:id` endpoint. The delete operation is performed by sending a DELETE request to the `/bookinstances/my-reservation/:id` endpoint.
 * 
 * The fetched books and the maximum number of renewals are displayed in a list. Each book is a link that navigates to the detail page for that book.
 * 
 * @module components/IssuedByUser
 */

import React, { useEffect, useState } from "react";
import { ListGroup, Col, Button, Spinner, Badge, Modal } from "react-bootstrap";
import axios from "axios";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {toast} from 'react-toastify';  

const IssuedByUser = ({ byMe, userId = null }) => {
    
    const [books, setBooks] = useState([]);
    const [maxRenewals, setMaxRenewals] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deletingReservationId, setDeletingReservationId] = useState(null);

    useEffect(() => {
        let url = byMe ? "/bookinstances/issued-by-me" : `/bookinstances/user/${userId}`;
        axios
            .get(url)
            .then((response) => {
                setBooks(response.data);
            })
            .catch(() => {
                toast.error("Error fetching issues");
                setBooks([]);
            });

        axios
            .get("/bookinstances/max-renewals")
            .then((response) => {
                setMaxRenewals(response.data.data);
            })
            .catch(() => {
                toast.error("Error fetching maximum renewals");
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

    const handleDeleteReservation = (id, event) => {
        event.preventDefault();
        event.stopPropagation();
        setDeletingReservationId(id);
        setShowDeleteModal(true);
    };

    const handleConfirmDelete = () => {
        setIsLoading(true);
        axios
            .delete(`/bookinstances/my-reservation/${deletingReservationId}`)
            .then(() => {
                toast.success("Reservation Deleted!");
                setIsLoading(false);

                // Re-fetch the books after a successful deletion
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

        setDeletingReservationId(null);
        setShowDeleteModal(false);
    };

    return (
        <Col className='bg-dark-purple text-light pt-4 pb-5 px-5 mb-5 mx-3 rounded-md text-break shadow-md-screen justify-content-center rounded'>
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton className="bg-light nice-border">
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body className="bg-light nice-border">Are you sure you want to delete this reservation?</Modal.Body>
                <Modal.Footer className="bg-light nice-border">
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleConfirmDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
            <h2 className="gradient-text mb-3">Books Issued By {byMe ? "You" : userId}</h2>
            {books.length === 0 ? (
                <p className="lead slab-font fw-bold oscillate">No Books Issued</p>
            ) : (
                <ListGroup>
                    {books.map((book, index) => (
                        <Link to={`/book-instance-detail/${book.InstanceID}`} key={index} style={{"textDecoration": "none"}}>
                            <ListGroup.Item className="bg-dark-purple pt-4 text-light mx-md-5">
                                <h3>{book.book.Title}</h3>
                                <p>Imprint: {book.Imprint}</p>
                                <p>
                                    {book.Status === 'R' ? 
                                        `Reservation expires on: ${book.AvailableBy.split('T')[0]} (Loan by this date)` 
                                    : 
                                        `Due Date: ${book.AvailableBy.split('T')[0]}`}
                                </p>
                                <Badge className={book.Status === 'R' ? 'bg-secondary' : 'bg-medium-dark'}>
                                    {book.Status === 'R' ? 'Reserved' : 'Loaned'}
                                </Badge>
                                {byMe && book.Status === 'L' ? 
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
                                <div>
                                    {byMe && book.Status === 'R' ? 
                                        <Button className="my-2" onClick={(event) => handleDeleteReservation(book.InstanceID, event)}>Delete Reservation</Button>
                                    : ''}
                                </div>
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