/**
 * AddBudget.js
 * 
 * This is a React component that allows the user to add a budget. It includes a form with fields for the budget's money, description, and date, and a button to submit the form.
 * 
 * The component uses the useState, useEffect, useSelector, axios, and useNavigate hooks to manage the state, side effects, access the Redux store, HTTP requests, and navigation. It also uses the react-bootstrap library for the UI and the react-toastify library to display notifications.
 * 
 * The money, description, date, and loading state are managed by the state. The form fields are bound to the state and update the state when changed.
 * 
 * The user's role is fetched from the Redux store. If the user's role is not 'S' or 'A', they are redirected to the '/error' page.
 * 
 * When the form is submitted, a POST request is sent to the `/budgets` endpoint with the money, description, and date. If the request is successful, a success toast notification is displayed. If the request fails, an error toast notification is displayed.
 * 
 * @module components/AddBudget
 */

import React, { useState, useEffect } from "react";
import {
    Container,
    Row,
    Col,
    Form,
    Button,
    Spinner,
} from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import {useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';

const AddBudget = () => {
    const [money, setMoney] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const userRole = useSelector(state => state.user.Role);

    useEffect(() => {
        if (userRole !== 'S' && userRole !== 'A') {
            navigate('/error');
        }
    }, [userRole, navigate]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        try {
            const response = await axios.post(
                `/budgets`,
                { 
                    Money: money, 
                    Description: description, 
                    Date: date
                }
            );
            if (response.status === 200) {
                toast.success("Budget added successfully.");
            } else {
                toast.error("Operation failed. Retry later.");
            }
        } catch (error) {
            toast.error("Operation failed. Check your inputs.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container className="bg-medium-dark py-2 my-md-5 rounded">
            <p className="h2 text-center fw-bold slab-font text-primary my-4">
                Add a Budget
            </p>
            <Row className="justify-content-center align-items-center my-4">
                <Col md={7} className="p-4 rounded">
                    <Form onSubmit={handleSubmit}>
                        <div className="form-floating mb-3">
                            <Form.Control
                                type="number"
                                placeholder="Enter Money"
                                id="money"
                                value={money}
                                onChange={(e) => setMoney(e.target.value)}
                                className="bg-light"
                                style={{ border: "none" }}
                            />
                            <Form.Label htmlFor="money" className="ms-2">
                                Money
                            </Form.Label>
                        </div>
                        <div className="form-floating mb-3">
                            <Form.Control
                                type="text"
                                placeholder="Enter Description"
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="bg-light"
                                style={{ border: "none" }}
                            />
                            <Form.Label htmlFor="description" className="ms-2">
                                Description
                            </Form.Label>
                        </div>
                        <div className="form-floating mb-3">
                            <Form.Control
                                type="date"
                                id="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="bg-light"
                                style={{ border: "none" }}
                            />
                            <Form.Label htmlFor="date" className="ms-2">
                                Date
                            </Form.Label>
                        </div>
                        <div className="d-grid">
                            <Button
                                variant="primary"
                                type="submit"
                                disabled={isLoading}
                                className="text-light rounded-pill fw-bold btn btn-lg my-3 w-100"
                            >
                                {isLoading ? <Spinner animation="border" /> : "Submit"}
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default AddBudget;