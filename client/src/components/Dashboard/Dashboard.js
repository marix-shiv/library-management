import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import UnverifiedDashboard from './UnverifiedDashboard';
import { ArrowRightCircleFill } from 'react-bootstrap-icons';

import UserDashboard from './UserDashboard';
import LibrarianDashboard from './LibrarianDashboard';
import LatestAnnouncement from '../Announcement/LatestAnnouncement';
import Sidebar from '../Sidebar/Sidebar';
import './Dashboard.scss';

const Dashboard = () => {
    const user = useSelector((state) => state.user);
    const [showSidebar, setShowSidebar] = useState(false);

    const handleShowSidebar = () => setShowSidebar(true);
    const handleCloseSidebar = () => setShowSidebar(false);  

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
                    <Col md={5} className='bg-medium-dark text-primary p-3 p-md-5 rounded-md text-break shadow-md-screen'>
                        <h1>Welcome, {user ? user.Username : ''}!👋</h1>
                    </Col>
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