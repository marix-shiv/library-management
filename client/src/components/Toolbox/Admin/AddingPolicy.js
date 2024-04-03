import React, { useState } from "react";
import {
    Container,
    Row,
    Col,
    Form,
    Button,
    Spinner,
    FormCheck,
    Alert
} from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddingPolicy = () => {
    const [property, setProperty] = useState("");
    const [value, setValue] = useState("");
    const [valueIsInt, setValueIsInt] = useState(false);
    const [core, setCore] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        try {
            const response = await axios.post(
                `/policies`,
                { 
                    Property: property, 
                    Value: value, 
                    ValueIsInt: valueIsInt,
                    Core: core
                }
            );
            if (response.status === 200) {
                toast.success("Policy added successfully.");
                navigate('/all-policies');
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
                Add a Policy
            </p>
            <Row className="justify-content-center align-items-center my-4">
                <Col md={7} className="p-4 rounded">
                    <Form onSubmit={handleSubmit}>
                        <div className="form-floating mb-3">
                            <Form.Control
                                type="text"
                                placeholder="Enter Property"
                                id="property"
                                value={property}
                                onChange={(e) => setProperty(e.target.value)}
                                className="bg-light"
                                style={{ border: "none" }}
                            />
                            <Form.Label htmlFor="property" className="ms-2">
                                Property
                            </Form.Label>
                        </div>
                        <div className="form-floating mb-3">
                            <Form.Control
                                type="text"
                                placeholder="Enter Value"
                                id="value"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                                className="bg-light"
                                style={{ border: "none" }}
                            />
                            <Form.Label htmlFor="value" className="ms-2">
                                Value
                            </Form.Label>
                        </div>
                        <FormCheck 
                            type="switch"
                            id="valueIsInt-switch"
                            label="Value Is Int"
                            checked={valueIsInt}
                            onChange={(e) => setValueIsInt(e.target.checked)}
                        />
                        <FormCheck 
                            type="switch"
                            id="core-switch"
                            label="Core"
                            checked={core}
                            onChange={(e) => setCore(e.target.checked)}
                        />
                        <Alert variant="warning" className="mt-3">
                            Once a property is core, it cannot be deleted or made non-core. Be careful!
                        </Alert>
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

export default AddingPolicy;