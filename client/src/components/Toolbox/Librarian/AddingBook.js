/**
 * AddBook.js
 * 
 * This is a React component that allows the user to add a book. It includes a form with fields for the book's title, author ID, ISBN, summary, and genres, and a button to submit the form.
 * 
 * The component uses the useState, useEffect, useSelector, axios, and useNavigate hooks to manage the state, side effects, access the Redux store, HTTP requests, and navigation. It also uses the react-bootstrap library for the UI and the react-toastify library to display notifications.
 * 
 * The title, author ID, ISBN, summary, loading state, genres, and selected genres are managed by the state. The form fields are bound to the state and update the state when changed.
 * 
 * The user's role is fetched from the Redux store. If the user's role is not 'S' or 'L', they are redirected to the '/error' page.
 * 
 * The genres are fetched from the `/genres/entire-list` endpoint when the component mounts and stored in the state.
 * 
 * The handleSelectGenre function is used to handle the selection of a genre. The selected genre is removed from the genres and added to the selected genres.
 * 
 * The handleRemoveGenre function is used to handle the removal of a genre. The removed genre is removed from the selected genres and added to the genres.
 * 
 * When the form is submitted, a POST request is sent to the `/books` endpoint with the title, author ID, ISBN, genres, and summary. If the request is successful, a success toast notification is displayed. If the request fails, an error toast notification is displayed.
 * 
 * @module components/AddBook
 */

import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Spinner, ListGroup, ListGroupItem} from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { XCircleFill, } from "react-bootstrap-icons";
import "./Librarian.scss";
import { useNavigate } from "react-router-dom";
import {useSelector} from 'react-redux';

const AddBook = () => {
    const [title, setTitle] = useState("");
    const [authorID, setAuthorID] = useState("");
    const [ISBN, setISBN] = useState("");
    const [summary, setSummary] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [genres, setGenres] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const navigate = useNavigate();

    const userRole = useSelector(state => state.user.Role);

    useEffect(() => {
        if (userRole !== 'S' && userRole !== 'L') {
            navigate('/error');
        }
    }, [userRole, navigate]);

    useEffect(() => {
        const fetchGenres = async () => {
          try {
            const response = await axios.get("/genres/entire-list");
            setGenres(response.data);
          } catch (error) {
            toast.error("Failed to fetch genres.");
          }
        };
    
        fetchGenres();
      }, []);

    const handleSelectGenre = (event) => {
        const genre = genres.find((genre) => genre.GenreID === event.target.value);
        setGenres(genres.filter((g) => g.GenreID !== genre.GenreID));
        setSelectedGenres([...selectedGenres, genre]);
    };

    const handleRemoveGenre = (genre) => {
        setSelectedGenres(selectedGenres.filter((g) => g.GenreID !== genre.GenreID));
        setGenres([...genres, genre]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        try {
            const response = await axios.post(
                `/books`,
                { 
                    Title: title, 
                    AuthorID: authorID, 
                    ISBN: ISBN, 
                    GenreID: selectedGenres.map((genre) => genre.GenreID),
                    Summary: summary 
                }
            );
            if (response.status === 200) {
                toast.success("Book added successfully.");
            } else {
                toast.error("Operation failed. Retry later.");
            }
        } catch (error) {
            toast.error("Operation failed. Check your inputs.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container className="bg-medium-dark py-2 my-md-5 rounded">
            <p className="h2 text-center fw-bold slab-font text-primary my-4">
                Add a Book
            </p>
            <Row className="justify-content-center align-items-center my-4">
                <Col md={7} className="p-4 rounded">
                    <Form onSubmit={handleSubmit}>
                        <div className="form-floating mb-3">
                            <Form.Control
                                type="text"
                                placeholder="Enter Title"
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="bg-light"
                                style={{ border: "none" }}
                            />
                            <Form.Label htmlFor="title" className="ms-2">
                                Title
                            </Form.Label>
                        </div>
                        <div className="form-floating mb-3">
                            <Form.Control
                                type="text"
                                placeholder="Enter ISBN"
                                id="title"
                                value={ISBN}
                                onChange={(e) => setISBN(e.target.value)}
                                className="bg-light"
                                style={{ border: "none" }}
                            />
                            <Form.Label htmlFor="title" className="ms-2">
                                ISBN
                            </Form.Label>
                        </div>
                        <div className="form-floating mb-3">
                            <Form.Control
                                type="text"
                                placeholder="Enter Author ID"
                                id="title"
                                value={authorID}
                                onChange={(e) => setAuthorID(e.target.value)}
                                className="bg-light"
                                style={{ border: "none" }}
                            />
                            <Form.Label htmlFor="title" className="ms-2">
                                AuthorID
                            </Form.Label>
                        </div>
                        <div className="form-floating mb-3">
                            <Form.Control
                                type="text"
                                placeholder="Enter Summary"
                                id="title"
                                value={summary}
                                onChange={(e) => setSummary(e.target.value)}
                                className="bg-light"
                                style={{ border: "none" }}
                            />
                            <Form.Label htmlFor="title" className="ms-2">
                                Summary
                            </Form.Label>
                        </div>
                        <div className="form-floating mb-3 bg-medium-dark">
                            <Form.Select onChange={handleSelectGenre} className="bg-light">
                            <option>Select genre</option>
                            {genres.map((genre) => (
                                <option key={genre.GenreID} value={genre.GenreID}>
                                    {genre.Name}
                                </option>
                            ))}
                            </Form.Select>
                            <Form.Label className="ms-2">Genres</Form.Label>
                        </div>
                        <ListGroup horizontal className="mb-3">
                            <div className="d-flex flex-wrap mb-3">
                                {selectedGenres.map((genre) => (
                                    <ListGroupItem key={genre.GenreID} className="bg-light rounded-pill me-2 mb-2">
                                        {genre.Name}
                                        <XCircleFill
                                            onClick={() => handleRemoveGenre(genre)}
                                            style={{ cursor: "pointer", marginLeft: "10px", marginTop: "-5px" }}
                                        />
                                    </ListGroupItem>
                                ))}
                            </div>
                        </ListGroup>
                        <div className="d-grid">
                            <Button
                                variant="primary"
                                type="submit"
                                disabled={isLoading}
                                className="text-light rounded-pill fw-bold btn btn-lg my-3 w-100"
                            >
                                {isLoading ? <Spinner animation="border" /> : "Submit"}
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default AddBook;