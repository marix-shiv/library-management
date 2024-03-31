import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button, Container, Alert } from 'react-bootstrap';
import {toast} from 'react-toastify';

const DeleteBook = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState(null);

    useEffect(() => {
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
    }, [id, navigate]);

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