import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';
import {INSTANCE_MAPPING} from '../../constants/InstanceConstants';
import { useSelector } from 'react-redux';

const BookDetail = () => {
    const [book, setBook] = useState({ Title: '', Summary: '', ISBN: '', AuthorID: '', FirstName: '', LastName: '', GenreID: [], BookInstances: [] });
    const { id } = useParams();
    const navigate = useNavigate();
    const userRole = useSelector(state => state.user.Role);

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

    const handleDelete = () => {
        if (book.BookInstances.length > 0) {
            toast.error('Cannot delete books with book instances. Please delete the book instances first.');
        } else {
            navigate(`/delete-book/${id}`);
        }
    };

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
                <hr />
                <h4>Book Instances:</h4>
                {book.BookInstances.length > 0 ? (
                    book.BookInstances.map((instance) => (
                        <Col key={instance.BookInstanceID} md={4}>
                            <Link to={`/book-instance-detail/${instance.InstanceID}`} className='general-link'>
                                <h5 className='bg-dark-purple py-3 px-2 rounded-pill text-light shadow'>{instance.Imprint} - {INSTANCE_MAPPING[instance.Status]}</h5>
                            </Link>
                        </Col>
                    ))
                ) : (
                    <p className='lead fw-bold text-primary' key={1}>No book instances found.</p>
                )}
            </Row>
            {(userRole === 'L' || userRole === 'S') && (
                <Row className="justify-content-center d-flex align-items-center">
                    <Col xs={6} md={4}>
                        <Button className="btn btn-lg bg-dark-purple py-3 px-md-5 text-center rounded-pill text-light shadow my-2 my-5" onClick={handleDelete}>Delete</Button>
                    </Col>
                    <Col xs={6} md={4}>
                        <Button className="btn btn-lg bg-dark-purple py-3 px-md-5 text-center rounded-pill text-light shadow my-2 my-5" onClick={() => navigate(`/update-book/${id}`)}>Update</Button>
                    </Col>
                </Row>
            )}
        </Container>
    );
};

export default BookDetail;