/**
 * AllReservations.js
 * 
 * This is a React component that fetches and displays all reservations in a paginated format.
 * 
 * The component uses the useState, useEffect, and useSelector hooks to manage the state, side effects, and access the Redux store. It also uses the axios library to send HTTP requests to the server, the react-toastify library to display notifications, and the useNavigate hook from react-router-dom to navigate to different routes.
 * 
 * The reservations are fetched from the `/reservations?page=${page}` endpoint, with the page number managed by the state.
 * 
 * The fetched reservations are displayed in a grid. Each reservation is a link that navigates to the detail page for that reservation.
 * 
 * The component also includes a Pagination component from the react-bootstrap library to navigate between pages. The previous button decreases the page number, the next button increases the page number, and the current page number is displayed in the middle.
 * 
 * If the user's role is 'U', they are redirected to the '/error' page. If an error occurs while fetching the reservations, a toast notification is displayed.
 * 
 * @module components/AllReservations
 */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Pagination } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AllReservations = () => {
    const [reservations, setReservations] = useState([]);
    const [page, setPage] = useState(1);
    const navigate = useNavigate();
    const userRole = useSelector(state => state.user.Role);

    useEffect(() => {
        if (userRole === 'U') {
            navigate('/error');
        }
    }, [userRole, navigate]);

    useEffect(() => {
        const fetchReservations = async () => {
            try {
                const response = await axios.get(`/reservations?page=${page}`);
                setReservations(response.data);
            } catch (error) {
                toast.error('Something went wrong!');
            }
        };

        fetchReservations();
    }, [page]);

    return (
        <Container className="bg-medium-dark py-2 my-md-5 rounded text-center px-5">
            <Row className="h2 text-center fw-bold slab-font text-primary my-4">
                <h1 className="my-4">All Reservations</h1>
            </Row>
            {reservations.length > 0 ? (
                <Row className='d-flex justify-content-center align-items-center'>
                    {reservations.map((reservation) => (
                        <Col key={reservation.ReservationID} md={10} className='mb-4'>
                            <Link to={`/reservation-detail/${reservation.ReservationID}`} className='general-link'>
                                <div className='bg-dark-purple py-4 py-2 px-2 rounded text-light shadow'>
                                    <h5>{reservation.Title} </h5>
                                    <h6>Reserved by {reservation.first_name} {reservation.last_name}</h6>
                                    <h6>( {reservation.Username} )</h6>
                                    <p>Date of Reservation: {new Date(reservation.DateOfReservation).toLocaleDateString()}</p>
                                </div>
                            </Link>
                        </Col>
                    ))}
                </Row>
            ) : (
                <p className='lead fw-bold text-primary'>No reservations found.</p>
            )}
            <Pagination className="justify-content-center pagination-styles">
                <Pagination.Prev onClick={() => setPage(page > 1 ? page - 1 : 1)} />
                <Pagination.Item>{page}</Pagination.Item>
                <Pagination.Next onClick={() => setPage(page + 1)} disabled={reservations.length === 0} />
            </Pagination>
        </Container>
    );
};

export default AllReservations;