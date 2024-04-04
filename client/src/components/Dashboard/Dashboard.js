/**
 * Dashboard.js
 * 
 * This is the main dashboard component of the application. It displays different content based on the user's role and verification status.
 * 
 * The component uses the useState and useSelector hooks to manage the state and access the Redux store. It also uses the useMediaQuery hook to adapt to different screen sizes.
 * 
 * Depending on the user's role and verification status, the component displays one of the following: UnverifiedDashboard, AdminDashboard, UserDashboard, SuperAdminDashboard, or LibrarianDashboard.
 * 
 * The component also includes a card flip animation that displays a welcome message on one side and the user's role on the other. On small screens, the card flip is replaced with a simple welcome message.
 * 
 * @module components/Dashboard
 */

import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import UnverifiedDashboard from './UnverifiedDashboard';
import ReactCardFlip from 'react-card-flip';
import UserDashboard from './UserDashboard';
import LibrarianDashboard from './LibrarianDashboard';
import LatestAnnouncement from '../Announcement/LatestAnnouncement';
import { Link } from 'react-router-dom';
import ProfileImage from '../../assets/profile.png'
import {REVERSE_ROLE_MAPPING} from '../../constants/roleConstants';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import SuperAdminDashboard from './SuperAdminDashboard';
import AdminDashboard from './AdminDashboard';

const Dashboard = () => {
    const user = useSelector((state) => state.user);
    const [isFlipped, setIsFlipped] = useState(false);
    const handleFlipClick = () => {
        setIsFlipped(!isFlipped);
    };
    const isSmallScreen = useMediaQuery({ query: '(max-width: 767px)' });
    const navigate = useNavigate();

    return (
        <Container>
            <Row className="py-md-3 justify-content-between">
                {isSmallScreen ? (
                    <Col className='bg-medium-dark text-primary p-3 p-md-5 rounded-md text-break shadow-md-screen'
                    onClick={() => { if (user && user.Status !== 0) navigate('/my-profile'); }}>
                        <h1>Welcome, {user ? user.Username : ''}!👋</h1>
                        {user && user.Status !== 0 && <p>Click here to view your profile</p>}
                    </Col>
                ) : (
                    <Col md={5}>
                        <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
                            <div className='bg-medium-dark text-primary p-3 p-md-5 rounded-md text-break shadow-md-screen' onClick={handleFlipClick}>
                                <h1>Welcome, {user ? user.Username : ''}!👋</h1>
                                <p>Click here to view your profile</p>
                            </div>
                        
                            <div className='bg-dark-purple text-light p-3 p-md-5 rounded-md shadow-md-screen text-end' onClick={handleFlipClick}>
                                <h1 className='gradient-text'>{user ? REVERSE_ROLE_MAPPING[user.Role] : ''}</h1>
                                {user && user.Status !== 0 ? (
                                    <Link to="/my-profile" style={{"textDecoration": "none"}} className='link-shift lead slab-font text-primary bg-medium-dark ps-5 py-2 rounded-pill d-flex align-items-center justify-content-center'>
                                        See Profile 
                                        <img src={ProfileImage} alt="Profile" style={{maxHeight: '22%', maxWidth: '22%'}} className='ms-5 me-2' />
                                    </Link>
                                ) : (
                                    <p>This feature is available for verified users only.</p>
                                )}
                            </div>
                        </ReactCardFlip>
                    </Col>
                )}
                <LatestAnnouncement />
                <Col md={12} className='bg-medium-dark text-primary p-3 mb-3 my-md-3 rounded-md text-break justify-content-center align-items-middle text-center shadow-md-screen'>
                    {user && user.Status === 0 ? (
                        <UnverifiedDashboard />
                    ) : (
                        <>
                            {user && user.Role === 'A' && (
                                <div>
                                    <h2 className='display-6'>Admin Functions </h2>
                                    <AdminDashboard />
                                </div>
                            )}

                            {user && user.Role === 'U' && (
                                <div>
                                    <h2 className='display-6'>Books at your Fingertips!☝️</h2>
                                    <UserDashboard />
                                </div>
                            )}

                            {user && user.Role === 'S' && (
                                <div>
                                    <h2 className='display-6'>Super Admin Functions</h2>
                                    <SuperAdminDashboard />
                                </div>
                            )}

                            {user && user.Role === 'L' && (
                                <div>
                                    <h2 className='display-6'>Librarian Hub 📖</h2>
                                    <LibrarianDashboard />
                                </div>
                            )}
                        </>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default Dashboard;