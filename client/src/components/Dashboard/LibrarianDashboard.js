import React, { useState } from "react";
import {
ListGroup
} from "react-bootstrap";
import axios from "axios";
import BooksSearch from "../Books/BooksSearch/BooksSearch";
import SearchResult from "../Books/BooksSearch/SearchResult";
import UsersSearch from "../Users/UsersSearch/UsersSearch";
import UsersSearchResult from "../Users/UsersSearch/SearchResult";
import IssueBook from '../Toolbox/Librarian/IssueBook';
import ReserveBook from "../Toolbox/Librarian/ReserveBook";
import ReceiveBook from "../Toolbox/Librarian/ReceiveBook";
import AddBook from '../Toolbox/Librarian/AddingBook';
import AddBookInstance from "../Toolbox/Librarian/AddingInstance";
import AddGenre from "../Toolbox/Librarian/AddingGenre";
import AddAuthor from "../Toolbox/Librarian/AddingAuthor";

const LibrarianDashboard = () => {
const [results, setResults] = useState(null);
const [users, setUsers] = useState(null);

const onSearch = (query, setIsLoading) => {
    axios
    .get(`/books/search/${query}`)
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

const usersSearch = (query, setIsLoading) => {
    axios
        .get(`/users/search/${query}`)
        .then((response)=>{
            setUsers(response.data);
        })
        .catch(()=>{
            setUsers({});
        })
        .finally(()=>{
            setIsLoading(false);
        })
}

return (
    <>
    <div className="d-flex justify-content-center my-3 px-md-5">
        <BooksSearch
        onSearch={onSearch}
        onClear={() => {
            setResults(null);
        }}
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
    <hr />
    <div className="d-flex justify-content-center my-4 px-md-5">
        <UsersSearch
        onSearch={usersSearch}
        onClear={() => {
            setUsers(null);
        }}
        setResults={setUsers}
        />
    </div>
    <div className="grid-container my-4 mx-4">
        {users ? (
            Object.keys(users).length > 0 ? (
            Object.values(users).map((result, index) => (
                <div className="grid-item" key={index}>
                    <UsersSearchResult result={result} />
                </div>
            ))
            ) : (
            <div className="grid-item">
                <UsersSearchResult result={null} />
            </div>
            )
        ) : (
            ""
        )}
    </div>
    </>
);
};

export default LibrarianDashboard;
