// Import necessary libraries and components
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import "./Login.scss";
import { toast } from "react-toastify";
import LoginImage from "../../assets/login.png";
import { InfoCircleFill, EyeFill, EyeSlashFill } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/userSlice';

// Login component
function Login() {
// State variables
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [passwordVisibility, setPasswordVisibility] = useState(false);
const [isLoading, setIsLoading] = useState(false);
const [errors, setErrors] = useState({});
const navigate = useNavigate();
const dispatch = useDispatch();

// Toggle password visibility
const handlePasswordVisibilityToggle = (event) => {
    event.preventDefault();
    setPasswordVisibility(!passwordVisibility);
};

// Handle form submission
const handleSubmit = async (event) => {
    event.preventDefault();

    try {
    setIsLoading(true);
    const response = await axios.post("/users/login", {
        Username: username,
        Password: password,
    });
    if (response.status === 200) {
        // The request was successful
        const userResponse = await axios.get('/users/my-data');
        dispatch(setUser(userResponse.data.data));
        toast.success("Logged in successfully!", {
        toastId: "loginAccountSuccess",
        });
        navigate("/dashboard");
    } else {
        // The request was not successful
        // Store the error messages from the response in the errors state
        setErrors({ message: response.data.message });
    }
    } catch (error) {
    let errorMessage = "";
    if (error.response) {
        errorMessage = error.response.data;
        console.log(error.response);

        if (error.response.status === 401 || error.response.status === 400) {
        setErrors({ message: ["Invalid Username or Password"] });
        toast.error("Invalid Username or Password");
        }

        else if (Array.isArray(errorMessage.errors)) {
        const errorObject = errorMessage.errors.reduce((acc, curr) => {
            acc[curr.path] = [curr.msg]; // Wrap the error message in an array
            return acc;
        }, {});
        setErrors(errorObject);
        }

        else {
        setErrors({
            message: ["Server side issue, please try again later."],
        });
        toast.error("Invalid Username or Password");
        }
    } else if (error.request) {
        errorMessage = "No response received from server.";
        setErrors({ message: [errorMessage] }); // Wrap the error message in an array
        toast.error("No response received from server.");
    } else {
        setErrors({ message: ["Server side issue, please try again later."] });
        toast.error("Server side issue, please try again later.")
    }
    } finally {
    setIsLoading(false);
    }
};

// Check token on component mount
useEffect(() => {
    const checkToken = async () => {
    try {
        const response = await axios.get("/users/check-token");
        if (response.status === 200) {
        navigate("/dashboard");
        }
    } catch (error) {
        if (error.response && error.response.status === 403) {
        navigate("/dashboard");
        }
    }
    };

    checkToken(); 
}, [navigate]);

// Handle toast on component mount
useEffect(() => {
    if (toast.isActive("createAccountSuccess")) {
    toast.dismiss("createAccountSuccess");
    toast.success("Account created successfully!");
    }
}, []);

// Render component
return (
    <main role="main">
    <Container className="bg-medium-dark py-2 my-md-5 rounded">
        <p className="h2 text-center fw-bold slab-font text-primary my-4">
        Welcome Back to OLMS
        </p>
        <Row className="justify-content-center align-items-center my-4">
        <Col md={7} className="p-4 rounded">
            <Form onSubmit={handleSubmit}>
            {/* Username Input Area */}
            <div className="form-floating mb-3">

                <Form.Control
                type="text"
                placeholder="Enter username"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-light"
                style={{ border: "none" }}
                />

                    <Form.Label htmlFor="username" className="ms-2">
                    Username
                    </Form.Label>

                <InfoCircleFill
                size={40}
                color="#8787ff"
                style={{
                    position: "absolute",
                    top: "50%",
                    right: "10px",
                    transform: "translateY(-50%)",
                }}
                />

            </div>

            {/* Password input area */}
            <div className="form-floating mb-3 position-relative">

                <Form.Control
                type={passwordVisibility ? "text" : "password"}
                placeholder="Password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-light"
                style={{ border: "none" }}
                />

                    <Form.Label htmlFor="password" className="ms-2">
                    Password
                    </Form.Label>

                {/* Eye or slashed eye symbol based on password visibility */}
                {passwordVisibility ? (
                <EyeSlashFill
                    onClick={handlePasswordVisibilityToggle}
                    size={40}
                    color="#8787ff"
                    style={{
                    position: "absolute",
                    top: "50%",
                    right: "10px",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    }}
                />
                ) : (
                <EyeFill
                    onClick={handlePasswordVisibilityToggle}
                    size={40}
                    color="#8787ff"
                    style={{
                    position: "absolute",
                    top: "50%",
                    right: "10px",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    }}
                />
                )}

            </div>

            {/* Submit Button */}
            <div className="d-grid">
                <Button
                variant="primary"
                type="submit"
                disabled={isLoading}
                className="text-light rounded-pill fw-bold btn btn-lg my-3 w-100"
                >
                {isLoading ? <Spinner animation="border" /> : "SUBMIT"}
                </Button>
            </div>

            <p className="text-center">
                Do not have an account? <Link to="/signup">Signup</Link>
            </p>

            </Form>

            {/* Error display in list format */}
            {Object.values(errors).some(Boolean) && (
            <ul className="slab-font error-font-size">
                {Object.values(errors)
                .flat()
                .map((error, index) =>
                    error ? (
                    <li key={index} className="pb-2">
                        {error}
                    </li>
                    ) : (
                    ""
                    )
                )}
            </ul>
            )}
        </Col>

        <Col md={4} className="d-none d-md-block">
            <img
            src={LoginImage}
            alt="Sign Up"
            className="img-fluid ms-1 image-scale"
            />
        </Col>
        
        </Row>
    </Container>
    </main>
);
}

export default Login;
