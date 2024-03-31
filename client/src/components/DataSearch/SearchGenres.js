// SearchGenres.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { InputGroup, FormControl, Button, Spinner, ListGroup, Container, Pagination } from "react-bootstrap";
import { Search, Trash } from "react-bootstrap-icons";
import { Link } from 'react-router-dom';

const SearchGenres = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);

    const handleSearch = async () => {
        if (searchTerm.trim() !== '') {
            setIsLoading(true);
            try {
                const response = await axios.get(`/genres/search/${searchTerm}?page=${page}`);
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
            <InputGroup className="d-inline-flex my-5 text-center position-relative rounded-pill bg-light">
                <FormControl
                    type="search"
                    placeholder="Search genres..."
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
                    {results.map((genre) => (
                        <div className="grid-item d-flex justify-content-center align-items-center" key={genre.GenreID}>
                            <Link to={`/genre-detail/${genre.GenreID}`} style={{"textDecoration": "none"}}>
                                <ListGroup.Item className="bg-light nice-border rounded text-dark-purple">
                                <h5 className='text-center text-break fw-light slab-font'>{genre.Name}</h5>
                                </ListGroup.Item>
                            </Link>
                        </div>  
                    ))}
                    </div>
                ) : (
                    <div className="">
                        <ListGroup.Item className="bg-light p-5 rounded text-dark-purple">
                            <h3 className='text-center display-6'>No genres Found</h3>
                            <p className='text-center'>
                                Sorry, we could not find any genres that match your search. Please
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

export default SearchGenres;