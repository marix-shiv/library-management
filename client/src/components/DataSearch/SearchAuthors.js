/**
 * SearchAuthors.js
 * 
 * This is a React component that allows the user to search for authors by name. It includes a search bar, a clear button, and a paginated display of the search results.
 * 
 * The component uses the useState, useEffect, and axios hooks to manage the state, side effects, and HTTP requests. It also uses the react-bootstrap library for the UI and the react-router-dom library for navigation.
 * 
 * The search term and page number are managed by the state. When the search button is clicked, the `/authors/search/${searchTerm}?page=${page}` endpoint is called to fetch the search results. The search results are displayed in a grid, with each author being a link to its detail page.
 * 
 * The clear button clears the search term and results, and resets the page number to 1.
 * 
 * The Pagination component from the react-bootstrap library is used to navigate between pages. The previous button decreases the page number (but not below 1), the next button increases the page number (but is disabled if no results are fetched), and the current page number is displayed in the middle.
 * 
 * @module components/SearchAuthors
 */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { InputGroup, FormControl, Button, Spinner, ListGroup, Container, Pagination } from "react-bootstrap";
import { Search, Trash } from "react-bootstrap-icons";
import { Link } from 'react-router-dom';

const SearchAuthors = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);

    const handleSearch = async () => {
        if (searchTerm.trim() !== '') {
            setIsLoading(true);
            try {
                const response = await axios.get(`/authors/search/${searchTerm}?page=${page}`);
                setResults(response.data);
            } catch (error) {
                setResults([]);
            }
            setIsLoading(false);
        } else {
            setResults([]);
        }
    };

    const handleClear = () => {
        setSearchTerm('');
        setResults([]);
        setPage(1);
    };

    useEffect(() => {
        handleSearch();
    }, [page]);

    return (
        <Container className="bg-medium-dark py-2 my-md-5 rounded text-center px-5 py-4">
        <h1 className="d-flex align-items-center justify-content-center">Search Authors<Search color="#2A2A84" size={36} className="ms-2"/></h1>
            <InputGroup className="d-inline-flex my-5 text-center position-relative rounded-pill bg-light">
                <FormControl
                    type="search"
                    placeholder="Search authors..."
                    className="rounded-pill bg-light no-border ps-4 py-3"
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={e => {
                        if (e.key === 'Enter') {
                            handleSearch();
                        }
                    }}
                    value={searchTerm}
                />
                <Button variant="outline" onClick={handleSearch}>
                    {isLoading ? <Spinner animation="border" size="sm" className="border-pill" /> : <Search className="icon-tilt"/>}
                </Button>
                <Button variant="outline" onClick={handleClear}>
                    <Trash className="icon-tilt"/>
                </Button>
            </InputGroup>
            {
                results.length > 0 ? (
                    <div className="grid-container my-4 mx-4">
                    {results.map((author) => (
                        <div className="grid-item d-flex justify-content-center align-items-center" key={author.AuthorID}>
                            <Link to={`/author-detail/${author.AuthorID}`} style={{"textDecoration": "none"}}>
                                <ListGroup.Item className="bg-light nice-border rounded text-dark-purple">
                                <h5 className='text-center text-break fw-light slab-font'>{author.FirstName} {author.LastName}</h5>
                                </ListGroup.Item>
                            </Link>
                        </div>  
                    ))}
                    </div>
                ) : (
                    <div className="">
                        <ListGroup.Item className="bg-light p-5 rounded text-dark-purple">
                            <h3 className='text-center display-6'>No authors Found</h3>
                            <p className='text-center'>
                                Sorry, we could not find any authors that match your search. Please
                                try using different keywords or fewer letters.
                            </p>
                        </ListGroup.Item>
                    </div>
                )
            }
            <Pagination className="justify-content-center pagination-styles">
                <Pagination.Prev onClick={() => setPage(page > 1 ? page - 1 : 1)} />
                <Pagination.Item>{page}</Pagination.Item>
                <Pagination.Next onClick={() => setPage(page + 1)} disabled={results.length === 0} />
            </Pagination>
        </Container>
    );
};

export default SearchAuthors;