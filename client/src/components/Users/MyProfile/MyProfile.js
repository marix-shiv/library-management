import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import axios from 'axios';
import { format } from 'date-fns';
import {REVERSE_ROLE_MAPPING} from '../../../constants/roleConstants';
import { PencilSquare, InfoCircleFill, XCircleFill, CheckCircleFill } from 'react-bootstrap-icons';
import { useSelector, useDispatch } from 'react-redux';
import { setUser as setReduxUser } from '../../../redux/userSlice';
import MyProfileImage from '../../../assets/my-profile.png';

const MyProfile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const usernameFromStore = useSelector(state=>state.user.Username);
    const [user, setUser] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [username, setUsername] = useState(usernameFromStore || '');
    const [errors, setErrors] = useState({});
    const [isUsernameCheckLoading, setIsUsernameCheckLoading] = useState(false);
    const originalUser = useRef(user);
    const originalUsername = useRef(username);

    useEffect(() => {
        originalUser.current = user;
    }, []);

    useEffect(() => {
        originalUsername.current = username;
    }, []);

    useEffect(() => {
        axios.get('users/get-my-user-id/')
        .then(response => {
            if (response.data.data && response.data.data.UserID) {
                axios.get(`/users/${response.data.data.UserID}`)
                    .then(res => {
                        if (res.data) {
                            res.data.date_of_birth = res.data.date_of_birth.split('T')[0];
                            setUser(res.data);
                            setUsername(res.data.Username);
                            // Set originalUser.current and originalUsername.current to the fetched user data and username
                            originalUser.current = res.data;
                            originalUsername.current = res.data.Username;
                        }
                    })
                    .catch(() => {
                        toast.error('Something went wrong while fetching user data!');
                    });
            }
        })
        .catch(() => {
            toast.error('Something went wrong while fetching user ID!');
        });
    }, []);

    useEffect(() => {
        // Check if the username is valid and available
        if (username) {
            if(username === usernameFromStore){
                setErrors({ username: null });
                setIsUsernameCheckLoading(false);
            }
            else{
                setIsUsernameCheckLoading(true);
                // Make a request to check the username
                axios.get(`/users/username/${username}`)
                    .then(() => {
                        setErrors({ username: null });
                        setIsUsernameCheckLoading(false);
                    })
                    .catch(() => {
                        setErrors({ username: 'This username is already taken' })
                        setIsUsernameCheckLoading(false);
                    });
            }
        }
    }, [username, usernameFromStore]);

    const handleEditClick = () => {
        if (isEditing) {
            // If the form is currently in edit mode, revert the form data back to the original data
            setUser(originalUser.current);
            setUsername(originalUsername.current);
        }
        setIsEditing(!isEditing);
    };

    const handleInputChange = (event) => {
        if (event.target.name === 'Username') {
            setUsername(event.target.value);
        }
        setUser((prevUser) => ({
            ...prevUser,
            [event.target.name]: event.target.value,
        }));
    };

    const handleSaveClick = () => {
        setIsLoading(true);
        user.date_of_birth.split('T')[0];

        const updatedUser = {
            Username: user.Username,
            date_of_birth: user.date_of_birth,
            first_name: user.first_name,
            last_name: user.last_name,
        };
        // Save the updated user data
        axios.put(`/users/${user.UserID}`, updatedUser)
            .then(() => {
                toast.success('User data updated successfully!');
                dispatch(setReduxUser(user));
                setIsLoading(false);
                navigate('/dashboard');
            })
            .catch((error) => {
                console.log(error.message);
                toast.error('Something went wrong while updating user data!');
                setIsLoading(false);
            });
    };

    return (
        <main>
            <Container className="bg-medium-dark py-4 my-md-5 rounded px-5">
                <Row className="justify-content-center align-items-center my-4">    
                <Col md={10} className="p-4 bg-medium-dark rounded">
                <p className='display-6 text-center slab-font fw-bold text-dark-purple'>
                    My Profile
                    {!isEditing && (
                        <Button variant="link" onClick={handleEditClick} className="ms-2 icon-tilt">
                            <PencilSquare color="#C9C9FF" size={40} />
                        </Button>
                    )}
                </p>
                {isEditing ? (
                    <Form onSubmit={(event) => {
                        event.preventDefault();
                        handleSaveClick();
                    }}>
                    <div className="form-floating my-3">
                        <Form.Control
                            type="text"
                            placeholder="Enter first name"
                            name="first_name"
                            id="firstName"
                            value={user.first_name}
                            onChange={handleInputChange}
                            className="bg-light"
                            style={{border: 'none'}}
                        />
                        <Form.Label htmlFor="firstName" className="ms-2">
                            First Name
                        </Form.Label>
                    </div>
                    <div className="form-floating my-3">
                        <Form.Control
                            type="text"
                            placeholder="Enter last name"
                            id="lastName"
                            name="last_name"
                            value={user.last_name}
                            onChange={handleInputChange}
                            className="bg-light"
                            style={{border: 'none'}}
                        />
                        <Form.Label htmlFor="lastName" className="ms-2">
                            Last Name
                        </Form.Label>
                    </div>
                    {/* Username input area */}
                    <div className="form-floating mb-3">
                        <Form.Control
                        type="text"
                        placeholder="Enter username"  
                        id="username"
                        name="Username"
                        value={username}
                        onChange={handleInputChange}
                        className="bg-light"
                        style={{border: 'none'}}
                        />

                        <Form.Label htmlFor="username" className="ms-2">
                        Username
                        </Form.Label>
                        
                        {/* Displays X for invalid or unavailable usernames and tick otherwise */}
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
                    {/* Date of Birth input area */}
                    <div className="form-floating mb-3">

                        <Form.Control
                        type="date"
                        id="dob"
                        name="date_of_birth"
                        value={user.date_of_birth}
                        onChange={handleInputChange}
                        className="bg-light"
                        style={{border: 'none'}}
                        />
                        <Form.Label htmlFor="dob" className="ms-2">
                        Date of Birth
                        </Form.Label>

                    </div>
                    <Row>
                        <Col>
                            <Button variant="primary" type="submit" disabled={isLoading} className="text-light rounded-pill fw-bold btn btn-lg my-3 w-100">
                                {isLoading ? <Spinner animation="border" /> : "Save Changes"}
                            </Button>
                        </Col>
                        <Col>
                            <Button variant="primary" type="button" disabled={isLoading} className="text-light rounded-pill fw-bold btn btn-lg my-3 w-100" onClick={handleEditClick}>
                                {isLoading ? <Spinner animation="border" /> : "Cancel"}
                            </Button>
                        </Col>
                    </Row>
                    </Form>
                ):(
                    <>
                    <Row>
                        <Col md={7} className="d-flex flex-column justify-content-center">
                            <h6 className="my-4 lead fw-bold text-dark-purple">
                                Name: <span className="text-light slab-font ms-1">{user.first_name} {user.last_name}</span>
                            </h6>
                            <h6 className="my-4 lead fw-bold text-dark-purple">
                                Username: <span className="text-light slab-font ms-1">{user.Username}</span>
                            </h6>
                            <h6 className="my-4 lead fw-bold text-dark-purple">
                                Date of Birth: <span className="text-light slab-font ms-1">{user.date_of_birth && format(new Date(user.date_of_birth), 'dd MMMM yyyy')}</span>
                            </h6>
                            <h6 className='my-4 lead fw-bold text-dark-purple'>
                                Role: <span className="text-light slab-font ms-1">{REVERSE_ROLE_MAPPING[user.Role]}</span>
                            </h6>
                            <Link to={`/change-password/${user.UserID}`}>
                                <Button variant="primary" className='text-light btn btn-lg mt-3 rounded-pill'>Change Password</Button>
                            </Link>
                        </Col>
                        <Col md={5} className='d-none d-md-block d-flex align-items-center justify-content-center'>
                            <img
                            src={MyProfileImage}
                            alt='My Profile'
                            className='img-fluid ms-1 image-scale'
                            />
                        </Col>
                    </Row>
                    </>
                    )}
                </Col>
                </Row>
            </Container>
        </main>
    );
};

export default MyProfile;