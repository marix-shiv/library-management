/**
 * TopGenres.js
 * 
 * This is a React component that fetches and displays the top genres in a paginated format.
 * 
 * The component uses the useState and useEffect hooks to manage the state and side effects. It also uses the axios library to send HTTP requests to the server and the react-toastify library to display notifications.
 * 
 * The genres are fetched from the `/genres/top?page=${page}` endpoint, with the page number managed by the state.
 * 
 * The fetched genres are displayed in a grid. Each genre is a link that navigates to the detail page for that genre.
 * 
 * The component also includes a Pagination component from the react-bootstrap library to navigate between pages. The previous button decreases the page number, the next button increases the page number, and the current page number is displayed in the middle. The next button is disabled if no genres are fetched.
 * 
 * If an error occurs while fetching the genres, a toast notification is displayed.
 * 
 * @module components/TopGenres
 */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Pagination } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AwardFill } from 'react-bootstrap-icons';

const TopGenres = () => {
    const [genres, setGenres] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchTopGenres = async () => {
            try {
                const response = await axios.get(`/genres/top?page=${page}`);
                setGenres(response.data);
            } catch (error) {
                toast.error('Something went wrong!');
            }
        };

        fetchTopGenres();
    }, [page]);

    return (
        <Container className="bg-medium-dark py-2 my-md-5 rounded text-center px-5">
            <Row className="h2 text-center fw-bold slab-font text-primary my-4">
                <h1 className="my-4">Top Genres<AwardFill color="#2A2A84" size={50} className='ms-2 align-middle' /></h1>
            </Row>
            {genres.length > 0 ? (
                <Row className='d-flex justify-content-center align-items-center'>
                    {genres.map((genre) => (
                        <Col key={genre.GenreID} md={10}>
                            <Link to={`/genre-detail/${genre.GenreID}`} className='general-link'>
                                <h5 className='bg-dark-purple py-3 px-2 rounded-pill text-light shadow'>{genre.Name}</h5>
                            </Link>
                        </Col>
                    ))}
                </Row>
            ) : (
                <p className='lead fw-bold text-primary'>No genres found.</p>
            )}
            <Pagination className="justify-content-center pagination-styles">
                <Pagination.Prev onClick={() => setPage(page > 1 ? page - 1 : 1)} />
                <Pagination.Item>{page}</Pagination.Item>
                <Pagination.Next onClick={() => setPage(page + 1)} disabled={genres.length === 0} />
            </Pagination>
        </Container>
    );
};

export default TopGenres;