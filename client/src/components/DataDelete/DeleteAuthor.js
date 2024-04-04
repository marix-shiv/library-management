/**
 * DeleteAuthor.js
 * 
 * This is a React component that fetches the details of a specific author and allows the user to delete them.
 * 
 * The component uses the useState, useEffect, and useSelector hooks to manage the state, side effects, and access the Redux store. It also uses the useParams and useNavigate hooks from react-router-dom to get the id from the URL parameters and navigate to different routes.
 * 
 * The author is fetched from the `/authors/:id` endpoint, with the id obtained from the URL parameters.
 * 
 * The fetched author details are displayed in a confirmation message. If the author has no books, the user can delete the author. If the author has books, the user is informed that they cannot delete the author.
 * 
 * The delete operation is performed by sending a DELETE request to the `/authors/:id` endpoint. If the delete operation is successful, the user is redirected to the '/all-authors' page.
 * 
 * If the user's role is not 'L' or 'S', they are redirected to the '/error' page.
 * 
 * @module components/DeleteAuthor
 */

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Container, Alert } from 'react-bootstrap';
import {toast} from 'react-toastify';
import { useSelector } from 'react-redux';

const DeleteAuthor = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [author, setAuthor] = useState(null);
    const userRole = useSelector(state => state.user.Role);

    useEffect(() => {
        if (userRole !== 'L' && userRole !== 'S') {
            navigate('/error');
        } else {
            const fetchAuthor = async () => {
                try {
                    const response = await axios.get(`/authors/${id}`);
                    setAuthor(response.data);
                } catch (error) {
                    toast.error('Something went wrong!');
                    navigate('/all-authors');
                }
            };

            fetchAuthor();
        }
    }, [id, userRole, navigate]);

    const handleDelete = async () => {
        try {
            await axios.delete(`/authors/${id}`);
            navigate('/all-authors');
        } catch (error) {
            toast.error('Something went wrong!');
            navigate('/all-authors');
        }
    };

    const handleCancel = () => {
        navigate(`/author-detail/${id}`);
    };

    if (!author) {
        return null;
    }

    return (
        <Container className="bg-medium-dark py-5 my-md-5 rounded text-center px-5">
            {author.Books.length === 0 ? (
                <>
                    <Alert variant="warning" className='display-6 slab-font'>Are you sure you want to <b style={{'textDecoration': 'underline'}}>DELETE</b> {author.FirstName} {author.LastName}?</Alert>
                    <Button variant="danger" onClick={handleDelete} className='rounded-pill mx-5 btn-lg border-dark'>Yes, delete</Button>
                    <Button variant="primary" onClick={handleCancel} className='rounded-pill mx-5 btn-lg border-dark text-light'>No, cancel</Button>
                </>
            ) : (
                <Alert variant="danger" className='display-6 slab-font' >Cannot delete author with books. Please delete the books first.</Alert>
            )}
        </Container>
    );
};

export default DeleteAuthor;