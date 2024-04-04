/**
 * DeleteBook.js
 * 
 * This is a React component that fetches the details of a specific book and allows the user to delete it.
 * 
 * The component uses the useState, useEffect, and useSelector hooks to manage the state, side effects, and access the Redux store. It also uses the useParams and useNavigate hooks from react-router-dom to get the id from the URL parameters and navigate to different routes.
 * 
 * The book is fetched from the `/books/:id` endpoint, with the id obtained from the URL parameters.
 * 
 * The fetched book details are displayed in a confirmation message. If the book has no book instances, the user can delete the book. If the book has book instances, the user is informed that they cannot delete the book.
 * 
 * The delete operation is performed by sending a DELETE request to the `/books/:id` endpoint. If the delete operation is successful, the user is redirected to the '/all-books' page.
 * 
 * If the user's role is not 'L' or 'S', they are redirected to the '/error' page.
 * 
 * @module components/DeleteBook
 */

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Container, Alert } from 'react-bootstrap';
import {toast} from 'react-toastify';
import { useSelector } from 'react-redux';

const DeleteBook = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState(null);
    const userRole = useSelector(state => state.user.Role);

    useEffect(() => {
        if (userRole !== 'L' && userRole !== 'S') {
            navigate('/error');
        } else {
            const fetchBook = async () => {
                try {
                    const response = await axios.get(`/books/${id}`);
                    setBook(response.data);
                } catch (error) {
                    toast.error('Something went wrong!');
                    navigate('/all-books');
                }
            };

            fetchBook();
        }
    }, [id, userRole, navigate]);

    const handleDelete = async () => {
        if (book.BookInstances.length > 0) {
            toast.error('Cannot delete book with book instances. Please delete the book instances first.');
        } else {
            try {
                await axios.delete(`/books/${id}`);
                navigate('/all-books');
            } catch (error) {
                toast.error('Something went wrong!');
                navigate('/all-books');
            }
        }
    };

    const handleCancel = () => {
        navigate(`/book-detail/${id}`);
    };

    if (!book) {
        return null;
    }

    return (
        <Container className="bg-medium-dark py-5 my-md-5 rounded text-center px-5">
            {book.BookInstances.length === 0 ? (
                <>
                    <Alert variant="warning" className='display-6 slab-font'>Are you sure you want to <b style={{'textDecoration': 'underline'}}>DELETE</b> {book.Title}?</Alert>
                    <Button variant="danger" onClick={handleDelete} className='rounded-pill mx-5 btn-lg border-dark'>Yes, delete</Button>
                    <Button variant="primary" onClick={handleCancel} className='rounded-pill mx-5 btn-lg border-dark text-light'>No, cancel</Button>
                </>
            ) : (
                <Alert variant="danger" className='display-6 slab-font' >Cannot delete book with book instances. Please delete the book instances first.</Alert>
            )}
        </Container>
    );
};

export default DeleteBook;