import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Pagination } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import {toast} from 'react-toastify';

const GenreDetail = () => {
    const [genreName, setGenreName] = useState('');
    const [books, setBooks] = useState([]);
    const [page, setPage] = useState(1);
    const { id } = useParams();

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
        </Container>
    );
};

export default GenreDetail;