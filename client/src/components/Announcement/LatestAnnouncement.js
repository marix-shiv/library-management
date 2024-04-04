/**
 * LatestAnnouncement.js
 * 
 * This is a React component that fetches and displays the latest announcement.
 * 
 * The component uses the useState hook to manage the state for the announcement.
 * The useEffect hook is used to fetch the latest announcement from the server when the component mounts.
 * 
 * The announcement is fetched from the `/announcements/latest` endpoint. If the fetch operation fails, a default announcement is displayed.
 * 
 * The fetched announcement is displayed in a detailed view. If the user's status is not 0, clicking on the announcement navigates to the '/all-announcements' page.
 * 
 * @module components/LatestAnnouncement
 */

import React, { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import axios from "axios";
import './LatestAnnouncement.scss'
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const LatestAnnouncement = () => {
    const [announcement, setAnnouncement] = useState(null);
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get("/announcements/latest")
            .then((response) => {
                setAnnouncement(response.data);
            })
            .catch(() => {
                const contentString = "Announcements will be displayed in this section. If no announcements are currently visible, it may be due to one of the following reasons: \n1) Your account is pending verification. \n2) There have been no recent announcements. Please check back later for updates.";
                const contentArray = contentString.split('\n');
                const contentJSX = contentArray.map((line, index) => <p key={index}>{line}<br /></p>);

                setAnnouncement({
                    Title: "Announcements Section",
                    Content: contentJSX
                });
            });
    }, []);

    return (
        <Col md={6} className='bg-dark-purple text-light p-3 rounded-md text-break shadow-md-screen latest-announcement'>
            {announcement ? (
                <div onClick={() => { if (user && user.Status !== 0) navigate('/all-announcements'); }} className="text-decoration-none text-light">
                    <div className="pt-3 text-center">
                        <h3 className="gradient-text">Latest Announcement!</h3>
                        <h4 className="fw-bold">{announcement.Title}</h4>
                        <p className="lead slab-font">{announcement.Content}</p>
                    </div>
                </div>
            ) : (
                ""
            )}
        </Col>
    );
};

export default LatestAnnouncement;