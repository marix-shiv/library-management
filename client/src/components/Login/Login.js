import React, { useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./Login.scss";
import { toast } from "react-toastify";

function Login() {
    useEffect(() => {
        if (toast.isActive("createAccountSuccess")) {
          toast.dismiss("createAccountSuccess");
          toast.success("Account created successfully!");
        }
      }, []);
    return (
        <main role="main">
            <Container>
                <p className="h2 text-center fw-bold slab-font text-primary my-4">
                    Welcome Back to OLMS
                </p>
                <Row className="justify-content-center align-items-center my-4">
                    <Col md={6} className="p-4 bg-medium-dark rounded text-center">
                        <Form>
                            <Form.Group className="mb-3">                
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" placeholder="Enter username" />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" />
                            </Form.Group>

                            <Button variant="primary" type="submit" className="rounded-pill">
                                SUBMIT
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </main>
    );
}

export default Login;