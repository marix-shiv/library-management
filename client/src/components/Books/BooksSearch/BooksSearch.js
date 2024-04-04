/**
 * BooksSearch.js
 * 
 * This is a React component that provides a search bar for books. It allows the user to enter a query, and then either perform a search or clear the search.
 * 
 * The component receives several props, including functions to handle the search and clear actions, the current query, and a function to update the query.
 * 
 * The component uses the Bootstrap library to create a styled input group with a search bar and buttons for the search and clear actions.
 * 
 * The component also includes PropTypes to validate the types of the props.
 * 
 * @module components/BooksSearch
 */

import React from "react";
import { InputGroup, FormControl, Button, Spinner } from "react-bootstrap";
import { Search, Trash } from "react-bootstrap-icons";
import PropTypes from 'prop-types';

const BooksSearch = ({ onSearch, onClear, query, setQuery, isLoading, setIsLoading, setPage }) => {

    const handleSearch = () => {
        if (query.trim() !== "") {
            setIsLoading(true);
            onSearch(query, setIsLoading);
        }
    };

    return (
        <InputGroup className="d-inline-flex my-2 text-center position-relative rounded-pill bg-light">
            <FormControl
                type="search"
                placeholder="Search books..."
                className="rounded-pill bg-light no-border ps-4 py-3"
                onChange={(e) => {
                    setQuery(e.target.value);
                    setPage(1);
                }}
                onKeyDown={e => {
                    if (e.key === 'Enter') {
                        handleSearch();
                    }
                }}
                value={query}
            />
            <Button variant="outline" onClick={handleSearch}>
                {isLoading ? <Spinner animation="border" size="sm" className="border-pill" /> : <Search className="icon-tilt"/>}
            </Button>
            <Button variant="outline" onClick={() => { onClear(); setQuery(''); }}>
                <Trash className="icon-tilt"/>
            </Button>
        </InputGroup>
    );
};

BooksSearch.propTypes = {
    onSearch: PropTypes.func.isRequired,
    onClear: PropTypes.func.isRequired,
    query: PropTypes.string.isRequired,
    setQuery: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    setIsLoading: PropTypes.func.isRequired,
    setPage: PropTypes.func.isRequired
};

export default BooksSearch;