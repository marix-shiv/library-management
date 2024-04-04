/**
 * DeleteGenre.js
 * 
 * This is a React component that fetches the details of a specific genre and allows the user to delete it.
 * 
 * The component uses the useState, useEffect, and useSelector hooks to manage the state, side effects, and access the Redux store. It also uses the useParams and useNavigate hooks from react-router-dom to get the id from the URL parameters and navigate to different routes.
 * 
 * The genre is fetched from the `/genres/:id` endpoint, with the id obtained from the URL parameters.
 * 
 * The fetched genre details are displayed in a confirmation message. If the genre has no books, the user can delete the genre. If the genre has books, the user is informed that they cannot delete the genre.
 * 
 * The delete operation is performed by sending a DELETE request to the `/genres/:id` endpoint. If the delete operation is successful, the user is redirected to the '/all-genres' page.
 * 
 * If the user's role is not 'L' or 'S', they are redirected to the '/error' page.
 * 
 * @module components/DeleteGenre
 */

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Container, Alert } from 'react-bootstrap';
import {toast} from 'react-toastify';
import { useSelector } from 'react-redux';

const DeleteGenre = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [genreName, setGenreName] = useState('');
    const [books, setBooks] = useState([]);
    const userRole = useSelector(state => state.user.Role);

    useEffect(() => {
        if (userRole !== 'L' && userRole !== 'S') {
            navigate('/error');
        } else {
            const fetchGenre = async () => {
                try {
                    const response = await axios.get(`/genres/${id}`);
                    const data = response.data;
                    setBooks(data.Books);
                    setGenreName(data.Name.Name);
                } catch (error) {
                    toast.error('Something went wrong!');
                    navigate('/all-genres');
                }
            };

            fetchGenre();
        }
    }, [id, userRole, navigate]);

    const handleDelete = async () => {
        if (books.length > 0) {
            toast.error('Cannot delete genre with books. Please delete the books first.');
        } else {
            try {
                await axios.delete(`/genres/${id}`);
                navigate('/all-genres');
            } catch (error) {
                toast.error('Something went wrong!');
                navigate('/all-genres');
            }
        }
    };

    const handleCancel = () => {
        navigate(`/genre-detail/${id}`);
    };

    return (
        <Container className="bg-medium-dark py-5 my-md-5 rounded text-center px-5">
            {books.length === 0 ? (
                <>
                    <Alert variant="warning" className='display-6 slab-font'>Are you sure you want to <b style={{'textDecoration': 'underline'}}>DELETE</b> {genreName}?</Alert>
                    <Button variant="danger" onClick={handleDelete} className='rounded-pill mx-5 btn-lg border-dark'>Yes, delete</Button>
                    <Button variant="primary" onClick={handleCancel} className='rounded-pill mx-5 btn-lg border-dark text-light'>No, cancel</Button>
                </>
            ) : (
                <Alert variant="danger" className='display-6 slab-font' >Cannot delete genre with books. Please delete the books first.</Alert>
            )}
        </Container>
    );
};

export default DeleteGenre;