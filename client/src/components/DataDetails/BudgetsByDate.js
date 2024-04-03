import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import {toast} from 'react-toastify';
import {Link} from 'react-router-dom';

const BudgetsByDate = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [budgets, setBudgets] = useState([]);

    useEffect(() => {
        setBudgets([]);
    }, [startDate, endDate]);

    const fetchBudgets = async () => {
        if (startDate && endDate) {
            try {
                const response = await axios.get(`/budgets/date/${startDate.split('T')[0]}/${endDate.split('T')[0]}`);
                setBudgets(response.data);
                if(response.data.length === 0){
                    toast.info("No budget found!")
                }
            } catch (error) {
                toast.error('Something went wrong!');
            }
        }
    };

    return (
        <Container className="bg-medium-dark py-2 my-md-5 rounded text-center px-5">
            <Row className="h2 text-center fw-bold slab-font text-primary my-4">
                <h1 className="my-4">Budgets by Date</h1>
            </Row>
            <Row>
                <Col md={6}>
                    <div className="form-floating mb-3">
                        <Form.Control
                            type="date"
                            id="start-date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="bg-light"
                            style={{border: 'none'}}
                        />
                        <Form.Label htmlFor="start-date" className="ms-2">
                            Start Date
                        </Form.Label>
                    </div>
                </Col>
                <Col md={6}>
                    <div className="form-floating mb-3">
                        <Form.Control
                            type="date"
                            id="end-date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            className="bg-light"
                            style={{border: 'none'}}
                        />
                        <Form.Label htmlFor="end-date" className="ms-2">
                            End Date
                        </Form.Label>
                    </div>
                </Col>
            </Row>
            <Button onClick={fetchBudgets} variant="primary" className="my-3 rounded-pill btn-lg">
                Search
            </Button>
            {startDate && endDate ? (
                budgets.length > 0 ? (
                    <Row className='align-items-center'>
                        {budgets.map((budget) => (
                            <Col key={budget.BudgetID} md={6}>
                                <Link to={`/budget-detail/${budget.BudgetID}`} className='general-link'>
                                    <h5 className='bg-dark-purple py-3 px-2 rounded-pill text-light shadow'>
                                        {budget.Description} <br /> {budget.Money}
                                    </h5>
                                </Link>
                            </Col>
                        ))}
                    </Row>
                ) : (
                   ''
                )
            ) : (
                <p className='lead fw-bold text-primary'>Please enter start and end date.</p>
            )}
        </Container>
    );
};

export default BudgetsByDate;