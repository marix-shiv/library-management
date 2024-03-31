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
import { useNavigate, useParams } from "react-router-dom";

const UpdateBookInstance = () => {
    const { id } = useParams();
    const [bookID, setBookID] = useState("");
    const [imprint, setImprint] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBookInstance = async () => {
            const response = await axios.get(`/bookinstances/${id}`);
            setBookID(response.data.BookID);
            setImprint(response.data.Imprint);
        };

        fetchBookInstance();
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        try {
            const response = await axios.put(
                `/bookinstances/${id}`,
                { 
                    BookID: bookID, 
                    Imprint: imprint, 
                }
            );
            if (response.status === 200) {
                toast.success("Book instance updated successfully.");
            } else {
                toast.error("Operation failed. Retry later.");
            }
        } catch (error) {
            toast.error("Operation failed. Check your inputs.");
        } finally {
            setIsLoading(false);
            navigate(`/book-instance-detail/${id}`);
        }
    };

    return (
        <Container className="bg-medium-dark py-2 my-md-5 rounded">
            <p className="h2 text-center fw-bold slab-font text-primary my-4">
                Update a Book Instance
            </p>
            <Row className="justify-content-center align-items-center my-4">
                <Col md={7} className="p-4 rounded">
                    <Form onSubmit={handleSubmit}>
                    <div className="form-floating mb-3">
                        <Form.Control
                            type="text"
                            placeholder="Enter Book ID"
                            id="bookID"
                            value={bookID}
                            onChange={(e) => setBookID(e.target.value)}
                            className="bg-light"
                            style={{ border: "none" }}
                        />
                        <Form.Label htmlFor="bookID" className="ms-2">
                            Book ID
                        </Form.Label>
                    </div>
                    <div className="form-floating mb-3">
                        <Form.Control
                            type="text"
                            placeholder="Enter Imprint"
                            id="imprint"
                            value={imprint}
                            onChange={(e) => setImprint(e.target.value)}
                            className="bg-light"
                            style={{ border: "none" }}
                        />
                        <Form.Label htmlFor="imprint" className="ms-2">
                            Imprint
                        </Form.Label>
                    </div>
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

export default UpdateBookInstance;