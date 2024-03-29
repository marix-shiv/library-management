import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import UnverifiedDashboard from './UnverifiedDashboard';
import { ArrowRightCircleFill } from 'react-bootstrap-icons';
import ReactCardFlip from 'react-card-flip';
import UserDashboard from './UserDashboard';
import LibrarianDashboard from './LibrarianDashboard';
import LatestAnnouncement from '../Announcement/LatestAnnouncement';
import Sidebar from '../Sidebar/Sidebar';
import { Link } from 'react-router-dom';
import './Dashboard.scss';
import ProfileImage from '../../assets/profile.png'
import {REVERSE_ROLE_MAPPING} from '../../constants/roleConstants';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const user = useSelector((state) => state.user);
    const [showSidebar, setShowSidebar] = useState(false);
    const [isFlipped, setIsFlipped] = useState(false);
    const handleShowSidebar = () => setShowSidebar(true);
    const handleCloseSidebar = () => setShowSidebar(false);  
    const handleFlipClick = () => {
        setIsFlipped(!isFlipped);
    };
    const isSmallScreen = useMediaQuery({ query: '(max-width: 767px)' });
    const navigate = useNavigate();

    return (
        <>
            {!showSidebar && (
                <ArrowRightCircleFill
                    className="dark-purple-arrow"
                    size={50}
                    style={{
                        position: 'fixed',
                        bottom: '20px',
                        left: '20px',
                        cursor: 'pointer',
                        zIndex: 1000
                    }}
                    onClick={handleShowSidebar}
                />
            )}
            <Sidebar show={showSidebar} handleClose={handleCloseSidebar} />
            <Container>
                <Row className="py-md-3 justify-content-between">
                    {isSmallScreen ? (
                        <Col className='bg-medium-dark text-primary p-3 p-md-5 rounded-md text-break shadow-md-screen'
                        onClick={()=> navigate('/my-profile')}>
                            <h1>Welcome, {user ? user.Username : ''}!👋</h1>
                            <p>Click here to view your profile</p>
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
                                    <Link to="/my-profile" style={{"textDecoration": "none"}} className='link-shift lead slab-font text-primary bg-medium-dark ps-5 py-2 rounded-pill d-flex align-items-center justify-content-center'>
                                        See Profile 
                                        <img src={ProfileImage} alt="Profile" style={{maxHeight: '22%', maxWidth: '22%'}} className='ms-5 me-2' />
                                    </Link>
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
                                        <h2>Admin Functions </h2>
                                        {/* Render admin functions here */}
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
                                        <h2>Super Admin Functions</h2>
                                        {/* Render admin functions here */}
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
        </>
    );
};

export default Dashboard;