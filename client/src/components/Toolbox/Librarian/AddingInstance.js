/**
 * AddBookInstance.js
 * 
 * This is a React component that allows the user to add a book instance. It includes a form with fields for the book instance's book ID, imprint, and status, and a button to submit the form.
 * 
 * The component uses the useState, useEffect, useSelector, axios, and useNavigate hooks to manage the state, side effects, access the Redux store, HTTP requests, and navigation. It also uses the react-bootstrap library for the UI and the react-toastify library to display notifications.
 * 
 * The book ID, imprint, status, and loading state are managed by the state. The form fields are bound to the state and update the state when changed.
 * 
 * The user's role is fetched from the Redux store. If the user's role is not 'S' or 'L', they are redirected to the '/error' page.
 * 
 * When the form is submitted, a POST request is sent to the `/bookinstances` endpoint with the book ID, imprint, and status. If the request is successful, a success toast notification is displayed. If the request fails, an error toast notification is displayed.
 * 
 * @module components/AddBookInstance
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
import "./Librarian.scss";
import { useNavigate } from "react-router-dom";
import {useSelector} from 'react-redux';

const AddBookInstance = () => {
    const [bookID, setBookID] = useState("");
    const [imprint, setImprint] = useState("");
    const [status, setStatus] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const userRole = useSelector(state => state.user.Role);

    useEffect(() => {
        if (userRole !== 'S' && userRole !== 'L') {
            navigate('/error');
        }
    }, [userRole, navigate]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        try {
            const response = await axios.post(
                `/bookinstances`,
                { 
                    BookID: bookID, 
                    Imprint: imprint, 
                    Status: status
                }
            );
            if (response.status === 200) {
                toast.success("Book instance added successfully.");
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
                Add a Book Instance
            </p>
            <Row className="justify-content-center align-items-center my-4">
                <Col md={7} className="p-4 rounded">
                    <Form onSubmit={handleSubmit}>
                        <div className="form-floating mb-3">
                            <Form.Control
                                type="text"
                                placeholder="Enter Book ID"
                                id="bookID"
                                value={bookID}
                                onChange={(e) => setBookID(e.target.value)}
                                className="bg-light"
                                style={{ border: "none" }}
                            />
                            <Form.Label htmlFor="bookID" className="ms-2">
                                Book ID
                            </Form.Label>
                        </div>
                        <div className="form-floating mb-3">
                            <Form.Control
                                type="text"
                                placeholder="Enter Imprint"
                                id="imprint"
                                value={imprint}
                                onChange={(e) => setImprint(e.target.value)}
                                className="bg-light"
                                style={{ border: "none" }}
                            />
                            <Form.Label htmlFor="imprint" className="ms-2">
                                Imprint
                            </Form.Label>
                        </div>
                        <div className="form-floating mb-3">
                            <Form.Select
                                id="status"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="bg-light"
                            >
                                <option>Select Status</option>
                                <option value="R">Reserved</option>
                                <option value="L">Loaned</option>
                                <option value="M">Maintenance</option>
                                <option value="A">Available</option>
                            </Form.Select>
                            <Form.Label htmlFor="status" className="ms-2">
                                Status
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

export default AddBookInstance;