/**
 * AnnouncementDetails.js
 * 
 * This is a React component that fetches and displays the details of a specific announcement.
 * 
 * The component uses the useState hook to manage the state for the announcement and the visibility of a modal.
 * The useEffect hook is used to fetch the announcement from the server when the component mounts.
 * 
 * The announcement is fetched from the `/announcements/:id` endpoint, with the id obtained from the URL parameters.
 * 
 * The fetched announcement is displayed in a detailed view. If the user's role is 'S' or 'A', they are also presented with options to update or delete the announcement.
 * 
 * The delete operation is performed by sending a DELETE request to the `/announcements/:id` endpoint. If the operation is successful, the user is redirected to the '/all-announcements' page.
 * 
 * @module components/AnnouncementDetails
 */

import React, { useEffect, useState } from "react";
import { Row, Col, Button, Modal } from "react-bootstrap";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { format } from 'date-fns';
import { useSelector } from 'react-redux';
import './LatestAnnouncement.scss'
import {toast} from 'react-toastify';

const AnnouncementDetails = () => {
    const [announcement, setAnnouncement] = useState({});
    const [showModal, setShowModal] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();
    const userRole = useSelector(state => state.user.Role);

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

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`/announcements/${id}`);
            if (response.status === 200) {
                toast.success("Announcement deleted successfully.");
                navigate('/all-announcements');
            } else {
                toast.error("Operation failed. Retry later.");
            }
        } catch (error) {
            toast.error("Operation failed. Check your inputs.");
        } finally {
            setShowModal(false);
        }
    };

    return (
        <Row className="justify-content-center my-md-5">
            <Col md={8} className='bg-dark-purple text-light p-3 rounded-md text-break shadow-md-screen announcement-details'>
                <h1 className="gradient-text text-center pb-3 p-3 display-4 slab-font my-4 image-scale">{announcement.Title}</h1>
                <div className='bg-medium-dark m-4 p-3 rounded d-flex flex-column justify-content-center align-items-center'>
                    <p className="text-dark-purple my-2 lead fw-bold text-center">{announcement.Content}</p>
                    <p className="text-center"><small className="text-light slab-font">Posted on {announcement.DatePosted && format(new Date(announcement.DatePosted), 'd MMMM yyyy')}</small></p>
                </div>
                {(userRole === 'S' || userRole === 'A') && (
                    <Row className="justify-content-md-center align-items-center my-4">
                        <Col xs={12} md={5}>
                            <Button variant="light" className="rounded-pill mb-3 btn-lg w-100 mb-md-0" onClick={() => navigate(`/update-announcement/${id}`)}>Update</Button>
                        </Col>
                        <Col xs={12} md={5}>
                            <Button variant="light" className="rounded-pill btn-lg w-100" onClick={() => setShowModal(true)}>Delete</Button>
                        </Col>
                    </Row>
                )}
            </Col>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton className="bg-light">
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body className="bg-light">Are you sure you want to delete this announcement?</Modal.Body>
                <Modal.Footer className="bg-light">
                    <Button variant="primary" className="rounded-pill btn-lg" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" className="rounded-pill btn-lg" onClick={handleDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </Row>
    );
};

export default AnnouncementDetails;