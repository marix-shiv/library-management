/**
 * ReservationDetail.js
 * 
 * This is a React component that fetches and displays the details of a specific reservation. It allows the user to delete or issue the reservation.
 * 
 * The component uses the useState, useEffect, and useSelector hooks to manage the state, side effects, and access the Redux store. It also uses the useParams and useNavigate hooks from react-router-dom to get the id from the URL parameters and navigate to different routes.
 * 
 * The reservation is fetched from the `/reservations/:id` endpoint, with the id obtained from the URL parameters.
 * 
 * The fetched reservation details are displayed in a detailed view. The user can delete or issue the reservation.
 * 
 * The delete operation is performed by sending a DELETE request to the `/reservations/:id` endpoint. If the delete operation is successful, the user is redirected to the '/all-reservations' page. The issue operation is performed by navigating to the '/issue-book' route with the user ID and book instance ID passed in the state.
 * 
 * If the user's role is 'U', they are redirected to the '/error' page.
 * 
 * @module components/ReservationDetail
 */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import {format} from 'date-fns';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const ReservationDetail = () => {
    const [reservation, setReservation] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    const userRole = useSelector(state => state.user.Role);

    useEffect(() => {
        if (userRole === 'U') {
            navigate('/error');
        }
    }, [userRole, navigate]);

    useEffect(() => {
        const fetchReservation = async () => {
            try {
                const response = await axios.get(`/reservations/${id}`);
                setReservation(response.data);
            } catch (error) {
                toast.error('Something went wrong!');
            }
        };

        fetchReservation();
    }, [id]);

    const handleDelete = () => {
        setShowModal(true);
    };

    const confirmDelete = async() => {
        await axios.delete(`/reservations/${id}`);
        setShowModal(false);
        navigate('/all-reservations');
    }

    const handleClose = () => {
        setShowModal(false);
    };

    const handleIssue = () => {
        navigate('/issue-book', {
            state: {
                userID: reservation.UserID,
                bookInstanceID: reservation.BookID
            }
        })
    }

    return (
        <Container className="bg-medium-dark pt-2 pb-5 my-md-5 rounded text-center px-5">
            <Modal show={showModal} onHide={handleClose} centered className=" text-center rounded px-5">
                <Modal.Header closeButton className="justify-content-center bg-medium-dark">
                    <Modal.Title className="h2 text-center fw-bold slab-font text-light my-3">Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body className="slab-font lead text-light bg-medium-dark">Are you sure you want to delete this reservation?</Modal.Body>
                <Modal.Footer className="justify-content-around d-flex align-items-center bg-medium-dark">
                    <Button variant="primary" onClick={handleClose} className="btn btn-lg bg-dark-purple py-3 text-center rounded-pill text-light shadow">
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={confirmDelete} className="btn btn-lg bg-dark-purple py-3 text-center rounded-pill text-light shadow">
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
            <Row className="h2 text-center fw-bold slab-font text-primary my-3">
                <h1 className="my-4">Reservation Details</h1>
                <h5><strong>Title:</strong> <span className='text-light'>{reservation.Title}</span></h5>
                <p className='slab-font lead'><strong>Reserved by:</strong> <span className='text-light'>{reservation.first_name} {reservation.last_name} ({reservation.Username})</span></p>
                <small><strong>Date of Reservation:</strong> <span className='text-light'>{reservation.DateOfReservation ? format(new Date(reservation.DateOfReservation), 'dd MMMM yyyy') : ''}</span></small>
            </Row>
            <Row className="justify-content-center d-flex align-items-center">
                <Col xs={6} md={4}>
                    <Button className="btn btn-lg bg-dark-purple py-3 px-md-5 text-center rounded-pill text-light shadow my-2 my-5" onClick={handleDelete}>Delete</Button>
                </Col>
                <Col xs={6} md={4}>
                    <Button className="btn btn-lg bg-dark-purple py-3 px-md-5 text-center rounded-pill text-light shadow my-2 my-5" onClick={handleIssue}>Issue</Button>
                </Col>
            </Row>
        </Container>
    );
};

export default ReservationDetail;