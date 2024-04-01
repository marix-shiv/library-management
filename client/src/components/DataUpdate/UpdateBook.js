import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Spinner, ListGroup, ListGroupItem } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { XCircleFill } from "react-bootstrap-icons";
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const UpdateBook = () => {
    const [title, setTitle] = useState("");
    const [authorID, setAuthorID] = useState("");
    const [ISBN, setISBN] = useState("");
    const [summary, setSummary] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [genres, setGenres] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();
    const userRole = useSelector(state => state.user.Role);

    useEffect(() => {
        if (userRole !== 'L' && userRole !== 'S') {
            navigate('/error');
        } else {
            const fetchBookAndGenres = async () => {
                setIsLoading(true);
                try {
                    const [bookResponse, genresResponse] = await Promise.all([
                        axios.get(`/books/${id}`),
                        axios.get("/genres/entire-list")
                    ]);
                    setTitle(bookResponse.data.Title);
                    setAuthorID(bookResponse.data.AuthorID);
                    setISBN(bookResponse.data.ISBN);
                    setSummary(bookResponse.data.Summary);
                    setSelectedGenres(bookResponse.data.GenreID);
                    setGenres(genresResponse.data.filter(genre => !bookResponse.data.GenreID.find(g => g.GenreID === genre.GenreID)));
                } catch (error) {
                    toast.error("Failed to fetch data.");
                } finally {
                    setIsLoading(false);
                }
            };

            fetchBookAndGenres();
        }
    }, [id, userRole, navigate]);

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
            const response = await axios.put(
                `/books/${id}`,
                { 
                    Title: title, 
                    AuthorID: authorID, 
                    ISBN: ISBN, 
                    GenreID: selectedGenres.map((genre) => genre.GenreID),
                    Summary: summary 
                }
            );
            if (response.status === 200) {
                toast.success("Book updated successfully.");
            } else {
                toast.error("Operation failed. Retry later.");
            }
        } catch (error) {
            toast.error("Operation failed. Check your inputs.");
        } finally {
            setIsLoading(false);
            navigate(`/book-detail/${id}`);
        }
    };

    const handleCancel = () => {
        navigate(`/book-detail/${id}`);
    };

    return (
        <Container className="bg-medium-dark py-2 my-md-5 rounded">
            <p className="h2 text-center fw-bold slab-font text-primary my-4">
                Update a Book
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
                                id="isbn"
                                value={ISBN}
                                onChange={(e) => setISBN(e.target.value)}
                                className="bg-light"
                                style={{ border: "none" }}
                            />
                            <Form.Label htmlFor="isbn" className="ms-2">
                                ISBN
                            </Form.Label>
                        </div>
                        <div className="form-floating mb-3">
                            <Form.Control
                                type="text"
                                placeholder="Enter Author ID"
                                id="authorId"
                                value={authorID}
                                onChange={(e) => setAuthorID(e.target.value)}
                                className="bg-light"
                                style={{ border: "none" }}
                            />
                            <Form.Label htmlFor="authorId" className="ms-2">
                                Author ID
                            </Form.Label>
                        </div>
                        <div className="form-floating mb-3">
                            <Form.Control
                                type="text"
                                placeholder="Enter Summary"
                                id="summary"
                                value={summary}
                                onChange={(e) => setSummary(e.target.value)}
                                className="bg-light"
                                style={{ border: "none" }}
                            />
                            <Form.Label htmlFor="summary" className="ms-2">
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
                        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                            <Button
                                variant="primary"
                                type="submit"
                                disabled={isLoading}
                                className="text-light rounded-pill fw-bold btn btn-lg my-3 w-100"
                            >
                                {isLoading ? <Spinner animation="border" /> : "Submit"}
                            </Button>
                            <Button
                                variant="secondary"
                                onClick={handleCancel}
                                className="text-light rounded-pill fw-bold btn btn-lg my-3 w-100"
                            >
                                Cancel
                            </Button>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default UpdateBook;