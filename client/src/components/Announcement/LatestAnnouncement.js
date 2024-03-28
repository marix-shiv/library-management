import React, { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import './LatestAnnouncement.scss'

const LatestAnnouncement = () => {
    const [announcement, setAnnouncement] = useState(null);

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
                <Link to="/announcements" className="text-decoration-none text-light">
                    <div className="pt-3 text-center">
                        <h3 className="gradient-text">Latest Announcement!</h3>
                        <h4 className="fw-bold">{announcement.Title}</h4>
                        <p className="lead slab-font">{announcement.Content}</p>
                    </div>
                </Link>
            ) : (
                ""
            )}
        </Col>
    );
};

export default LatestAnnouncement;