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
                            The page you're looking for doesn't exist.
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