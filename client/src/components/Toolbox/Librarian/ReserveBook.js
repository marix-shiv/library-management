import React, { useState, useEffect } from "react";
import {
Container,
Row,
Col,
Form,
Button,
Spinner,
Tab,
Tabs,
} from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { XCircleFill, CheckCircleFill } from "react-bootstrap-icons";
import "./Librarian.scss";

const ReserveBook = () => {
const [username, setUsername] = useState("");
const [userID, setUserID] = useState("");
const [bookID, setbookID] = useState("");
const [isLoading, setIsLoading] = useState(false);
const [isValidUser, setIsValidUser] = useState(null);
const [key, setKey] = useState("UserID");

useEffect(() => {
    const fetchUserID = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`/users/get-id/${username}`);
            setUserID(response.data.message.UserID || ""); // If UserID is undefined, set it to an empty string
            setIsValidUser(true);
        } catch (error) {
            setIsValidUser(false);
            setUserID(''); // Set userID to an empty string, not undefined
        }
        finally {
            setIsLoading(false);
        }
    };

    if (username) {
        fetchUserID();
    }
}, [username]);

const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
    const response = await axios.post(
        `/reservations/`,
        { 
            UserID: userID,
            BookID: bookID,
            DateOfReservation: new Date().toISOString().split('T')[0]
        }
    );
    if (response.status === 200) {
        toast.success("Book reserved successfully.");
    } else {
        toast.error("Operation failed. Retry later.");
    }
    } catch (error) {
    toast.error("Operation failed. Please verify User ID, Instance ID, or user's reservation limit.");
    } finally {
    setIsLoading(false);
    }
};

return (
    <Container className="bg-medium-dark py-2 my-md-5 rounded">
    <p className="h2 text-center fw-bold slab-font text-primary my-4">
        Reserve a Book
    </p>
    <Row className="justify-content-center align-items-center my-4">
        <Col md={7} className="p-4 rounded">
        <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => {
            setKey(k);
            setUsername("");
            setUserID("");
            setbookID("");
            setIsLoading(false);
            setIsValidUser(null);
            }}
            className="mb-3"
        >
        <Tab eventKey="UserID" title="UserID">
            <Form onSubmit={handleSubmit}>
                <div className="form-floating mb-3 position-relative">
                <Form.Control
                    type="text"
                    placeholder="Enter User ID"
                    id="userID"
                    value={userID}
                    onChange={(e) => setUserID(e.target.value)}
                    className="bg-light"
                    style={{ border: "none" }}
                />
                <Form.Label htmlFor="userID" className="ms-2 mb-2">
                    User ID
                </Form.Label>
                </div>

                <div className="form-floating mb-3">
                <Form.Control
                    type="text"
                    placeholder="Enter Book Instance ID"
                    id="bookID"
                    value={bookID}
                    onChange={(e) => setbookID(e.target.value)}
                    className="bg-light"
                    style={{ border: "none" }}
                />
                <Form.Label htmlFor="bookID" className="ms-2">
                    Book Instance ID
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
            </Tab>
            <Tab eventKey="Username" title="Username">
            <Form onSubmit={handleSubmit}>
                <div className="form-floating mb-3 position-relative">
                <Form.Control
                    type="text"
                    placeholder="Enter Username..."
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="bg-light"
                    style={{ border: "none" }}
                />
                <Form.Label htmlFor="username" className="ms-2">
                    Username
                </Form.Label>
                {isValidUser !== null &&
                    (isValidUser ? (
                    <CheckCircleFill
                        size={40}
                        color="green"
                        style={{
                        position: "absolute",
                        top: "50%",
                        right: "10px",
                        transform: "translateY(-50%)",
                        }}
                    />
                    ) : (
                    <XCircleFill
                        size={40}
                        color="red"
                        style={{
                        position: "absolute",
                        top: "50%",
                        right: "10px",
                        transform: "translateY(-50%)",
                        }}
                    />
                    ))}
                </div>

                <div className="form-floating mb-3">
                <Form.Control
                    type="text"
                    placeholder="User ID"
                    id="userID"
                    value={userID}
                    disabled
                    className="bg-light"
                    style={{ border: "none" }}
                />
                <Form.Label htmlFor="userID" className="ms-2">
                    User ID
                </Form.Label>
                </div>

                <div className="form-floating mb-3">
                <Form.Control
                    type="text"
                    placeholder="Enter Book Instance ID"
                    id="bookID"
                    value={bookID}
                    onChange={(e) => setbookID(e.target.value)}
                    className="bg-light"
                    style={{ border: "none" }}
                />
                <Form.Label htmlFor="bookID" className="ms-2">
                    Book Instance ID
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
            </Tab>
        </Tabs>
        </Col>
    </Row>
    </Container>
);
};

export default ReserveBook;
