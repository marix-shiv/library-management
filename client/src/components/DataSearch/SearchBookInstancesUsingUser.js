/**
 * SearchBookInstancesUsingUser.js
 * 
 * This is a React component that allows the user to search for book instances by user. It includes a switch to select the search mode (by username or user ID), a search bar, a clear button, and a paginated display of the search results.
 * 
 * The component uses the useState, useEffect, and useSelector hooks to manage the state, side effects, and access the Redux store. It also uses the axios library to send HTTP requests to the server, the react-bootstrap library for the UI, the react-router-dom library for navigation, and the react-toastify library to display notifications.
 * 
 * The search mode, search term, user ID, and search results are managed by the state. When the search button is clicked, the `/users/get-id/${username}` or `/bookinstances/user/${userId}` endpoint is called to fetch the user ID or search results. The search results are displayed in a list, with each book instance being a link to its detail page.
 * 
 * The clear button clears the search term, user ID, and results.
 * 
 * If the user's role is not 'L' or 'S', they are redirected to the '/error' page. If an error occurs while fetching the user ID or search results, a toast notification is displayed.
 * 
 * @module components/SearchBookInstancesUsingUser
 */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Spinner, ListGroup, Container, InputGroup, FormControl, Button, Badge } from "react-bootstrap";
import {Search, Trash} from 'react-bootstrap-icons';
import { Link, useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';
import {format} from 'date-fns';
import { useSelector } from 'react-redux';

const SearchBookInstancesUsingUser = () => {
    const [userSubMode, setUserSubMode] = useState('id');
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [userId, setUserId] = useState('');
    const userRole = useSelector(state => state.user.Role);
    const navigate = useNavigate();

    useEffect(() => {
        if (userRole !== 'L' && userRole !== 'S') {
            navigate('/error');
        }
    }, [userRole, navigate]);

    const getBookInstances = async () => {
        if(userId){
            try{
                const response = await axios.get(`/bookinstances/user/${userId}`);
                setResults(response.data);
                if(response.data.length === 0){
                    toast.info("No book instances found!");
                }
            }
            catch (error) {
                toast.error("Error fetching book instances!");
            }
        }
    }

    const handleUsernameSearch = async () => {
        if(username){
            setIsLoading(true);
            try{
                const response = await axios.get(`/users/get-id/${username}`);
                setUserId(response.data.data.UserID);
                await getBookInstances();
            }
            catch (error) {
                toast.error("Incorrect Username");
            }
            finally {
                setIsLoading(false);
            }
        }
    }

    const handleUsernameClear = async () => {
        setUsername('');
        setResults([]);
    }

    const handleUserIdClear = async () => {
        setUserId('');
        setResults([]);
    }

    const renderBookInstances = () => {
        if (results.length > 0) {
            return (
                <ListGroup className='my-2'>
                    {results.map((instance, index) => (
                        <Link to={`/book-instance-detail/${instance.InstanceID}`} key={index} style={{"textDecoration": "none"}}>
                            <ListGroup.Item className='bg-light nice-border py-4 rounded' >
                                <h5 className='slab-font lead pb-4'>Book Title: {instance.Title}</h5>
                                <p>Instance ID: {instance.InstanceID}</p>
                                <p>Available By: {instance.AvailableBy ? format(new Date(instance.AvailableBy), 'd MMMM yyyy') : ''}</p>
                                {instance.Status === 'R' && <Badge bg="primary" className="mb-2">Reserved</Badge>}
                                {instance.Status === 'L' && <Badge bg="success" className="mb-2">Loaned</Badge>}
                            </ListGroup.Item>
                        </Link>
                    ))}
                </ListGroup>
            );
        } else {
            return
        }
    }

    const resetData = () => {
        setResults([]);
        setIsLoading(false);
        setUsername('');
        setUserId('');
    }

    return (
        <Container className="bg-medium-dark my-md-5 rounded text-center px-5 py-5">
        <h1 className="d-flex align-items-center justify-content-center">Search Book Instances By User<Search color="#2A2A84" size={36} className="ms-2"/></h1>
            <div className="d-flex justify-content-start ps-3">
                <Form.Check 
                    type="switch"
                    id="user-mode-switch"
                    label={userSubMode === 'id' ? 'Search by Username' : 'Search by User ID'}
                    checked={userSubMode === 'username'}
                    onChange={() => {
                        setUserSubMode(userSubMode === 'id' ? 'username' : 'id'); 
                        resetData();
                    }}
                    className="my-3 nice-switch"
                />
            </div>
            {isLoading ? <Spinner animation="border" size="sm" className="border-pill" /> : 
                userSubMode === 'id' ? 
                <>
                <InputGroup className="d-inline-flex my-5 text-center position-relative rounded-pill bg-light">
                    <FormControl
                        type="search"
                        placeholder="Search user by username..."
                        className="rounded-pill bg-light no-border ps-4 py-3"
                        onChange={(e) => setUsername(e.target.value)}
                        onKeyDown={e => {
                            if (e.key === 'Enter') {
                                handleUsernameSearch();
                            }
                        }}
                        value={username}
                    />
                    <Button variant="outline" onClick={handleUsernameSearch}>
                        {isLoading ? <Spinner animation="border" size="sm" className="border-pill" /> : <Search className="icon-tilt"/>}
                    </Button>
                    <Button variant="outline" onClick={handleUsernameClear}>
                        <Trash className="icon-tilt"/>
                    </Button>
                </InputGroup>
                {renderBookInstances()}
                </>
                :
                <>
                <InputGroup className="d-inline-flex my-5 text-center position-relative rounded-pill bg-light">
                    <FormControl
                        type="search"
                        placeholder="Search user by user ID..."
                        className="rounded-pill bg-light no-border ps-4 py-3"
                        onChange={(e) => setUserId(e.target.value)}
                        onKeyDown={e => {
                            if (e.key === 'Enter') {
                                getBookInstances();
                            }
                        }}
                        value={userId}
                    />
                    <Button variant="outline" onClick={getBookInstances}>
                        {isLoading ? <Spinner animation="border" size="sm" className="border-pill" /> : <Search className="icon-tilt"/>}
                    </Button>
                    <Button variant="outline" onClick={handleUserIdClear}>
                        <Trash className="icon-tilt"/>
                    </Button>
                </InputGroup>
                {renderBookInstances()}
                </>
            }
        </Container>
    );
};

export default SearchBookInstancesUsingUser;