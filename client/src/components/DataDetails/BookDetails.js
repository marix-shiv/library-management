import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import {toast} from 'react-toastify';

const BookDetail = () => {
    const [book, setBook] = useState({ Title: '', Summary: '', ISBN: '', AuthorID: '', FirstName: '', LastName: '', GenreID: [] });
    const { id } = useParams();

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await axios.get(`/books/${id}`);
                setBook(response.data);
            } catch (error) {
                toast.error('Something went wrong!');
            }
        };

        fetchBook();
    }, [id]);

    return (
        <Container className="bg-medium-dark py-2 my-md-5 rounded text-center px-5">
            <Row className="h2 text-center fw-bold text-primary my-4 justify-content-center">
                <h1 className="display-4 fw-bold my-4 slab-font">{book.Title}</h1>
                <Col md={6}>
                    <Link to={`/author-detail/${book.AuthorID}`} className='general-link'>
                    <h5 className='bg-dark-purple py-3 px-2 rounded-pill text-light shadow'>By {book.FirstName} {book.LastName}</h5>
                    </Link>
                </Col>
                <p className='py-4 text-light'>ISBN: {book.ISBN}</p>
                <small className='py-4 fw-light bg-dark-purple text-light rounded mb-4'>Summary: {book.Summary}</small>
                <h4>Book Genres:</h4>
                {book.GenreID.map((genre) => (
                    <Col key={genre.GenreID} md={4}>
                        <Link to={`/genre-detail/${genre.GenreID}`} className='general-link'>
                            <h5 className='bg-dark-purple py-3 px-2 rounded-pill text-light shadow'>{genre.Name}</h5>
                        </Link>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default BookDetail;