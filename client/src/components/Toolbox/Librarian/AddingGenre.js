/**
 * AddGenre.js
 * 
 * This is a React component that allows the user to add a genre. It includes a form with a field for the genre's name, and a button to submit the form.
 * 
 * The component uses the useState, useEffect, useSelector, axios, and useNavigate hooks to manage the state, side effects, access the Redux store, HTTP requests, and navigation. It also uses the react-bootstrap library for the UI and the react-toastify library to display notifications.
 * 
 * The name, loading state, and genre presence are managed by the state. The form field is bound to the state and updates the state when changed.
 * 
 * The user's role is fetched from the Redux store. If the user's role is not 'S' or 'L', they are redirected to the '/error' page.
 * 
 * The genre presence is checked by sending a GET request to the `/genres/check-genre-presence/${name}` endpoint when the name changes. If the genre is present, the genre presence is set to 2. If the genre is not present, the genre presence is set to 1.
 * 
 * When the form is submitted, a POST request is sent to the `/genres` endpoint with the name. If the request is successful, a success toast notification is displayed. If the request fails, an error toast notification is displayed.
 * 
 * @module components/AddGenre
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
import { XCircleFill, CheckCircleFill } from "react-bootstrap-icons";
import "./Librarian.scss";
import { useNavigate } from "react-router-dom";
import {useSelector} from 'react-redux';

const AddGenre = () => {
    const [name, setName] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isGenrePresent, setIsGenrePresent] = useState(0);
    const navigate = useNavigate();

    const userRole = useSelector(state => state.user.Role);

    useEffect(() => {
        if (userRole !== 'S' && userRole !== 'L') {
            navigate('/error');
        }
    }, [userRole, navigate]);

    useEffect(() => {
        const checkGenrePresence = async () => {
            setIsLoading(true);
            try {
                await axios.get(`/genres/check-genre-presence/${name}`);
                setIsGenrePresent(2);
            } catch (error) {
                setIsGenrePresent(1);
            } finally {
                setIsLoading(false);
            }
        };

        if (name) {
            checkGenrePresence();
        }
        else{
            setIsGenrePresent(0);
        }
    }, [name]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        try {
            const response = await axios.post(
                `/genres`,
                { Name: name }
            );
            if (response.status === 200) {
                toast.success("Genre added successfully.");
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
                Add a Genre
            </p>
            <Row className="justify-content-center align-items-center my-4">
                <Col md={7} className="p-4 rounded">
                    <Form onSubmit={handleSubmit}>
                        <div className="form-floating mb-3 position-relative">
                            <Form.Control
                                type="text"
                                placeholder="Enter Genre Name"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="bg-light"
                                style={{ border: "none" }}
                            />
                            <Form.Label htmlFor="name" className="ms-2">
                                Genre Name
                            </Form.Label>
                            {isGenrePresent !== 0 &&
                                (isGenrePresent === 1 ? (
                                    <XCircleFill
                                        size={40}
                                        color="red"
                                        style={{
                                            position: "absolute",
                                            top: "50%",
                                            right: "10px",
                                            transform: "translateY(-50%)",
                                        }}
                                    />
                                ) : (
                                    <CheckCircleFill
                                        size={40}
                                        color="green"
                                        style={{
                                            position: "absolute",
                                            top: "50%",
                                            right: "10px",
                                            transform: "translateY(-50%)",
                                        }}
                                    />
                                ))}
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

export default AddGenre;