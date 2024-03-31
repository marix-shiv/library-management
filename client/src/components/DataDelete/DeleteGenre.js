import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Container, Alert } from 'react-bootstrap';
import {toast} from 'react-toastify';

const DeleteGenre = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [genreName, setGenreName] = useState('');
    const [books, setBooks] = useState([]);

    useEffect(() => {
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
    }, [id, navigate]);

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