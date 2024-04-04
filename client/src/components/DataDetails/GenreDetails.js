/**
 * GenreDetails.js
 * 
 * This is a React component that fetches and displays the details of a specific genre. It allows the user to delete or update the genre.
 * 
 * The component uses the useState, useEffect, and useSelector hooks to manage the state, side effects, and access the Redux store. It also uses the useParams and useNavigate hooks from react-router-dom to get the id from the URL parameters and navigate to different routes.
 * 
 * The genre is fetched from the `/genres/:id` endpoint, with the id obtained from the URL parameters.
 * 
 * The fetched genre details are displayed in a detailed view. If the genre has no books, the user can delete the genre. If the genre has books, the user is informed that they cannot delete the genre.
 * 
 * The delete operation is performed by navigating to the '/delete-genre/:id' route. The update operation is performed by navigating to the '/update-genre/:id' route.
 * 
 * If the user's role is not 'L' or 'S', they cannot see the delete and update buttons.
 * 
 * @module components/GenreDetails
 */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Pagination, Button } from 'react-bootstrap';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';
import { useSelector } from 'react-redux';

const GenreDetail = () => {
    const [genreName, setGenreName] = useState('');
    const [books, setBooks] = useState([]);
    const [page, setPage] = useState(1);
    const { id } = useParams();
    const navigate = useNavigate();
    const userRole = useSelector(state => state.user.Role);

    useEffect(() => {
        const fetchGenre = async () => {
            try {
                const response = await axios.get(`/genres/${id}?page=${page}`);
                const data = response.data;
                setBooks(data.Books);
                setGenreName(data.Name.Name);
            } catch (error) {
                toast.error('Something went wrong!');
            }
        };

        fetchGenre();
    }, [id, page]);

    const handleDelete = () => {
        if (books.length > 0) {
            toast.error('Cannot delete genre with books. Please delete the books first.');
        } else {
            navigate(`/delete-genre/${id}`);
        }
    };

    return (
        <Container className="bg-medium-dark py-2 my-md-5 rounded text-center px-5">
            <Row className="h2 text-center fw-bold slab-font text-primary my-4">
                <h1 className="my-4">{genreName}</h1>
            </Row>
            {books.length > 0 ? (
                <Row>
                    {books.map((book) => (
                        <Col key={book.BookID} md={4}>
                            <Link to={`/book-detail/${book.BookID}`} className='general-link'>
                                <h5 className='bg-dark-purple py-3 px-2 rounded-pill text-light shadow'>{book.Title}</h5>
                            </Link>
                        </Col>
                    ))}
                </Row>
            ) : (
                <p className='lead fw-bold text-primary'>No books found.</p>
            )}
            <Pagination className="justify-content-center pagination-styles">
                <Pagination.Prev onClick={() => setPage(page > 1 ? page - 1 : 1)} />
                <Pagination.Item>{page}</Pagination.Item>
                <Pagination.Next onClick={() => setPage(page + 1)} disabled={books.length === 0} />
            </Pagination>
            {(userRole === 'L' || userRole === 'S') && (
                <Row className="justify-content-center d-flex align-items-center">
                    <Col xs={6} md={4}>
                        <Button className="btn btn-lg bg-dark-purple py-3 px-md-5 text-center rounded-pill text-light shadow my-2 my-5" onClick={handleDelete}>Delete</Button>
                    </Col>
                    <Col xs={6} md={4}>
                        <Button className="btn btn-lg bg-dark-purple py-3 px-md-5 text-center rounded-pill text-light shadow my-2 my-5" onClick={() => navigate(`/update-genre/${id}`)}>Update</Button>
                    </Col>
                </Row>
            )}
        </Container>
    );
};

export default GenreDetail;