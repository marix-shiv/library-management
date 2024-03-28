import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {toast} from 'react-toastify';

const AllBookInstances = () => {
    const [bookInstances, setBookInstances] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchBookInstances = async () => {
            try {
                const response = await axios.get(`/bookinstances?page=${page}`);
                console.log(response.data);
                setBookInstances(response.data);
            } catch (error) {
                toast.error('Something went wrong!');
            }
        };

        fetchBookInstances();
    }, [page]);

    return (
        <Container className="bg-medium-dark py-2 my-md-5 rounded text-center px-5">
            <Row className="h2 text-center fw-bold slab-font text-primary my-4">
                <h1 className="my-4">All Book Instances</h1>
            </Row>
            {bookInstances.length > 0 ? (
                <Row className='align-items-center'>
                    {bookInstances.map((instance) => (
                        <Col key={instance.InstanceID} md={6}>
                            <Link to={`/book-instance-detail/${instance.InstanceID}`} className='general-link'>
                                <h5 className='bg-dark-purple py-3 px-2 rounded-pill text-light shadow'>{instance.book.Title} - {instance.Imprint}</h5>
                            </Link>
                        </Col>
                    ))}
                </Row>
            ) : (
                <p className='lead fw-bold text-primary'>No book instances found.</p>
            )}
            <Pagination className="justify-content-center pagination-styles">
                <Pagination.Prev onClick={() => setPage(page > 1 ? page - 1 : 1)} />
                <Pagination.Item>{page}</Pagination.Item>
                <Pagination.Next onClick={() => setPage(page + 1)} disabled={bookInstances.length === 0} />
            </Pagination>
        </Container>
    );
};

export default AllBookInstances;