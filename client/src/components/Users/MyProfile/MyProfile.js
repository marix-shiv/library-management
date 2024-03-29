import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import axios from 'axios';
import { format } from 'date-fns';
import {REVERSE_ROLE_MAPPING} from '../../../constants/roleConstants';
import { PencilSquare, InfoCircleFill, XCircleFill, CheckCircleFill } from 'react-bootstrap-icons';
import { useSelector, useDispatch } from 'react-redux';
import { setUser as setReduxUser } from '../../../redux/userSlice';

const MyProfile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const usernameFromStore = useSelector(state=>state.user.Username);
    const [user, setUser] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [username, setUsername] = useState(usernameFromStore);
    const [errors, setErrors] = useState({});
    const [isUsernameCheckLoading, setIsUsernameCheckLoading] = useState(false);

    useEffect(() => {
        axios.get('users/get-my-user-id/')
        .then(response => {
            if (response.data.data && response.data.data.UserID) {
                axios.get(`/users/${response.data.data.UserID}`)
                    .then(res => {
                        if (res.data) {
                            res.data.date_of_birth = res.data.date_of_birth.split('T')[0];
                            setUser(res.data);

                            // Check if the username is valid and available
                            if (res.data.Username) {
                                setIsUsernameCheckLoading(true);
                                // Make a request to check the username
                                // If the username is invalid or unavailable, update the errors object
                                // setErrors({ ...errors, username: 'This username is invalid or unavailable' });
                                setIsUsernameCheckLoading(false);
                            }
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
                <Col md={7} className="p-4 bg-medium-dark rounded">
                <p className='display-6 text-center'>
                    My Profile
                    {!isEditing && (
                        <Button variant="link" onClick={handleEditClick} className="ms-2">
                            <PencilSquare color="blue" size={36} />
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
                    <Button variant="primary" type="submit" disabled={isLoading} className="text-light rounded-pill fw-bold btn btn-lg my-3 w-100">
                        {isLoading ? <Spinner animation="border" /> : "Save"}
                    </Button>
                    </Form>
                ):(
                    <>
                    <h6 className="my-4">
                        Name: {user.first_name} {user.last_name}
                    </h6>
                    <h6 className="my-4">
                        Username: {user.Username}
                    </h6>
                    <h6 className="my-4">
                        Date of Birth: {user.date_of_birth && format(new Date(user.date_of_birth), 'dd MMMM yyyy')}
                    </h6>
                    <h6 className='my-4'>
                        Role: {REVERSE_ROLE_MAPPING[user.Role]}
                    </h6>
                    <Link to={`/change-password/${user.UserID}`}>
                        <Button variant="primary">Change Password</Button>
                    </Link>
                    </>
                    )}
                </Col>
                </Row>
            </Container>
        </main>
    );
};

export default MyProfile;