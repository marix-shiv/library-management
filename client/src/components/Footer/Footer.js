/**
 * Footer.js
 * 
 * This is a React component that displays the footer of the application.
 * 
 * The component uses the react-bootstrap library for the UI.
 * 
 * The footer includes a copyright statement and a link to the license. The copyright statement is displayed on the left, and the link to the license is displayed below it.
 * 
 * The footer is styled with padding at the top and a margin at the top to separate it from the rest of the content. The text is aligned to the start (left in left-to-right languages).
 * 
 * @module components/Footer
 */

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
