/**
 * SearchBooks.js
 * 
 * This is a React component that allows the user to search for books by title. It includes a search bar, a clear button, and a paginated display of the search results.
 * 
 * The component uses the useState, useEffect, and axios hooks to manage the state, side effects, and HTTP requests. It also uses the react-bootstrap library for the UI.
 * 
 * The search term, page number, search results, and loading state are managed by the state. When the search button is clicked, the `/books/search/${query}?page=${page}` endpoint is called to fetch the search results. The search results are displayed in a list, with each book being a link to its detail page.
 * 
 * The clear button clears the search term, search results, and resets the page number to 1.
 * 
 * The Pagination component from the react-bootstrap library is used to navigate between pages. The previous button decreases the page number (but not below 1), the next button increases the page number (but is disabled if no results are fetched), and the current page number is displayed in the middle.
 * 
 * @module components/SearchBooks
 */

import React, { useState, useEffect } from "react";
import { ListGroup, Container, Pagination } from "react-bootstrap";
import axios from "axios";
import BooksSearch from "../Books/BooksSearch/BooksSearch";
import SearchResult from "../Books/BooksSearch/SearchResult";
import { Search } from 'react-bootstrap-icons';

const SearchBooks = () => {
    const [results, setResults] = useState(null);
    const [page, setPage] = useState(1);
    const [query, setQuery] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const onSearch = (query, setIsLoading) => {
        axios
        .get(`/books/search/${query}?page=${page}`)
        .then((response) => {
            setResults(response.data);
        })
        .catch(() => {
            setResults({});
        })
        .finally(()=>{
            setIsLoading(false);
        })
    };

    useEffect(() => {
        if(query){
            console.log(results);
            onSearch(query, setIsLoading);
        }
    }, [page])

    return (
        <Container className="bg-medium-dark py-2 my-md-5 rounded text-center px-5 py-4">
        <h1 className="d-flex align-items-center justify-content-center">Search Books<Search color="#2A2A84" size={36} className="ms-2"/></h1>
        <div className="d-flex justify-content-center my-4 px-md-5">
            <BooksSearch
            onSearch={onSearch}
            onClear={() => {
                setResults(null);
            }}
            query={query}
            setQuery={setQuery}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            setPage={setPage}
            />
        </div>
        <div className="d-flex justify-content-center my-3">
            <ListGroup className="my-2 mx-md-5 px-md-5">
            {results ? (
                Object.keys(results).length > 0 ? (
                Object.values(results).map((result, index) => (
                    <SearchResult result={result} key={index} />
                ))
                ) : (
                <SearchResult result={null} key={1} />
                )
            ) : (
                ""
            )}
            </ListGroup>
        </div>
        <Pagination className="justify-content-center pagination-styles">
            <Pagination.Prev onClick={() => setPage(page > 1 ? page - 1 : 1)} />
            <Pagination.Item>{page}</Pagination.Item>
            <Pagination.Next onClick={() => setPage(page + 1)} disabled={!results || Object.keys(results).length === 0}/>
        </Pagination>
        </Container>
    )
};

export default SearchBooks;