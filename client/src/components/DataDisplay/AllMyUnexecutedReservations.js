import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Pagination, Button, Badge, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';

const AllMyUnexecutedReservations = () => {
    const [reservations, setReservations] = useState([]);
    const [page, setPage] = useState(1);
    const [userId, setUserId] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deletingReservationId, setDeletingReservationId] = useState(null);

    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const response = await axios.get('/users/get-my-user-id');
                setUserId(response.data.data.UserID);
            } catch (error) {
                toast.error('Something went wrong!');
            }
        };

        fetchUserId();
    }, []);

    useEffect(() => {
        if (!userId) return;

        const fetchReservations = async () => {
            try {
                const response = await axios.get(`/reservations/user/${userId}?page=${page}`);
                console.log(response.data);
                setReservations(response.data);
            } catch (error) {
                toast.error('Something went wrong!');
            }
        };

        fetchReservations();
    }, [userId, page]);

    const handleConfirmDelete = () => {
        axios.delete(`/reservations/${deletingReservationId}`)
            .then(() => {
                toast.success('Reservation deleted successfully!');
                setReservations(reservations.filter(reservation => reservation.ReservationID !== deletingReservationId));
            })
            .catch((error) => {
                console.log(error.message);
                toast.error('Something went wrong while deleting the reservation!');
            });

        setDeletingReservationId(null);
        setShowDeleteModal(false);
    };

    const handleDelete = (id) => {
        setDeletingReservationId(id);
        setShowDeleteModal(true);
    };

    return (
        <Container className="bg-medium-dark py-2 my-md-5 rounded text-center px-5">
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this reservation?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleConfirmDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
            <Row className="h2 text-center fw-bold slab-font text-primary my-4">
                <h1 className="my-4">My Unexecuted Reservations</h1>
            </Row>
            {reservations.length > 0 ? (
                <Row className='d-flex justify-content-center align-items-center'>
                    {reservations.map((reservation) => (
                        <Col key={reservation.ReservationID} md={10} className='mb-4'>
                            <div className='bg-dark-purple py-4 py-2 px-2 rounded text-light shadow'>
                                <Badge bg="primary my-2">Unexecuted</Badge>
                                <h5>{reservation.Title}</h5>
                                <h6>Reserved by {reservation.first_name} {reservation.last_name}</h6>
                                <h6>( {reservation.Username} )</h6>
                                <p>Date of Reservation: {new Date(reservation.DateOfReservation).toLocaleDateString()}</p>
                                <Button variant="primary" className='btn btn-lg rounded-pill' onClick={() => handleDelete(reservation.ReservationID)}>
                                    Delete
                                </Button>
                            </div>
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

export default AllMyUnexecutedReservations;