/**
 * SearchBookInstances.js
 * 
 * This is a React component that allows the user to search for book instances by status. It includes a tabbed interface to select the status, a paginated display of the search results, and a link to search by user.
 * 
 * The component uses the useState, useEffect, and useSelector hooks to manage the state, side effects, and access the Redux store. It also uses the axios library to send HTTP requests to the server, the react-bootstrap library for the UI, and the react-router-dom library for navigation.
 * 
 * The status and page number are managed by the state. When a tab is selected, the `/bookinstances/status/${status}?page=${page}` endpoint is called to fetch the search results. The search results are displayed in a list, with each book instance being a link to its detail page.
 * 
 * The Pagination component from the react-bootstrap library is used to navigate between pages. The previous button decreases the page number (but not below 1), the next button increases the page number (but is disabled if no results are fetched), and the current page number is displayed in the middle.
 * 
 * If the user's role is 'L' or 'S', they can see the link to search by user.
 * 
 * @module components/SearchBookInstances
 */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Tabs, Tab, Spinner, ListGroup, Container, Pagination } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const SearchBookInstances = () => {
    const [status, setStatus] = useState('L');
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);
    const userRole = useSelector(state => state.user.Role);

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
                <Link to={`/book-instance-detail/${book.InstanceID}`} style={{"textDecoration": "none"}}>
                    <h1 className="display-6">{book.Title}</h1>
                    <p className="text-primary lead">{book.Imprint}</p>
                </Link>
            </ListGroup.Item>
        ));
    };

    return (
        <Container className="bg-medium-dark my-md-5 rounded text-center px-5 py-5">
            {(userRole === 'L' || userRole === 'S') && (
                <div className="d-flex justify-content-end mt-4">
                    <Link to="/search-book-instance-by-user" className="btn btn-dark-purple rounded-pill text-light point-right-button">Search using user ➤</Link>
                </div>
            )}
            <h1 className="d-flex align-items-center justify-content-center">Search Books<Search color="#2A2A84" size={36} className="ms-2"/></h1>
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