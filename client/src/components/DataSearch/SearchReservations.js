import React, { useState } from 'react';
import axios from 'axios';
import { Form, Tabs, Tab, Spinner, ListGroup, Container, InputGroup, FormControl, Button } from "react-bootstrap";
import {Search, Trash} from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import {toast} from 'react-toastify';
import {format} from 'date-fns';


const SearchReservations = () => {
    const [mode, setMode] = useState('user');
    const [userSubMode, setUserSubMode] = useState('id');
    const [bookSubMode, setBookSubMode] = useState('id');
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTitle, setSearchTitle] = useState('');
    const [bookId, setBookId] = useState('');
    const [username, setUsername] = useState('');
    const [userId, setUserId] = useState('');


    const getReservations = async (responseBookId) => {
        if(bookId){
            try {
                const response = await axios.get(`/reservations/book/${responseBookId}`);
                setResults(response.data);
                if(response.data.length === 0){
                    toast.info("No reservations found!")
                }
            } 
            catch (error) {
                toast.error("Error fetching reservations!");
            }
        }
    }
    
    const getReservationsByUserId = async () => {
        if(userId){
            try{
                console.log("Currently, the userId is", userId);
                const response = await axios.get(`/reservations/user/${userId}`);
                setResults(response.data);
                if(response.data.length === 0){
                    toast.info("No reservations found!");
                }
            }
            catch (error) {
                toast.error("Error fetching reservations!");
            }
        }
    }

    const handleTitleSearch = async () => {
        if(searchTitle){
            setIsLoading(true);
            try {
                const response = await axios.get(`/books/get-id/${searchTitle}`);
                const responseBookId = response.data.data.BookID;
                setBookId(responseBookId);
                await getReservations(responseBookId);
            } 
            catch (error) {
                toast.error("Incorrect Title");
            }
            finally {
                setIsLoading(false);
            }
        }
    }

    const handleUsernameSearch = async () => {
        if(username){
            setIsLoading(true);
            try{
                const response = await axios.get(`/users/get-id/${username}`);
                setUserId(response.data.data.UserID);
                await getReservationsByUserId();
            }
            catch (error) {
                toast.error("Incorrect Username");
            }
            finally {
                setIsLoading(false);
            }
        }
    }

    const handleTitleClear = async () => {
        setSearchTitle('');
        setResults([]);
    }

    const handleBookIdClear = async () => {
        setBookId('');
        setResults([]);
    }

    const handleUsernameClear = async () => {
        setUsername('');
        setResults([]);
    }

    const handleUserIdClear = async () => {
        setUserId('');
        setResults([]);
    }

    const renderReservations = () => {
        if (results.length > 0) {
            return (
                <ListGroup className='my-2'>
                    {results.map((reservation, index) => (
                        <Link to={`/reservation-detail/${reservation.ReservationID}`} key={index} style={{"textDecoration": "none"}}>
                            <ListGroup.Item className='bg-light nice-border py-4 rounded' >
                                <h5 className='slab-font lead pb-4'>Book Title: {reservation.Title}</h5>
                                <p>User{'\''}s Full Name: {reservation.first_name} {reservation.last_name}</p>
                                <p>User Username: {reservation.Username}</p>
                                <p>Date of Reservation: {reservation.DateOfReservation ? format(new Date(reservation.DateOfReservation), 'd MMMM yyyy') : ''}</p>
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
        setSearchTitle('');
        setBookId('');
        setUsername('');
        setUserId('');
    }

    return (
        <Container className="bg-medium-dark my-md-5 rounded text-center px-5 py-5">
            <h1 className="display-4 mb-4 text-dark-purple slab-font fw-bold">Search Reservations</h1>
            <Tabs activeKey={mode} onSelect={(k) => { setMode(k); resetData(1); }}>
                <Tab eventKey="user" title="User">
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
                        {renderReservations()}
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
                                        getReservationsByUserId();
                                    }
                                }}
                                value={userId}
                            />
                            <Button variant="outline" onClick={getReservationsByUserId}>
                                {isLoading ? <Spinner animation="border" size="sm" className="border-pill" /> : <Search className="icon-tilt"/>}
                            </Button>
                            <Button variant="outline" onClick={handleUserIdClear}>
                                <Trash className="icon-tilt"/>
                            </Button>
                        </InputGroup>
                        {renderReservations()}
                        </>
                    }
                </Tab>
                <Tab eventKey="book" title="Book">
                    <div className="d-flex justify-content-start ps-3">
                        <Form.Check 
                            type="switch"
                            id="book-mode-switch"
                            label={bookSubMode === 'id' ? 'Search by Book Title' : 'Search by Book ID'}
                            checked={bookSubMode === 'name'}
                            onChange={() => {
                                setBookSubMode(bookSubMode === 'id' ? 'name' : 'id');
                                resetData();
                            }}
                            className="my-3 nice-switch"
                        />
                    </div>
                    {isLoading ? <Spinner animation="border" size="sm" className="border-pill" /> : 
                        bookSubMode === 'id' ? 
                        <>
                        <InputGroup className="d-inline-flex my-5 text-center position-relative rounded-pill bg-light">
                            <FormControl
                                type="search"
                                placeholder="Search book by title..."
                                className="rounded-pill bg-light no-border ps-4 py-3"
                                onChange={(e) => setSearchTitle(e.target.value)}
                                onKeyDown={e => {
                                    if (e.key === 'Enter') {
                                        handleTitleSearch();
                                    }
                                }}
                                value={searchTitle}
                            />
                            <Button variant="outline" onClick={handleTitleSearch}>
                                {isLoading ? <Spinner animation="border" size="sm" className="border-pill" /> : <Search className="icon-tilt"/>}
                            </Button>
                            <Button variant="outline" onClick={handleTitleClear}>
                                <Trash className="icon-tilt"/>
                            </Button>
                        </InputGroup>
                        {renderReservations()}
                        </> :
                        <>
                        <InputGroup className="d-inline-flex my-5 text-center position-relative rounded-pill bg-light">
                            <FormControl
                                type="search"
                                placeholder="Search book by book ID..."
                                className="rounded-pill bg-light no-border ps-4 py-3"
                                onChange={(e) => setBookId(e.target.value)}
                                onKeyDown={e => {
                                    if (e.key === 'Enter') {
                                        getReservations();
                                    }
                                }}
                                value={bookId}
                            />
                            <Button variant="outline" onClick={getReservations}>
                                {isLoading ? <Spinner animation="border" size="sm" className="border-pill" /> : <Search className="icon-tilt"/>}
                            </Button>
                            <Button variant="outline" onClick={handleBookIdClear}>
                                <Trash className="icon-tilt"/>
                            </Button>
                        </InputGroup>
                        {renderReservations()}
                        </>
                    }
                </Tab>
            </Tabs>
        </Container>
    );
};

export default SearchReservations;