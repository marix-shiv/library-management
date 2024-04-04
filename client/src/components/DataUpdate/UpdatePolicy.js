/**
 * UpdatePolicy.js
 * 
 * This is a React component that allows the user to update a policy's details. It includes a form with fields for the policy's property, value, and core status, and buttons to submit the form or cancel the operation.
 * 
 * The component uses the useState, useEffect, useSelector, and axios hooks to manage the state, side effects, access the Redux store, and HTTP requests. It also uses the react-bootstrap library for the UI, the react-router-dom library for navigation, and the react-toastify library to display notifications.
 * 
 * The policy's ID is fetched from the URL parameters. The policy's details are fetched from the `/policies/${id}` endpoint and stored in the state. The form fields are bound to the state and update the state when changed.
 * 
 * When the form is submitted, a PUT request is sent to the `/policies/${id}` endpoint with the updated details. If the operation is successful, a success toast notification is displayed and the user is redirected to the policy's detail page. If the operation fails, an error toast notification is displayed.
 * 
 * The cancel button redirects the user to the policy's detail page without making any changes.
 * 
 * If the user's role is not 'A' or 'S', they are redirected to the '/error' page.
 * 
 * @module components/UpdatePolicy
 */

import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Spinner, ListGroup, ListGroupItem, FormCheck } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { XCircleFill } from "react-bootstrap-icons";
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const UpdatePolicy = () => {
    const [property, setProperty] = useState("");
    const [value, setValue] = useState("");
    const [core, setCore] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedDays, setSelectedDays] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();
    const userRole = useSelector(state => state.user.Role);

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    useEffect(() => {
        if (userRole !== 'A' && userRole !== 'S') {
            navigate('/error');
        } else {
            const fetchPolicy = async () => {
                setIsLoading(true);
                try {
                    const response = await axios.get(`/policies/${id}`);
                    setProperty(response.data.Property);
                    setValue(response.data.Value);
                    setCore(response.data.Core);
                    if (response.data.Property === 'maintenance_days') {
                        setSelectedDays(response.data.Value.split(', '));
                    }
                } catch (error) {
                    toast.error("Failed to fetch data.");
                } finally {
                    setIsLoading(false);
                }
            };

            fetchPolicy();
        }
    }, [id, userRole, navigate]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        const finalValue = property === 'maintenance_days' ? selectedDays.join(', ') : value;
        const requestBody = core === 1 ? { Value: finalValue } : { Property: property, Value: finalValue, Core: core };

        try {    
            const response = await axios.put(`/policies/${id}`, requestBody);
            if (response.status === 200) {
                toast.success("Policy updated successfully.");
            } else {
                toast.error("Operation failed. Retry later.");
            }
        } catch (error) {
            toast.error("Operation failed. Check your inputs.");
        } finally {
            setIsLoading(false);
            navigate(`/policy-detail/${id}`);
        }
    };

    const handleCancel = () => {
        navigate(`/policy-detail/${id}`);
    };

    const handleSelectDay = (e) => {
        const selectedDay = daysOfWeek.find(day => day === e.target.value);
        if (selectedDay && !selectedDays.includes(selectedDay)) {
            setSelectedDays(prevDays => [...prevDays, selectedDay]);
        }
    };
    
    const handleRemoveDay = (dayToRemove) => {
        setSelectedDays(prevDays => prevDays.filter(day => day !== dayToRemove));
    };

    return (
        <Container className="bg-medium-dark py-2 my-md-5 rounded">
            <p className="h2 text-center fw-bold slab-font text-primary my-4">
                Update a Policy
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
                                disabled={core}
                            />
                            <Form.Label htmlFor="property" className="ms-2">
                                Property
                            </Form.Label>
                        </div>
                        {property === 'maintenance_days' ? (
                            <>
                                <div className="form-floating mb-3 bg-medium-dark">
                                    <Form.Select onChange={handleSelectDay} className="bg-light">
                                        <option>Select day</option>
                                        {daysOfWeek.map((day, index) => (
                                            <option key={index} value={day}>
                                                {day}
                                            </option>
                                        ))}
                                    </Form.Select>
                                    <Form.Label className="ms-2">Value</Form.Label>
                                </div>
                                <ListGroup horizontal className="mb-3">
                                    <div className="d-flex flex-wrap mb-3">
                                        {selectedDays.map((day, index) => (
                                            <ListGroupItem key={index} className="bg-light rounded-pill me-2 mb-2">
                                                {day}
                                                <XCircleFill
                                                    onClick={() => handleRemoveDay(day)}
                                                    style={{ cursor: "pointer", marginLeft: "10px", marginTop: "-5px" }}
                                                />
                                            </ListGroupItem>
                                        ))}
                                    </div>
                                </ListGroup>
                            </>
                        ) : (
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
                        )}
                        <FormCheck 
                            type="switch"
                            id="core-switch"
                            label="Core"
                            checked={core}
                            onChange={(e) => setCore(e.target.checked)}
                            disabled={core}
                        />
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

export default UpdatePolicy;