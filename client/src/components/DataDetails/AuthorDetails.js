import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Pagination, Button } from 'react-bootstrap';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import {toast} from 'react-toastify';
import { useSelector } from 'react-redux';

const AuthorDetail = () => {
    const [author, setAuthor] = useState({ FirstName: '', LastName: '', DateOfBirth: '', DateOfDeath: '', Books: [] });
    const [page, setPage] = useState(1);
    const { id } = useParams();
    const navigate = useNavigate();
    const userRole = useSelector(state => state.user.Role);

    useEffect(() => {
        const fetchAuthor = async () => {
            try {
                const response = await axios.get(`/authors/${id}?page=${page}`);
                console.log(response.data);
                setAuthor(response.data);
            } catch (error) {
                toast.error('Something went wrong!');
            }
        };

        fetchAuthor();
    }, [id, page]);

    const handleDelete = () => {
        if (author.Books.length > 0) {
            toast.error('Cannot delete author with books. Please delete the books first.');
        } else {
            navigate(`/delete-author/${id}`);
        }
    };

    return (
        <Container className="bg-medium-dark py-2 my-md-5 rounded text-center px-5">
            <Row className="h2 text-center fw-bold slab-font text-primary my-4">
                <h1 className="my-4">{author.FirstName} {author.LastName}</h1>
                <h6 className="my-4">
                    {author.DateOfBirth && format(new Date(author.DateOfBirth), 'dd MMMM yyyy')} - 
                    {Object.prototype.hasOwnProperty.call(author, 'DateOfDeath') && author.DateOfDeath ? format(new Date(author.DateOfDeath), 'dd MMMM yyyy') : "Now"}
                </h6>

            </Row>
            {author.Books.length > 0 ? (
                <Row>
                    {author.Books.map((book) => (
                        <Col key={book.BookID} md={4}>
                            <Link to={`/book-detail/${book.BookID}`} className='general-link'>
                                <h5 className='bg-dark-purple py-3 px-2 rounded-pill text-light shadow'>{book.Title}</h5>
                            </Link>
                        </Col>
                    ))}
                </Row>
            ) : (
                <p className='lead fw-bold text-primary'>No books found for this author.</p>
            )}
            <Pagination className="justify-content-center pagination-styles">
                <Pagination.Prev onClick={() => setPage(page > 1 ? page - 1 : 1)} />
                <Pagination.Item>{page}</Pagination.Item>
                <Pagination.Next onClick={() => setPage(page + 1)} disabled={author.Books.length === 0} />
            </Pagination>
            {(userRole === 'L' || userRole === 'S') && (
                <Row className="justify-content-center d-flex align-items-center">
                    <Col xs={6} md={4}>
                        <Button className="btn btn-lg bg-dark-purple py-3 px-md-5 text-center rounded-pill text-light shadow my-2 my-5" onClick={handleDelete}>Delete</Button>
                    </Col>
                    <Col xs={6} md={4}>
                        <Button className="btn btn-lg bg-dark-purple py-3 px-md-5 text-center rounded-pill text-light shadow my-2 my-5" onClick={() => navigate(`/update-author/${id}`)}>Update</Button>
                    </Col>
                </Row>
            )}
        </Container>
    );
};

export default AuthorDetail;