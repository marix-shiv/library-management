/**
 * DeleteBookInstance.js
 * 
 * This is a React component that fetches the details of a specific book instance and allows the user to delete it.
 * 
 * The component uses the useState, useEffect, and useSelector hooks to manage the state, side effects, and access the Redux store. It also uses the useParams and useNavigate hooks from react-router-dom to get the id from the URL parameters and navigate to different routes.
 * 
 * The book instance is fetched from the `/bookinstances/:id` endpoint, with the id obtained from the URL parameters.
 * 
 * The fetched book instance details are displayed in a confirmation message. If the book instance status is 'A' (Available) or 'M' (Maintenance), the user can delete the book instance. Otherwise, the user is informed that they cannot delete the book instance.
 * 
 * The delete operation is performed by sending a DELETE request to the `/bookinstances/:id` endpoint. If the delete operation is successful, the user is redirected to the '/all-book-instances' page.
 * 
 * If the user's role is not 'L' or 'S', they are redirected to the '/error' page.
 * 
 * @module components/DeleteBookInstance
 */

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