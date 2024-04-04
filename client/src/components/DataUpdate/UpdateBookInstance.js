/**
 * UpdateBookInstance.js
 * 
 * This is a React component that allows the user to update a book instance's details. It includes a form with fields for the book instance's book ID and imprint, and a button to submit the form.
 * 
 * The component uses the useState, useEffect, useSelector, and axios hooks to manage the state, side effects, access the Redux store, and HTTP requests. It also uses the react-bootstrap library for the UI, the react-router-dom library for navigation, and the react-toastify library to display notifications.
 * 
 * The book instance's ID is fetched from the URL parameters. The book instance's details are fetched from the `/bookinstances/${id}` endpoint and stored in the state. The form fields are bound to the state and update the state when changed.
 * 
 * When the form is submitted, a PUT request is sent to the `/bookinstances/${id}` endpoint with the updated details. If the operation is successful, a success toast notification is displayed and the user is redirected to the book instance's detail page. If the operation fails, an error toast notification is displayed.
 * 
 * If the user's role is not 'L' or 'S', they are redirected to the '/error' page.
 * 
 * @module components/UpdateBookInstance
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
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from 'react-redux';

const UpdateBookInstance = () => {
    const { id } = useParams();
    const [bookID, setBookID] = useState("");
    const [imprint, setImprint] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const userRole = useSelector(state => state.user.Role);

    useEffect(() => {
        if (userRole !== 'L' && userRole !== 'S') {
            navigate('/error');
        } else {
            const fetchBookInstance = async () => {
                const response = await axios.get(`/bookinstances/${id}`);
                setBookID(response.data.BookID);
                setImprint(response.data.Imprint);
            };

            fetchBookInstance();
        }
    }, [id, userRole, navigate]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        try {
            const response = await axios.put(
                `/bookinstances/${id}`,
                { 
                    BookID: bookID, 
                    Imprint: imprint, 
                }
            );
            if (response.status === 200) {
                toast.success("Book instance updated successfully.");
            } else {
                toast.error("Operation failed. Retry later.");
            }
        } catch (error) {
            toast.error("Operation failed. Check your inputs.");
        } finally {
            setIsLoading(false);
            navigate(`/book-instance-detail/${id}`);
        }
    };

    return (
        <Container className="bg-medium-dark py-2 my-md-5 rounded">
            <p className="h2 text-center fw-bold slab-font text-primary my-4">
                Update a Book Instance
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

export default UpdateBookInstance;