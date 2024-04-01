import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { INSTANCE_MAPPING } from '../../constants/InstanceConstants';
import { format } from 'date-fns';
import {toast} from 'react-toastify';

const BookInstanceDetail = () => {
    const [book, setBook] = useState({ Title: '' });
    const [bookInstance, setBookInstance] = useState({ Status: '', InstanceID: '', Imprint: '', BookID: '' });
    const [userID, setUserID] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBookInstance = async () => {
            try {
                const response = await axios.get(`/bookinstances/${id}`);
                const { Title, ...instanceDetails } = response.data;
                setBook({ Title });
                setBookInstance(instanceDetails);

                if (response.data.Status === 'R' || response.data.Status === 'L') {
                    const userResponse = await axios.get(`/bookinstances/get-user/${id}`);
                    setUserID(userResponse.data.data.UserID);
                }
            } catch (error) {
                toast.error('Something went wrong!');
            }
        };

        fetchBookInstance();
    }, [id]);

    const handleDelete = () => {
        if (bookInstance.Status !== "A" && bookInstance.Status !== "M") {
            toast.error('Deletion permitted only for available or maintenance books');
        } else {
            navigate(`/delete-book-instance/${id}`);
        }
    };

    const handleIssue = () => {
        navigate('/issue-book', {
            state: {
                userID: userID,
                bookInstanceID: bookInstance.InstanceID
            }
        });
    }

    const handleReceive = () => {
        navigate('/receive-book', {
            state: {
                userID: userID,
                bookInstanceID: bookInstance.InstanceID
            }
        });
    }

    const handleAvailable = async () => {
        try {
            await axios.put(`/bookinstances/${id}/status/A`);
            toast.success('Book status updated to available');
            // Refresh the book instance data
            const response = await axios.get(`/bookinstances/${id}`);
            const { Title, ...instanceDetails } = response.data;
            setBook({ Title });
            setBookInstance(instanceDetails);

            if (response.data.Status === 'R' || response.data.Status === 'L') {
                const userResponse = await axios.get(`/bookinstances/get-user/${id}`);
                setUserID(userResponse.data.data.UserID);
            }
        } catch (error) {
            toast.error('Failed to update book status');
        }
    }

    return (
        <Container className="bg-medium-dark py-2 my-md-5 rounded text-center px-5">
            <Row className="h2 text-center fw-bold text-primary my-4 justify-content-center">
                <h1 className="display-4 fw-bold my-4 slab-font">{book.Title}</h1>
                <Col md={6}>
                    <Link to={`/book-detail/${bookInstance.BookID}`} className='general-link'>
                    <h5 className='bg-dark-purple py-3 px-2 rounded-pill text-light shadow'>Imprint: {bookInstance.Imprint}</h5>
                    </Link>
                </Col>
                <p className='py-4 text-light'>Status: {INSTANCE_MAPPING[bookInstance.Status]}</p>
                {(bookInstance.Status === 'R' || bookInstance.Status === 'L') && <p>User ID: {userID}</p>}
                {Object.prototype.hasOwnProperty.call(bookInstance, 'AvailableBy') 
                && bookInstance.AvailableBy 
                && <p>Available By: {format(new Date(bookInstance.AvailableBy), 'dd MMMM yyyy')}</p>}
            </Row>
            <Row className="justify-content-center d-flex align-items-center">
                <Col xs={6} md={4}>
                    <Button className="btn btn-lg bg-dark-purple py-3 px-md-5 text-center rounded-pill text-light shadow my-2 my-5" onClick={handleDelete}>Delete</Button>
                </Col>
                <Col xs={6} md={4}>
                    <Button className="btn btn-lg bg-dark-purple py-3 px-md-5 text-center rounded-pill text-light shadow my-2 my-5" onClick={() => navigate(`/update-book-instance/${id}`)}>Update</Button>
                </Col>
                {bookInstance.Status === 'R' && (
                    <Col xs={6} md={4}>
                        <Button className="btn btn-lg bg-dark-purple py-3 px-md-5 text-center rounded-pill text-light shadow my-2 my-5" onClick={handleIssue}>Issue</Button>
                    </Col>
                )}
                {bookInstance.Status === 'L' && (
                    <Col xs={6} md={4}>
                        <Button className="btn btn-lg bg-dark-purple py-3 px-md-5 text-center rounded-pill text-light shadow my-2 my-5" onClick={handleReceive}>Receive</Button>
                    </Col>
                )}
                {bookInstance.Status === 'M' && (
                    <Col xs={6} md={4}>
                        <Button className="btn btn-lg bg-dark-purple py-3 px-md-5 text-center rounded-pill text-light shadow my-2 my-5" onClick={handleAvailable}>Available</Button>
                    </Col>
                )}
            </Row>
        </Container>
    );
};

export default BookInstanceDetail;