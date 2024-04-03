import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import {toast} from 'react-toastify';

const BudgetDetail = () => {
    const [budget, setBudget] = useState({ Description: '', Money: 0, Date: '', Title: '' });
    const [showModal, setShowModal] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBudget = async () => {
            try {
                const response = await axios.get(`/budgets/${id}`);
                console.log(response.data);
                setBudget(response.data);
            } catch (error) {
                toast.error('Something went wrong!');
            }
        };

        fetchBudget();
    }, [id]);

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`/budgets/${id}`);
            if (response.status === 200) {
                toast.success("Budget deleted successfully.");
                navigate('/all-budgets');
            } else {
                toast.error("Operation failed. Retry later.");
            }
        } catch (error) {
            toast.error("Operation failed. Check your inputs.");
        } finally {
            setShowModal(false);
        }
    };

    return (
        <Container className="bg-medium-dark py-2 my-md-5 rounded text-center px-5">
            <Row className="h2 text-center fw-bold slab-font text-primary my-4">
                <h1 className="my-4">{budget.Description}</h1>
                <h4 className="my-4">
                    Date: <span className='text-light'>{budget.Date && format(new Date(budget.Date), 'dd MMMM yyyy')}</span>
                </h4>
                <h4 className="my-4">
                    Money spent: <span className='text-light'>{budget.Money}</span>
                </h4>
                <Row className="d-flex justify-content-center">
                    <Col xs={12} md={4}>
                        <Button variant="primary" className="rounded-pill mb-3 w-100 mb-md-0 btn-lg" onClick={() => navigate(`/update-budget/${id}`)}>Update</Button>
                    </Col>
                    <Col xs={12} md={4}>
                        <Button variant="primary" className="rounded-pill w-100 btn-lg" onClick={() => setShowModal(true)}>Delete</Button>
                    </Col>
                </Row>
            </Row>
    
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton className='bg-light'>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body className='bg-light'>Are you sure you want to delete this budget?</Modal.Body>
                <Modal.Footer className='bg-light'>
                    <Button variant="primary" className='btn btn-lg rounded-pill' onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" className='btn btn-lg rounded-pill' onClick={handleDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default BudgetDetail;