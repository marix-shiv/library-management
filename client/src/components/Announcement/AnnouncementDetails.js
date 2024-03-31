import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router-dom";
import { format } from 'date-fns';
import './LatestAnnouncement.scss'

const AnnouncementDetails = () => {
    const [announcement, setAnnouncement] = useState({});
    const { id } = useParams();

    useEffect(() => {
        axios
            .get(`/announcements/${id}`)
            .then((response) => {
                setAnnouncement(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);

    return (
        <Row className="justify-content-center my-md-5">
            <Col md={8} className='bg-dark-purple text-light p-3 rounded-md text-break shadow-md-screen announcement-details'>
                <h1 className="gradient-text text-center pb-3 p-3 display-4 slab-font my-4 image-scale">{announcement.Title}</h1>
                <div className='bg-medium-dark m-4 p-3 rounded d-flex flex-column justify-content-center align-items-center'>
                    <p className="text-dark-purple my-2 lead fw-bold text-center">{announcement.Content}</p>
                    <p className="text-center"><small className="text-light slab-font">Posted on {announcement.DatePosted && format(new Date(announcement.DatePosted), 'd MMMM yyyy')}</small></p>
                </div>
            </Col>
        </Row>
    );
};

export default AnnouncementDetails;