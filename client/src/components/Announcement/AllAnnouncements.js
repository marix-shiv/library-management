/**
 * AllAnnouncements.js
 * 
 * This is a React component that fetches and displays all announcements.
 * 
 * The component uses the useState hook to manage the state for the announcements and the current page.
 * The useEffect hook is used to fetch the announcements from the server whenever the current page changes.
 * 
 * The announcements are fetched from the `/announcements` endpoint, with the current page number passed as a query parameter.
 * 
 * The fetched announcements are displayed in a list. Each announcement is a link that navigates to the detail page for that announcement.
 * 
 * The component also includes a pagination control that allows the user to navigate through the pages of announcements.
 * 
 * @module components/AllAnnouncements
 */

import React, { useEffect, useState } from "react";
import { Row, Col, Card, ListGroup, Pagination } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import './LatestAnnouncement.scss'
import { format } from 'date-fns';
import {MegaphoneFill} from 'react-bootstrap-icons';
import { toast } from 'react-toastify';

const AllAnnouncements = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        axios
            .get(`/announcements?page=${currentPage}`)
            .then((response) => {
                setAnnouncements(response.data);
            })
            .catch(() => {
                toast.error("Error fetching announcements.");
            });
    }, [currentPage]);

    return (
        <Row className="justify-content-center my-md-5">
            <Col md={8} className='bg-dark-purple text-light p-3 rounded-md text-break shadow-md-screen all-announcements'>
                <h1 className="gradient-text text-center pb-3 display-4 slab-font my-4">All Announcements <MegaphoneFill color="#8787ff" size={50} style={{ transform: "rotate(-15deg)" }}/></h1>
                <ListGroup variant="flush" className=" justify-content-center align-items-middle mx-5 rounded my-3">
                    {announcements.length > 0 ? (
                        announcements.map((announcement) => (
                            <ListGroup.Item key={announcement.AnnouncementID} className='bg-medium-dark nice-border'>
                                <Link to={`/announcement-detail/${announcement.AnnouncementID}`} className="text-decoration-none text-light">
                                    <Card.Body className="d-flex flex-column my-3 justify-content-center align-items-center">
                                        <Card.Title className="slab-font text-light">{announcement.Title}</Card.Title>
                                        <Card.Text className="text-dark-purple my-2">{announcement.Content}</Card.Text>
                                        <Card.Text><small className="text-muted slab-font">Posted on {format(new Date(announcement.DatePosted), 'd MMMM yyyy')}</small></Card.Text>
                                    </Card.Body>
                                </Link>
                            </ListGroup.Item>
                        ))
                    ) : (
                        <div className="d-flex justify-content-center align-items-center fw-bold slab-font lead">
                            <p>No announcements found</p>
                        </div>                    
                    )}
                </ListGroup>
                <Pagination className="justify-content-center pagination-styles">
                    <Pagination.Prev onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : currentPage)} />
                    <Pagination.Item>{currentPage}</Pagination.Item>
                    <Pagination.Next onClick={() => setCurrentPage(currentPage + 1)} disabled={announcements.length === 0} />
                </Pagination>
            </Col>
        </Row>
    );
};

export default AllAnnouncements;