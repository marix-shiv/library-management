import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {toast} from 'react-toastify';

const AllAuthors = () => {
    const [authors, setAuthors] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchAuthors = async () => {
            try {
                const response = await axios.get(`/authors?page=${page}`);
                setAuthors(response.data);
            } catch (error) {
                toast.error('Something went wrong!');
            }
        };

        fetchAuthors();
    }, [page]);

    return (
        <Container className="bg-medium-dark py-2 my-md-5 rounded text-center px-5">
            <Row className="h2 text-center fw-bold slab-font text-primary my-4">
                <h1 className="my-4">All Authors</h1>
            </Row>
            {authors.length > 0 ? (
                <Row>
                    {authors.map((author) => (
                        <Col key={author.AuthorID} md={4}>
                            <Link to={`/author-detail/${author.AuthorID}`} className='general-link'>
                                <h5 className='bg-dark-purple py-3 px-2 rounded-pill text-light shadow'>{author.FirstName} {author.LastName}</h5>
                            </Link>
                        </Col>
                    ))}
                </Row>
            ) : (
                <p className='lead fw-bold text-primary'>No authors found.</p>
            )}
            <Pagination className="justify-content-center pagination-styles">
                <Pagination.Prev onClick={() => setPage(page > 1 ? page - 1 : 1)} />
                <Pagination.Item>{page}</Pagination.Item>
                <Pagination.Next onClick={() => setPage(page + 1)} disabled={authors.length === 0} />
            </Pagination>
        </Container>
    );
};

export default AllAuthors;