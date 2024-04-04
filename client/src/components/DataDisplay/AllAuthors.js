/**
 * AllAuthors.js
 * 
 * This is a React component that fetches and displays all authors in a paginated format. It includes a link to the top authors page.
 * 
 * The component uses the useState and useEffect hooks to manage the state and side effects. It also uses the axios library to send HTTP requests to the server.
 * 
 * The authors are fetched from the `/authors?page=${page}` endpoint, with the page number managed by the state.
 * 
 * The fetched authors are displayed in a grid. Each author is a link that navigates to the detail page for that author.
 * 
 * The component also includes a Pagination component from the react-bootstrap library to navigate between pages. The previous button decreases the page number, the next button increases the page number, and the current page number is displayed in the middle.
 * 
 * @module components/AllAuthors
 */

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
        <>
        <Container className="bg-medium-dark py-2 my-md-5 rounded text-center px-5">
            <div className="d-flex justify-content-end mt-4">
                <Link to="/top-authors" className="btn btn-dark-purple rounded-pill text-light point-right-button">Top Authors ➤</Link>
            </div>
            <Row className="h2 text-center fw-bold slab-font text-primary mb-4 mt-1">
                <h1 className="mb-4">All Authors</h1>
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
        </>
    );
};

export default AllAuthors;