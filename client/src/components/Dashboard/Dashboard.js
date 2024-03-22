import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Dashboard = () => {
    return (
        <Container>
            <Row className="justify-content-center">
                <Col md={6} className="text-center">
                    <h1>Hello, World!</h1>
                </Col>
            </Row>
        </Container>
    );
};

export default Dashboard;