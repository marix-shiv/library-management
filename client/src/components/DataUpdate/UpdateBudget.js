/**
 * UpdateBudget.js
 * 
 * This is a React component that allows the user to update a budget's details. It includes a form with fields for the budget's money, description, and date, and buttons to submit the form or cancel the operation.
 * 
 * The component uses the useState, useEffect, useSelector, and axios hooks to manage the state, side effects, access the Redux store, and HTTP requests. It also uses the react-bootstrap library for the UI, the react-router-dom library for navigation, and the react-toastify library to display notifications.
 * 
 * The budget's ID is fetched from the URL parameters. The budget's details are fetched from the `/budgets/${id}` endpoint and stored in the state. The form fields are bound to the state and update the state when changed.
 * 
 * When the form is submitted, a PUT request is sent to the `/budgets/${id}` endpoint with the updated details. If the operation is successful, a success toast notification is displayed and the user is redirected to the budget's detail page. If the operation fails, an error toast notification is displayed.
 * 
 * The cancel button redirects the user to the budget's detail page without making any changes.
 * 
 * If the user's role is not 'A' or 'S', they are redirected to the '/error' page.
 * 
 * @module components/UpdateBudget
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
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const UpdateBudget = () => {
    const [money, setMoney] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();
    const userRole = useSelector(state => state.user.Role);

    useEffect(() => {
        if (userRole !== 'A' && userRole !== 'S') {
            navigate('/error');
        } else {
            const fetchBudget = async () => {
                setIsLoading(true);
                try {
                    const response = await axios.get(`/budgets/${id}`);
                    const budget = response.data;
                    setMoney(budget.Money);
                    setDescription(budget.Description);
                    setDate(budget.Date.split('T')[0]);
                } catch (error) {
                    toast.error('Something went wrong!');
                } finally {
                    setIsLoading(false);
                }
            };

            fetchBudget();
        }
    }, [id, userRole, navigate]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        try {
            const response = await axios.put(
                `/budgets/${id}`,
                { 
                    Money: money, 
                    Description: description, 
                    Date: date
                }
            );
            if (response.status === 200) {
                toast.success("Budget updated successfully.");
            } else {
                toast.error("Operation failed. Retry later.");
            }
        } catch (error) {
            toast.error("Operation failed. Check your inputs.");
        } finally {
            setIsLoading(false);
            navigate(`/budget-detail/${id}`);
        }
    };

    const handleCancel = () => {
        navigate(`/budget-detail/${id}`);
    };

    return (
        <Container className="bg-medium-dark py-2 my-md-5 rounded">
            <p className="h2 text-center fw-bold slab-font text-primary my-4">
                Update a Budget
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
                        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                            <Button
                                variant="primary"
                                type="submit"
                                disabled={isLoading}
                                className="text-light rounded-pill fw-bold btn btn-lg my-3 w-100"
                            >
                                {isLoading ? <Spinner animation="border" /> : "Submit"}
                            </Button>
                            <Button
                                variant="primary"
                                onClick={handleCancel}
                                className="text-light rounded-pill fw-bold btn btn-lg my-3 w-100"
                            >
                                Cancel
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default UpdateBudget;