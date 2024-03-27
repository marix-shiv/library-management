import React, { useState } from "react";
import { InputGroup, FormControl, Button, Spinner } from "react-bootstrap";
import { Search, Trash } from "react-bootstrap-icons";

const BooksSearch = ({ onSearch, onClear }) => {
    const [query, setQuery] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = () => {
        if (query.trim() !== "") {
            setIsLoading(true);
            onSearch(query, setIsLoading);
        }
    };

    return (
        <InputGroup className="d-inline-flex my-2 mx-md-5 text-center position-relative rounded-pill bg-light">
            <FormControl
                type="search"
                placeholder="Search books..."
                className="rounded-pill bg-light no-border ps-4 py-3"
                onChange={(e) => setQuery(e.target.value)}
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

export default BooksSearch;