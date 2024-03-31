import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Tabs, Tab, Spinner, ListGroup, Container, Pagination } from "react-bootstrap";
import { Link } from 'react-router-dom';

const SearchBookInstances = () => {
    const [status, setStatus] = useState('L');
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);

    const fetchBookInstances = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`/bookinstances/status/${status}?page=${page}`);
            setResults(response.data);
        } catch (error) {
            setResults([]);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchBookInstances();
    }, [status, page]);

    const renderBooks = (books) => {
        if (books.length === 0) {
            return (
                <ListGroup.Item className='bg-medium-dark nice-border pt-4'>
                    <h1 className="display-6">No books found</h1>
                    <p className="text-primary lead">Please try a different status.</p>
                </ListGroup.Item>
            );
        }

        return books.map((book) => (
            <ListGroup.Item key={book.InstanceID} className='bg-medium-dark nice-border pt-4'>
                <Link to={`/book-instance-detail/${book.BookID}`} style={{"textDecoration": "none"}}>
                    <h1 className="display-6">{book.Title}</h1>
                    <p className="text-primary lead">{book.Imprint}</p>
                </Link>
            </ListGroup.Item>
        ));
    };

    return (
        <Container className="bg-medium-dark my-md-5 rounded text-center px-5 py-5">
            <h1 className="display-4 mb-4 text-dark-purple slab-font fw-bold">Search Book Instances</h1>
            <Tabs activeKey={status} onSelect={(k) => { setStatus(k); setPage(1); }}>
                <Tab eventKey="L" title="Loaned">
                    {isLoading ? <Spinner animation="border" size="sm" className="border-pill" /> : <ListGroup className='my-2'>{renderBooks(results)}</ListGroup>}
                </Tab>
                <Tab eventKey="R" title="Reserved">
                    {isLoading ? <Spinner animation="border" size="sm" className="border-pill" /> : <ListGroup className='my-2'>{renderBooks(results)}</ListGroup>}
                </Tab>
                <Tab eventKey="M" title="Maintenance">
                    {isLoading ? <Spinner animation="border" size="sm" className="border-pill" /> : <ListGroup className='my-2'>{renderBooks(results)}</ListGroup>}
                </Tab>
                <Tab eventKey="A" title="Available">
                    {isLoading ? <Spinner animation="border" size="sm" className="border-pill" /> : <ListGroup className='my-2'>{renderBooks(results)}</ListGroup>}
                </Tab>
            </Tabs>
            <Pagination className="justify-content-center pagination-styles">
                <Pagination.Prev onClick={() => setPage(page > 1 ? page - 1 : 1)} />
                <Pagination.Item>{page}</Pagination.Item>
                <Pagination.Next onClick={() => setPage(page + 1)} disabled={results.length === 0} />
            </Pagination>
        </Container>
    );
};

export default SearchBookInstances;