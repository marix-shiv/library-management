import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Pagination } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const AllReservations = () => {
    const [reservations, setReservations] = useState([]);
    const [page, setPage] = useState(1);

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