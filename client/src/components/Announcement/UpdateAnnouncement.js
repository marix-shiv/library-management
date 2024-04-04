/**
 * UpdateAnnouncement.js
 * 
 * This is a React component that fetches the details of a specific announcement and allows the user to update them.
 * 
 * The component uses the useState hook to manage the state for the announcement details and the loading state.
 * The useEffect hook is used to fetch the announcement from the server when the component mounts.
 * 
 * The announcement is fetched from the `/announcements/:id` endpoint, with the id obtained from the URL parameters.
 * 
 * The fetched announcement details are displayed in a form. The user can update the title, content, and date of the announcement.
 * 
 * When the form is submitted, a PUT request is sent to the `/announcements/:id` endpoint with the updated details. If the update operation is successful, the user is redirected to the detail page for that announcement.
 * 
 * If the user's role is not 'S' or 'A', they are redirected to the '/error' page.
 * 
 * @module components/UpdateAnnouncement
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
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const UpdateAnnouncement = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [date, setDate] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();
    const userRole = useSelector(state => state.user.Role);

    useEffect(() => {
        if (userRole !== 'A' && userRole !== 'S') {
            navigate('/error');
        } else {
            const fetchAnnouncement = async () => {
                setIsLoading(true);
                try {
                    const response = await axios.get(`/announcements/${id}`);
                    const announcement = response.data;
                    setTitle(announcement.Title);
                    setContent(announcement.Content);
                    setDate(announcement.DatePosted.split('T')[0]);
                } catch (error) {
                    toast.error('Something went wrong!');
                } finally {
                    setIsLoading(false);
                }
            };

            fetchAnnouncement();
        }
    }, [id, userRole, navigate]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        try {
            const response = await axios.put(
                `/announcements/${id}`,
                { 
                    Title: title, 
                    Content: content, 
                    DatePosted: date
                }
            );
            if (response.status === 200) {
                toast.success("Announcement updated successfully.");
            } else {
                toast.error("Operation failed. Retry later.");
            }
        } catch (error) {
            toast.error("Operation failed. Check your inputs.");
        } finally {
            setIsLoading(false);
            navigate(`/announcement-detail/${id}`);
        }
    };

    const handleCancel = () => {
        navigate(`/announcement-detail/${id}`);
    };

    return (
        <Container className="bg-medium-dark py-2 my-md-5 rounded">
            <p className="h2 text-center fw-bold slab-font text-primary my-4">
                Update an Announcement
            </p>
            <Row className="justify-content-center align-items-center my-4">
                <Col md={7} className="p-4 rounded">
                    <Form onSubmit={handleSubmit}>
                        <div className="form-floating mb-3">
                            <Form.Control
                                type="text"
                                placeholder="Enter Title"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="bg-light"
                                style={{ border: "none" }}
                            />
                            <Form.Label htmlFor="title" className="ms-2">
                                Title
                            </Form.Label>
                        </div>
                        <div className="form-floating mb-3">
                            <Form.Control
                                as="textarea"
                                placeholder="Enter Content"
                                id="content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="bg-light"
                                style={{ border: "none" }}
                            />
                            <Form.Label htmlFor="content" className="ms-2">
                                Content
                            </Form.Label>
                        </div>
                        <div className="form-floating mb-3">
                            <Form.Control
                                type="date"
                                id="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="bg-light"
                                style={{ border: "none" }}
                            />
                            <Form.Label htmlFor="date" className="ms-2">
                                Date
                            </Form.Label>
                        </div>
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
                                variant="primary"
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

export default UpdateAnnouncement;