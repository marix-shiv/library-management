/**
 * AllPolicies.js
 * 
 * This is a React component that fetches and displays all policies in a paginated format.
 * 
 * The component uses the useState and useEffect hooks to manage the state and side effects. It also uses the axios library to send HTTP requests to the server and the react-toastify library to display notifications.
 * 
 * The policies are fetched from the `/policies?page=${page}` endpoint, with the page number managed by the state.
 * 
 * The fetched policies are displayed in a grid. Each policy is a link that navigates to the detail page for that policy. Core policies are marked with a badge.
 * 
 * The component also includes a Pagination component from the react-bootstrap library to navigate between pages. The previous button decreases the page number, the next button increases the page number, and the current page number is displayed in the middle.
 * 
 * If an error occurs while fetching the policies, a toast notification is displayed.
 * 
 * @module components/AllPolicies
 */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Pagination, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {toast} from 'react-toastify';

const AllPolicies = () => {
    const [policies, setPolicies] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchPolicies = async () => {
            try {
                const response = await axios.get(`/policies?page=${page}`);
                console.log(response.data);
                setPolicies(response.data);
            } catch (error) {
                toast.error('Something went wrong!');
            }
        };

        fetchPolicies();
    }, [page]);

    return (
        <Container className="bg-medium-dark py-2 my-md-5 rounded text-center px-5">
            <Row className="h2 text-center fw-bold slab-font text-primary my-4">
                <h1 className="my-4">All Policies</h1>
            </Row>
            {policies.length > 0 ? (
                <Row className='align-items-center'>
                    {policies.map((policy) => (
                        <Col key={policy.PolicyID} md={6}>
                            <Link to={`/policy-detail/${policy.PolicyID}`} className='general-link'>
                                <h5 className='bg-dark-purple py-3 px-2 rounded-pill text-light shadow'>
                                    {policy.Core === 1 && <Badge bg="light text-primary" className="mb-2">Core</Badge>}
                                    <br />
                                    {policy.Property}:
                                    <br />
                                    <span className='gradient-text'>{policy.Value}</span>
                                </h5>
                            </Link>
                        </Col>
                    ))}
                </Row>
            ) : (
                <p className='lead fw-bold text-primary'>No policies found.</p>
            )}
            <Pagination className="justify-content-center pagination-styles">
                <Pagination.Prev onClick={() => setPage(page > 1 ? page - 1 : 1)} />
                <Pagination.Item>{page}</Pagination.Item>
                <Pagination.Next onClick={() => setPage(page + 1)} disabled={policies.length === 0} />
            </Pagination>
        </Container>
    );
};

export default AllPolicies;