import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {toast} from 'react-toastify';
import { AwardFill } from 'react-bootstrap-icons';

const TopAuthors = () => {
    const [authors, setAuthors] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchTopAuthors = async () => {
            try {
                const response = await axios.get(`/authors/top?page=${page}`);
                setAuthors(response.data);
            } catch (error) {
                toast.error('Something went wrong!');
            }
        };

        fetchTopAuthors();
    }, [page]);

    return (
        <Container className="bg-medium-dark py-2 my-md-5 rounded text-center px-5">
            <Row className="h2 text-center fw-bold slab-font text-primary my-4">
                <h1 className="my-4">Top Authors<AwardFill color="#2A2A84" size={64} className='ms-2' /></h1>
            </Row>
            {authors.length > 0 ? (
                <Row className='d-flex justify-content-center align-items-center'>
                    {authors.map((author) => (
                        <Col key={author.AuthorID} xs={10}>
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

export default TopAuthors;