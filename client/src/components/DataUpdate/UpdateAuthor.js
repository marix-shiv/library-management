/**
 * UpdateAuthor.js
 * 
 * This is a React component that allows the user to update an author's details. It includes a form with fields for the author's first name, last name, date of birth, and date of death, and buttons to submit the form or cancel the operation.
 * 
 * The component uses the useState, useEffect, useSelector, and axios hooks to manage the state, side effects, access the Redux store, and HTTP requests. It also uses the react-bootstrap library for the UI, the react-router-dom library for navigation, and the react-toastify library to display notifications.
 * 
 * The author's ID is fetched from the URL parameters. The author's details are fetched from the `/authors/${id}` endpoint and stored in the state. The form fields are bound to the state and update the state when changed.
 * 
 * When the form is submitted, a PUT request is sent to the `/authors/${id}` endpoint with the updated details. If the operation is successful, a success toast notification is displayed and the user is redirected to the author's detail page. If the operation fails, an error toast notification is displayed.
 * 
 * The cancel button redirects the user to the author's detail page without making any changes.
 * 
 * If the user's role is not 'L' or 'S', they are redirected to the '/error' page.
 * 
 * @module components/UpdateAuthor
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

const UpdateAuthor = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [dateOfDeath, setDateOfDeath] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();
    const userRole = useSelector(state => state.user.Role);

    useEffect(() => {
        if (userRole !== 'L' && userRole !== 'S') {
            navigate('/error');
        } else {
            const fetchAuthor = async () => {
                setIsLoading(true);
                try {
                    const response = await axios.get(`/authors/${id}`);
                    const author = response.data;
                    setFirstName(author.FirstName);
                    setLastName(author.LastName);
                    setDateOfBirth(author.DateOfBirth.split('T')[0]);
                    setDateOfDeath(author.DateOfDeath.split('T')[0] || "");
                } catch (error) {
                    toast.error('Something went wrong!');
                } finally {
                    setIsLoading(false);
                }
            };

            fetchAuthor();
        }
    }, [id, userRole, navigate]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        try {
            const response = await axios.put(
                `/authors/${id}`,
                { 
                    FirstName: firstName, 
                    LastName: lastName, 
                    DateOfBirth: dateOfBirth,
                    ...(dateOfDeath && {DateOfDeath: dateOfDeath})
                }
            );
            if (response.status === 200) {
                toast.success("Author updated successfully.");
            } else {
                toast.error("Operation failed. Retry later.");
            }
        } catch (error) {
            toast.error("Operation failed. Check your inputs.");
        } finally {
            setIsLoading(false);
            navigate(`/author-detail/${id}`);
        }
    };

    const handleCancel = () => {
        navigate(`/author-detail/${id}`);
    };

    return (
        <Container className="bg-medium-dark py-2 my-md-5 rounded">
            <p className="h2 text-center fw-bold slab-font text-primary my-4">
                Update an Author
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
                                variant="secondary"
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

export default UpdateAuthor;