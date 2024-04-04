/**
 * UsersSearch.js
 * 
 * This is a React component that allows the user to search for other users. It includes a search field, a search button, and a clear button.
 * 
 * The component uses the useState hook to manage the search query and loading state. The search query is updated when the search field is changed. The loading state is set to true when the search button is clicked and set to false when the search is completed.
 * 
 * The handleSearch function is used to handle the clicking of the search button. If the search query is not empty, the loading state is set to true and the onSearch prop function is called with the search query and a function to set the loading state. If the search query is empty, the setResults prop function is called with null.
 * 
 * The search field is an input of type 'search' with a placeholder of 'Search users...'. The search field is bound to the search query and updates the search query when changed. The handleSearch function is called when the 'Enter' key is pressed in the search field.
 * 
 * The search button is a button that calls the handleSearch function when clicked. If the loading state is true, the search button displays a spinner. If the loading state is false, the search button displays a search icon.
 * 
 * The clear button is a button that calls the onClear prop function and sets the search query to an empty string when clicked. The clear button displays a trash icon.
 * 
 * The UsersSearch function is type checked with PropTypes. The onSearch, onClear, and setResults prop functions are required.
 * 
 * @module components/UsersSearch
 */

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