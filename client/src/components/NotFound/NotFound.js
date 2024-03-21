import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ErrorImage from "../../assets/error.png"; // Replace with your actual image path
import "./NotFound.scss"; // Replace with your actual SCSS file path

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
                </Row>
            </Container>
        </main>
    );
}

export default NotFound;