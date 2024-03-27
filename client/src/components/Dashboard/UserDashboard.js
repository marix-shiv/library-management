import React, { useState } from "react";
import { ListGroup } from "react-bootstrap";
import axios from "axios";
import BooksSearch from "../Books/BooksSearch/BooksSearch";
import SearchResult from "../Books/BooksSearch/SearchResult";
import IssuedByUser from "../Books/Instances/IssuedByUser/IssuedByUser";

const UserDashboard = () => {
const [results, setResults] = useState(null);

const onSearch = (query, setIsLoading) => {
    axios
    .get(`/books/search/${query}`)
    .then((response) => {
        setResults(response.data);
    })
    .catch(() => {
        setResults({});
    })
    .finally(() => {
        setIsLoading(false);
    });
};
return (
    <>
    <h4>Search Books</h4>
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
    <div className="d-flex justify-content-center align-items-center">
        <IssuedByUser byMe={true} />
    </div>
    </>
);
};

export default UserDashboard;
