import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Container, Alert } from 'react-bootstrap';
import {toast} from 'react-toastify';
import { useSelector } from 'react-redux';

const DeleteBookInstance = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [bookInstance, setBookInstance] = useState(null);
    const userRole = useSelector(state => state.user.Role);

    useEffect(() => {
        if (userRole !== 'L' && userRole !== 'S') {
            navigate('/error');
        } else {
            const fetchBookInstance = async () => {
                try {
                    const response = await axios.get(`/bookinstances/${id}`);
                    setBookInstance(response.data);
                } catch (error) {
                    toast.error('Something went wrong!');
                    navigate('/all-book-instances');
                }
            };

            fetchBookInstance();
        }
    }, [id, userRole, navigate]);

    const handleDelete = async () => {
        if (bookInstance.Status === 'A' || bookInstance.Status === 'M') {
            try {
                await axios.delete(`/bookinstances/${id}`);
                toast.success("Book Instances Deleted Successfully!");
                navigate('/all-book-instances');
            } catch (error) {
                toast.error('Something went wrong!');
                navigate('/all-book-instances');
            }
        } else {
            toast.error('Only available or books for maintenance are allowed to be deleted.');
        }
    };

    const handleCancel = () => {
        navigate(`/book-instance-detail/${id}`);
    };

    if (!bookInstance) {
        return null;
    }

    return (
        <Container className="bg-medium-dark py-5 my-md-5 rounded text-center px-5">
            {(bookInstance.Status === 'A' || bookInstance.Status === 'M') ? (
                <>
                    <Alert variant="warning" className='display-6 slab-font'>Are you sure you want to <b style={{'textDecoration': 'underline'}}>DELETE</b> this book instance?</Alert>
                    <Button variant="danger" onClick={handleDelete} className='rounded-pill mx-5 btn-lg border-dark'>Yes, delete</Button>
                    <Button variant="primary" onClick={handleCancel} className='rounded-pill mx-5 btn-lg border-dark text-light'>No, cancel</Button>
                </>
            ) : (
                <Alert variant="danger" className='display-6 slab-font' >Only available or books for maintenance are allowed to be deleted.</Alert>
            )}
        </Container>
    );
};

export default DeleteBookInstance;