import React, { useEffect, useState } from "react";
import { Row, Col, Card, ListGroup, Pagination } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import './LatestAnnouncement.scss'
import { format } from 'date-fns';

const AllAnnouncements = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        axios
            .get(`/announcements?page=${currentPage}`)
            .then((response) => {
                setAnnouncements(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [currentPage]);

    return (
        <Row className="justify-content-center">
            <Col md={8} className='bg-dark-purple text-light p-3 rounded-md text-break shadow-md-screen all-announcements'>
                <h1 className="gradient-text text-center pb-3 display-4 slab-font">All Announcements</h1>
                <ListGroup variant="flush" className=" justify-content-center align-items-middle mx-5 rounded">
                    {announcements.length > 0 ? (
                        announcements.map((announcement) => (
                            <ListGroup.Item key={announcement.AnnouncementID} className='bg-medium-dark text-light nice-border'>
                                <Link to={`/announcement-detail/${announcement.AnnouncementID}`} className="text-decoration-none text-light">
                                    <Card.Body className="d-flex flex-column my-3 justify-content-center align-items-center">
                                        <Card.Title className="slab-font text-primary">{announcement.Title}</Card.Title>
                                        <Card.Text className="text-dark-purple">{announcement.Content}</Card.Text>
                                        <Card.Text><small className="text-muted">Posted on {format(new Date(announcement.DatePosted), 'd MMMM yyyy')}</small></Card.Text>
                                    </Card.Body>
                                </Link>
                            </ListGroup.Item>
                        ))
                    ) : (
                        <div className="d-flex justify-content-center align-items-center fw-bold slab-font lead">
                            <p>No announcements found</p>
                        </div>                    )}
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