/**
 * AddAuthor.js
 * 
 * This is a React component that allows the user to add an author. It includes a form with fields for the author's first name, last name, date of birth, and date of death, and a button to submit the form.
 * 
 * The component uses the useState, useEffect, useSelector, axios, and useNavigate hooks to manage the state, side effects, access the Redux store, HTTP requests, and navigation. It also uses the react-bootstrap library for the UI and the react-toastify library to display notifications.
 * 
 * The first name, last name, date of birth, date of death, and loading state are managed by the state. The form fields are bound to the state and update the state when changed.
 * 
 * The user's role is fetched from the Redux store. If the user's role is not 'S' or 'L', they are redirected to the '/error' page.
 * 
 * When the form is submitted, a POST request is sent to the `/authors` endpoint with the first name, last name, date of birth, and date of death. If the request is successful, a success toast notification is displayed. If the request fails, an error toast notification is displayed.
 * 
 * @module components/AddAuthor
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

const AddAuthor = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [dateOfDeath, setDateOfDeath] = useState("");
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
                `/authors`,
                { 
                    FirstName: firstName, 
                    LastName: lastName, 
                    DateOfBirth: dateOfBirth,
                    ...(dateOfDeath && {DateOfDeath: dateOfDeath})
                }
            );
            if (response.status === 200) {
                toast.success("Author added successfully.");
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
                Add an Author
            </p>
            <Row className="justify-content-center align-items-center my-4">
                <Col md={7} className="p-4 rounded">
                    <Form onSubmit={handleSubmit}>
                        {/* Other form fields... */}
                        <div className="form-floating mb-3">
                            <Form.Control
                                type="text"
                                placeholder="Enter First Name"
                                id="firstName"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="bg-light"
                                style={{ border: "none" }}
                            />
                            <Form.Label htmlFor="firstName" className="ms-2">
                                First Name
                            </Form.Label>
                        </div>
                        <div className="form-floating mb-3">
                            <Form.Control
                                type="text"
                                placeholder="Enter Last Name"
                                id="lastName"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="bg-light"
                                style={{ border: "none" }}
                            />
                            <Form.Label htmlFor="lastName" className="ms-2">
                                Last Name
                            </Form.Label>
                        </div>
                        <div className="form-floating mb-3">
                            <Form.Control
                                type="date"
                                id="dateOfBirth"
                                value={dateOfBirth}
                                onChange={(e) => setDateOfBirth(e.target.value)}
                                className="bg-light"
                                style={{ border: "none" }}
                            />
                            <Form.Label htmlFor="dateOfBirth" className="ms-2">
                                Date of Birth
                            </Form.Label>
                        </div>
                        <div className="form-floating mb-3">
                            <Form.Control
                                type="date"
                                id="dateOfDeath"
                                value={dateOfDeath}
                                onChange={(e) => setDateOfDeath(e.target.value)}
                                className="bg-light"
                                style={{ border: "none" }}
                            />
                            <Form.Label htmlFor="dateOfDeath" className="ms-2">
                                Date of Death (Optional)
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

export default AddAuthor;