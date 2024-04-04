/**
 * NotFound.js
 * 
 * This is a React component that displays a 404 page not found error. It includes a message, an image, and buttons to go to the login page or home page.
 * 
 * The component uses the react-bootstrap library for the UI and the react-router-dom library for navigation.
 * 
 * The message is displayed in a text center with a large font size and bold font weight. The image is displayed below the message and is centered. The buttons are displayed below the image and are full width, large, rounded, and bold.
 * 
 * The go to login page button navigates to the login page when clicked. The go to home page button navigates to the home page when clicked.
 * 
 * The component is styled with custom CSS classes. The message is styled with a primary color, the image is styled with a wave animation, and the buttons are styled with a primary color and light text.
 * 
 * @module components/NotFound
 */

import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import ErrorImage from "../../assets/error.png"; // Replace with your actual image path
import "./NotFound.scss";

function NotFound() {
    return (
        <main role="main">
            <Container>
                <Row className="justify-content-center align-items-center">
                    <Col md={12} className="p-1 text-center">
                        <p className="h1 fw-bold slab-font text-primary text-center">
                            404
                        </p>
                        <p className="h2 fw-bold slab-font text-primary text-center">
                            Oops, page not found!
                        </p>
                        <small className="text-center">
                            The page you are looking for does not exist.
                        </small>
                    </Col>
                    <Col md={2} className="d-flex justify-content-center">
                        <img
                            src={ErrorImage}
                            alt="Page not found"
                            className="image-wave"
                        />
                    </Col>
                    <Row className="justify-content-center gap-2">
                        <Col md={4}>
                            <Link to="/login">
                                <Button
                                    variant="primary"
                                    className="text-light rounded-pill fw-bold btn btn-lg my-3 w-100"
                                >
                                    GO TO LOGIN PAGE
                                </Button>
                            </Link>
                        </Col>
                        <Col md={4}>
                            <Link to="/">
                                <Button
                                    variant="primary"
                                    className="text-light rounded-pill fw-bold btn btn-lg my-3 w-100"
                                >
                                    GO TO HOME PAGE
                                </Button>
                            </Link>
                        </Col>
                    </Row>
                </Row>
            </Container>
        </main>
    );
}

export default NotFound;