import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Container, Row, Col, Button, Spinner, Form, Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';
import axios from 'axios';
import { format } from 'date-fns';
import { REVERSE_ROLE_MAPPING } from '../../../constants/roleConstants';
import { PencilSquare } from 'react-bootstrap-icons';
import { useSelector, useDispatch } from 'react-redux';
import { setUser as setReduxUser } from '../../../redux/userSlice';
import MyProfileImage from '../../../assets/my-profile.png';

const UserProfile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { id } = useParams();
    const [user, setUser] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const originalUser = useRef(user);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    // Get the user's role from the Redux store
    const userRole = useSelector(state => state.user.Role);

    useEffect(() => {
        originalUser.current = user;
    }, []);

    useEffect(() => {
        // If the user's role is not 'S', navigate them to '/my-profile'
        if (userRole !== 'S') {
            navigate('/my-profile');
        }
        setIsLoading(true);
        axios.get(`/users/${id}`)
            .then(res => {
                if (res.data) {
                    res.data.date_of_birth = res.data.date_of_birth.split('T')[0];
                    setUser(res.data);
                    originalUser.current = res.data;
                }
                setIsLoading(false);
            })
            .catch(() => {
                toast.error('Something went wrong while fetching user data!');
                setIsLoading(false);
            });
    }, [id, navigate, userRole]);

    const handleInputChange = (event) => {
        setUser((prevUser) => ({
            ...prevUser,
            [event.target.name]: event.target.value,
        }));
    };

    const handleEditClick = () => {
        setIsEditing(!isEditing);
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

    const handleDeleteClick = () => {
        setShowDeleteModal(true);
    };

    const handleConfirmDeleteClick = () => {
        setShowDeleteModal(false);
        axios.delete(`/users/${user.UserID}`)
            .then(() => {
                toast.success('User deleted successfully!');
                navigate('/dashboard'); // Navigate to dashboard or another appropriate page
            })
            .catch((error) => {
                console.log(error.message);
                toast.error('Something went wrong while deleting the user!');
            });
    };

    const handleBanVerifyClick = () => {
        const newStatus = user.UStatus === 1 ? 0 : 1; // Toggle the status
        axios.put(`/users/${user.UserID}/verify`, { UStatus: newStatus })
            .then(() => {
                toast.success(`User ${newStatus === 1 ? 'verified' : 'banned'} successfully!`);
                setUser({ ...user, UStatus: newStatus }); // Update the local user status
            })
            .catch((error) => {
                console.log(error.message);
                toast.error(`Something went wrong while ${newStatus === 1 ? 'verifying' : 'banning'} the user!`);
            });
    };

    return (
        <main>
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete {user.Username}s account?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleConfirmDeleteClick}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
            <Container className="bg-medium-dark py-4 my-md-5 rounded px-5">
                <Row className="justify-content-center align-items-center my-4">
                    <Col md={10} className="p-4 bg-medium-dark rounded">
                        <p className='display-6 text-center slab-font fw-bold text-dark-purple'>
                            Profile
                            {!isEditing && (
                                <Button variant="link" onClick={handleEditClick} className="ms-2 icon-tilt">
                                    <PencilSquare color="#C9C9FF" size={40} />
                                </Button>
                            )}
                        </p>
                        {isLoading ? (
                            <Spinner animation="border" />
                        ) : isEditing ? (
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
                                        style={{ border: 'none' }}
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
                                        style={{ border: 'none' }}
                                    />
                                    <Form.Label htmlFor="lastName" className="ms-2">
                                        Last Name
                                    </Form.Label>
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
                                        style={{ border: 'none' }}
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
                        ) : (
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
                                <Row className="mt-5">
                                    <Col md>
                                        <Button variant="primary" onClick={handleDeleteClick} className="text-light rounded-pill fw-bold btn btn-lg w-100">
                                            Delete User
                                        </Button>
                                    </Col>
                                    <Col md>
                                        <Button variant="primary" onClick={handleBanVerifyClick} className="text-light rounded-pill fw-bold btn btn-lg w-100">
                                            {user.UStatus === 1 ? 'Ban User' : 'Verify User'}
                                        </Button>
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

export default UserProfile;
