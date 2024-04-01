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