import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, Badge, Modal } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';
import { useSelector } from 'react-redux';

const PolicyDetails = () => {
    const [policy, setPolicy] = useState({ Property: '', Value: '', Core: false });
    const [showModal, setShowModal] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();
    const userRole = useSelector(state => state.user.Role);

    useEffect(() => {
        const fetchPolicy = async () => {
            try {
                const response = await axios.get(`/policies/${id}`);
                console.log(response.data);
                setPolicy(response.data);
            } catch (error) {
                toast.error('Something went wrong!');
            }
        };

        fetchPolicy();
    }, [id]);

    const handleDelete = () => {
        if (policy.Core) {
            toast.info('Cannot delete core policy.');
        } else {
            setShowModal(true);
        }
    };

    const confirmDelete = async () => {
        try {
            const response = await axios.delete(`/policies/${id}`);
            if (response.status === 200) {
                toast.success("Policy deleted successfully.");
                navigate('/all-policies');
            } else {
                toast.error("Operation failed. Retry later.");
            }
        } catch (error) {
            toast.error("Operation failed. Check your inputs.");
        }
    };

    return (
        <Container className="bg-medium-dark py-2 my-md-5 rounded text-center px-5">
            <Row className="h2 text-center fw-bold slab-font text-primary my-4">
                <h1 className="my-4">{policy.Property}{policy.Core === 1 && <Badge bg="primary" className="ms-2 text-light">Core</Badge>}</h1>
                <h2 className="my-4">
                    Value: {policy.Value}
                </h2>
            </Row>
            {(userRole === 'A' || userRole === 'S') && (
                <Row className="justify-content-center d-flex align-items-center">
                    <Col xs={6} md={4}>
                        <Button className="btn btn-lg bg-dark-purple py-3 px-md-5 text-center rounded-pill text-light shadow my-2 my-5" onClick={handleDelete}>Delete</Button>
                    </Col>
                    <Col xs={6} md={4}>
                        <Button className="btn btn-lg bg-dark-purple py-3 px-md-5 text-center rounded-pill text-light shadow my-2 my-5" onClick={() => navigate(`/update-policy/${id}`)}>Update</Button>
                    </Col>
                </Row>
            )}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this policy?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={confirmDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default PolicyDetails;