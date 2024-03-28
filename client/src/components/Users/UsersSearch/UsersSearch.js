import React, { useState } from "react";
import PropTypes from 'prop-types';
import { InputGroup, FormControl, Button, Spinner } from "react-bootstrap";
import { Search, Trash } from "react-bootstrap-icons";

const UsersSearch = ({ onSearch, onClear, setResults }) => {
    const [query, setQuery] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSearch = () => {
        if (query.trim() !== "") {
            setIsLoading(true);
            onSearch(query, setIsLoading);
        }
        else{
            setResults(null);
        }
    };

    return (
        <InputGroup className="d-inline-flex my-2 mx-md-5 text-center position-relative rounded-pill bg-light">
            <FormControl
                type="search"
                placeholder="Search users..."
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

UsersSearch.propTypes = {
    onSearch: PropTypes.func.isRequired,
    onClear: PropTypes.func.isRequired,
    setResults: PropTypes.func.isRequired,
};

export default UsersSearch;