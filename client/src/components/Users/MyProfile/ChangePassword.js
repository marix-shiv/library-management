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