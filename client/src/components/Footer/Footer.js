import React from "react";
import { Container, Row, Col } from "react-bootstrap";

// Footer component
function Footer() {
return (
    <footer className="pt-2 mt-1" role="contentinfo">
    <Container>
        <Row>
        <Col className="text-start">
            {/* Copyright statement */}
            <p className="slab-font">© 2024 Online Library Management System</p>
            {/* Link to the license */}
            <p className="slab-font">
            <a
                href="https://github.com/PriyanshDimri/library-management/blob/main/LICENSE"
                className="text-medium-dark"
            >
                License
            </a>
            </p>
        </Col>
        </Row>
    </Container>
    </footer>
);
}

export default Footer;
