import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import "./SignUp.scss";
import { useNavigate } from 'react-router-dom';
import { ROLE_MAPPING } from "../../constants/roleConstants";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
InfoCircleFill,
PersonCircle,
EyeFill,
EyeSlashFill,
CheckCircleFill,
XCircleFill,
} from "react-bootstrap-icons";

function Signup() {
const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");
const [dob, setDob] = useState("");
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [passwordVisibility, setPasswordVisibility] = useState(false);
const [role, setRole] = useState("");
const [errors, setErrors] = useState({});
const [isLoading, setIsLoading] = useState(false);
const [isUsernameCheckLoading, setIsUsernameCheckLoading] = useState(false);
const navigate = useNavigate();

useEffect(() => {
    const checkUsername = async () => {
        setIsUsernameCheckLoading(true);
        try {
            await axios.get(`/users/username/${username}`);
            // Username is available
            setErrors((errors) => ({
                ...errors,
                username: "",
            }));
        } catch (error) {
            if (error.response && error.response.status === 409) {
                // Username is already in use
                setErrors((errors) => ({
                    ...errors,
                    username: "Username is already in use.",
                }));
            } else {
                setErrors((errors) => ({
                    ...errors,
                    username: "Invalid username",
                }));
            }
        }
        finally{
            setIsUsernameCheckLoading(false);
        }
    };

    const errorMessage =
        username.length < 5 || username.length > 20
            ? "Username must be between 5 and 20 characters."
            : "";
    if (errors.username !== errorMessage) {
        setErrors((errors) => ({
            ...errors,
            username: errorMessage,
        }));
    }

    if (username.length >= 5 && username.length <= 20) {
        checkUsername();
    }
}, [username]);

useEffect(() => {
    const passwordTest =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*\-_]).{8,64}$/;
    const errorMessage = !passwordTest.test(password)
    ? "Password must be between 8 to 64 characters. Password must contain one lowercase, one uppercase character, one number and one special character."
    : "";
    if (errors.password !== errorMessage) {
    setErrors((errors) => ({
        ...errors,
        password: errorMessage,
    }));
    }
}, [password]);

const handlePasswordVisibilityToggle = (event) => {
    event.preventDefault();
    setPasswordVisibility(!passwordVisibility);
};

const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        setIsLoading(true);
        const response = await axios.post("/users/", {
            first_name: firstName,
            last_name: lastName,
            date_of_birth: dob,
            Username: username,
            Password: password,
            Role: ROLE_MAPPING[role],
        });

        if (response.status === 200) {
            // The request was successful
            toast.success("Account created successfully!", {toastId: "createAccountSuccess"});
            navigate('/login');
        } else {
            // The request was not successful
            // Store the error messages from the response in the errors state
            setErrors({ message: response.data.message });
        }
    }   catch (error) {
    // The request failed
    // Store the error message from the error in the errors state
    let errorMessage = "";
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        errorMessage = error.response.data;
    
        // Check if errorMessage.errors is defined and is an array
        if (Array.isArray(errorMessage.errors)) {
        // Map over the errors array and create a new object
        const errorObject = errorMessage.errors.reduce((acc, curr) => {
            acc[curr.path] = curr.msg;
            return acc;
        }, {});
    
        // Store the new object in the errors state
        setErrors(errorObject);
        } else {
        // errorMessage.errors is not defined or is not an array
        // Store the errorMessage object in the errors state
        setErrors(errorMessage);
        }
    } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in Node.js
        errorMessage = "No response received from server.";
        setErrors({ message: errorMessage });
    } else {
        // Something happened in setting up the request that triggered an Error
        errorMessage = error.message;
        setErrors({ message: errorMessage });
    }
    }
    finally{
        setIsLoading(false);
    }
    
    // ...

};

return (
    <main role="main">
    <Container>
        <Row className="justify-content-center align-items-center my-4">
        <Col md={6} className="p-4 bg-medium-dark rounded">
            <p className="h2 text-center fw-bold slab-font text-primary my-4">
            Join the Library Community
            </p>
            <Form onSubmit={handleSubmit}>
            <div className="form-floating my-3">
                <Form.Control
                type="text"
                placeholder="Enter first name"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="bg-light"
                style={{border: 'none'}}
                />
                <Form.Label htmlFor="firstName" className="ms-2">
                First Name
                </Form.Label>
                <PersonCircle
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

            <div className="form-floating mb-3">
                <Form.Control
                type="text"
                placeholder="Enter last name"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="bg-light"
                style={{border: 'none'}}
                />
                <Form.Label htmlFor="lastName" className="ms-2">
                Last Name
                </Form.Label>
                <PersonCircle
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

            <div className="form-floating mb-3">
                <Form.Control
                type="date"
                id="dob"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="bg-light"
                style={{border: 'none'}}
                />
                <Form.Label htmlFor="dob" className="ms-2">
                Date of Birth
                </Form.Label>
            </div>

            <div className="form-floating mb-3">
                <Form.Control
                type="text"
                placeholder="Enter username"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-light"
                style={{border: 'none'}}
                />
                <Form.Label htmlFor="username" className="ms-2">
                Username
                </Form.Label>
                {username.length === 0 ? (
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
                ) : errors.username ? (
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
                ) : isUsernameCheckLoading ? (
                    <Spinner animation="border"/>
                ) : (
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
                )}
            </div>
            {errors.username ? (
                <p className="text-primary slab-font error-font-size text-start ms-2">
                <InfoCircleFill className="me-2" />
                {errors.username}
                </p>
            ) : (
                ""
            )}

            <div className="form-floating mb-3 position-relative">
                <Form.Control
                type={passwordVisibility ? "text" : "password"}
                placeholder="Password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-light"
                style={{border: 'none'}}
                />
                <Form.Label htmlFor="password" className="ms-2">
                Password
                </Form.Label>
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
            {errors.password ? (
                <p className="text-primary slab-font error-font-size text-start ms-2">
                <InfoCircleFill className="me-2" />
                {errors.password}
                </p>
            ) : (
                ""
            )}

            <div className="form-floating mb-3">
                <Form.Select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="bg-light"
                style={{border: 'none'}}
                >
                <option>Choose...</option>
                <option>Reader</option>
                <option>Librarian</option>
                <option>Library Administrator</option>
                <option>Super Admin</option>
                </Form.Select>
                <Form.Label htmlFor="role" className="ms-2">
                Role
                </Form.Label>
            </div>

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
            </Form>
            {Object.values(errors).some(Boolean) && (
            <ul>
                {Object.values(errors).map((error, index) =>
                error ? <li key={index}>{error}</li> : ""
                )}
            </ul>
            )}
            <p className="text-center mt-3">
            Already have an account? <Link to="/login">Login</Link>
            </p>
        </Col>
        </Row>
    </Container>
    </main>
);
}

export default Signup;
