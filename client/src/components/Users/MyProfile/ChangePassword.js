/**
 * ChangePassword.js
 * 
 * This is a React component that allows the user to change their password. It includes a form with a field for the new password, a button to submit the form, and an eye or slashed eye symbol to toggle the password visibility.
 * 
 * The component uses the useState, useEffect, axios, useParams, and react-bootstrap hooks to manage the state, side effects, HTTP requests, parameters, and UI. It also uses the react-toastify library to display notifications.
 * 
 * The password, password visibility, loading state, and errors are managed by the state. The form field is bound to the state and updates the state when changed. The password visibility is toggled when the eye or slashed eye symbol is clicked.
 * 
 * The id is fetched from the parameters.
 * 
 * The handlePasswordVisibilityToggle function is used to handle the toggling of the password visibility. The password visibility is toggled when the eye or slashed eye symbol is clicked.
 * 
 * The handleSubmit function is used to handle the submission of the form. A PUT request is sent to the `/users/${id}/password` endpoint with the new password. If the request is successful, a success toast notification is displayed. If the request fails, an error toast notification is displayed.
 * 
 * The useEffect hook is used to validate the password. The password is validated by checking its length and complexity. If the password is invalid, an error message is stored in the state.
 * 
 * @module components/ChangePassword
 */

import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import axios from 'axios';
import { EyeFill, EyeSlashFill, InfoCircleFill } from 'react-bootstrap-icons';
import { useParams } from 'react-router-dom';

const ChangePassword = () => {
    const [password, setPassword] = useState('');
    const [passwordVisibility, setPasswordVisibility] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const { id } = useParams();

    const handlePasswordVisibilityToggle = (event) => {
        event.preventDefault();
        setPasswordVisibility(!passwordVisibility);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            const response = await axios.put(`/users/${id}/password`, { Password: password });
            if (response.status === 200) {
                toast.success('Password changed successfully!');
            } else {
                toast.error('Something went wrong while changing the password!');
            }
        } catch (error) {
            toast.error('Something went wrong while changing the password!');
        } finally {
            setIsLoading(false);
        }
    };

    // Validate password
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

    return (
        <Container className="bg-medium-dark py-2 my-md-5 rounded text-center px-5">
            <p className='slab-font display-5 my-4 fw-bold text-primary'>Change Password</p>
            <Form onSubmit={handleSubmit}>
                <div className="form-floating mb-3 position-relative">
                    <Form.Control
                        type={passwordVisibility ? 'text' : 'password'}
                        placeholder="New Password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-light"
                        style={{border: 'none'}}
                    />
                    <Form.Label htmlFor="password" className="ms-2">
                        New Password
                    </Form.Label>
                    {passwordVisibility ? (
                        <EyeSlashFill
                            onClick={handlePasswordVisibilityToggle}
                            size={40}
                            color="#8787ff"
                            style={{
                                position: 'absolute',
                                top: '50%',
                                right: '10px',
                                transform: 'translateY(-50%)',
                                cursor: 'pointer',
                            }}
                        />
                    ) : (
                        <EyeFill
                            onClick={handlePasswordVisibilityToggle}
                            size={40}
                            color="#8787ff"
                            style={{
                                position: 'absolute',
                                top: '50%',
                                right: '10px',
                                transform: 'translateY(-50%)',
                                cursor: 'pointer',
                            }}
                        />
                    )}
                </div>
                {/* Display error in password */}
                {errors.password ? (
                    <p className="text-primary slab-font error-font-size text-start ms-2">
                    <InfoCircleFill className="me-2" />
                    {errors.password}
                    </p>
                ) : (
                    ""
                )}
                <div className="d-grid">
                    <Button
                        variant="primary"
                        type="submit"
                        disabled={isLoading}
                        className="text-light rounded-pill fw-bold btn btn-lg my-3 w-100"
                    >
                        {isLoading ? <Spinner animation="border" /> : 'Change Password'}
                    </Button>
                </div>
            </Form>
        </Container>
    );
};

export default ChangePassword;