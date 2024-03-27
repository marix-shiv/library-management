import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import HomeImage from "../../assets/home.png";
import ReaderImage from "../../assets/reader.png";
import LibrarianImage from "../../assets/librarian.png";
import AdminImage from "../../assets/admin.png";
import SuperAdminImage from "../../assets/superadmin.png";
import Github from "../../assets/github.png";
import "./Home.scss";
import { Link } from 'react-router-dom';

// Home component
function Home() {
return (
    <main role="main">
    <Container>
        <Row className="justify-content-center align-items-center my-4">
        <Col md={7} className="p-4 text-center">
            <p className="h2 fw-bold slab-font text-primary">
            EMPOWERING MINDS,
            </p>
            <p className="h2 fw-bold slab-font text-primary">
            ONE PAGE AT A TIME!
            </p>
            <div className="d-flex justify-content-center">
            <a
                href="/login"
                className="btn btn-primary btn-lg mt-3 px-5 py-2 rounded-pill text-light fw-bold"
            >
                START READING
            </a>
            </div>
        </Col>

        <Col md={5}>
            <img
            src={HomeImage}
            alt="description"
            className="img-fluid image-scale"
            />
        </Col>
        </Row>
        <hr />
        {/* Roles Sign Up Section*/}
        <Row className="justify-content-center align-items-center text-center d-flex g-3 mx-3 my-1">
        <Col md={12}>
        <h2 className="display-6 slab-font">Choose Your Role</h2>
        </Col>
        {/* Each Card represents a role */}
        <Col lg={3} md={8}>
            <Card className="h-100 bg-card card-hover">
            <Card.Body className="d-flex flex-column">
                <Card.Title>Do You Love Reading Books?</Card.Title>
                <Card.Img variant="top" src={ReaderImage} className="my-3" />
                <Link
                to='/signup'
                className="btn btn-primary mt-auto rounded-pill text-light"
                >
                Register as Reader
                </Link>
            </Card.Body>
            </Card>
        </Col>
        <Col lg={3} md={8}>
            <Card className="h-100 bg-card card-hover">
            <Card.Body className="d-flex flex-column">
                <Card.Title>Ready to Curate Wisdom?</Card.Title>
                <Card.Img variant="top" src={LibrarianImage} className="my-3" />
                <Link
                to='/signup'
                className="btn btn-primary mt-auto rounded-pill text-light"
                >
                Join us as Librarian
                </Link>
            </Card.Body>
            </Card>
        </Col>
        <Col lg={3} md={8}>
            <Card className="h-100 bg-card card-hover">
            <Card.Body className="d-flex flex-column">
                <Card.Title>Want to Empower Libraries?</Card.Title>
                <Card.Img variant="top" src={AdminImage} className="my-3" />
                <Link
                to='/signup'
                className="btn btn-primary mt-auto rounded-pill text-light"
                >
                Become a Lib Admin
                </Link>
            </Card.Body>
            </Card>
        </Col>
        <Col lg={3} md={8}>
            <Card className="h-100 bg-card card-hover">
            <Card.Body className="d-flex flex-column">
                <Card.Title>Want To Supercharge Libraries?</Card.Title>
                <Card.Img
                variant="top"
                src={SuperAdminImage}
                className="my-3"
                />
                <Link
                to='/signup'
                className="btn btn-primary mt-auto rounded-pill text-light"
                >
                Be a Super Admin
                </Link>
            </Card.Body>
            </Card>
        </Col>
        </Row>
    </Container>
    
    <div className="bg-primary text-light px-5 py-4 mt-5">
        {/* About Section */}
        <Row id="about">
        <Col md={12} className="text-center">
            <h2 className="display-6 slab-font my-3">About</h2>
            <p className="lead my-4">
            Welcome to the Online Library Management System (OLMS), a
            comprehensive solution designed to simplify library operations and
            enhance user experience. Developed as a college project, OLMS is
            aimed at providing an efficient and user-friendly interface for
            accessing library resources and services online.
            </p>
            <p className="lead my-5">
            OLMS is developed by Priyansh Dimri and Prashant Pal at Delhi
            Technological University. This project contributes to our academic
            journey and showcases our skills and understanding of software
            engineering principles.
            </p>
        </Col>
        </Row>
        {/* Features Section */}
        <Row className="justify-content-center align-items-center text-center d-flex g-3">
        {/* Each Card represents a feature */}
        <Col md={3}>
            <Card className="h-100 bg-card card-hover">
            <Card.Header className="fw-bold bg-medium-dark">
                Online Library Services
            </Card.Header>
            <Card.Body className="d-flex flex-column">
                <Card.Text className="card-text-small fw-light">
                Check, reserve and renew books online. Librarians can issue
                books and manage book instances. Admins can set library
                policies and manage the library budget.
                </Card.Text>
            </Card.Body>
            </Card>
        </Col>
        <Col md={3}>
            <Card className="h-100 bg-card card-hover">
            <Card.Header className="fw-bold bg-medium-dark">
                Security Related Features
            </Card.Header>
            <Card.Body className="d-flex flex-column">
                <Card.Text className="card-text-small fw-light">
                Includes validation and sanitization to protect against major
                attacks. Uses JWT tokens and cookies for secure and seamless
                session management.
                </Card.Text>
            </Card.Body>
            </Card>
        </Col>
        <Col md={3}>
            <Card className="h-100 bg-card card-hover">
            <Card.Header className="fw-bold bg-medium-dark">
                Role-Based Access Control
            </Card.Header>
            <Card.Body className="d-flex flex-column">
                <Card.Text className="card-text-small fw-light">
                Supports different user roles with specific access rights,
                ensuring that users can only perform those actions that are
                appropriate for their specified role.
                </Card.Text>
            </Card.Body>
            </Card>
        </Col>
        <Col md={3}>
            <Card className="h-100 bg-card card-hover">
            <Card.Header className="fw-bold bg-medium-dark">
                Announcements System
            </Card.Header>
            <Card.Body className="d-flex flex-column">
                <Card.Text className="card-text-small fw-light">
                Displays the latest announcements on the homepage, thus
                allowing important information to be communicated to each and
                every user quickly and efficiently.
                </Card.Text>
            </Card.Body>
            </Card>
        </Col>
        </Row>
        <hr />
        {/* Github Link Section */}
        <Row className="justify-content-center align-items-center text-center">
        <Col md={12}>
            <p className="lead slab-font">Check it out on Github</p>
        </Col>
        <Col sm={2}>
            <a href="https://github.com/PriyanshDimri/library-management">
            <img
                src={Github}
                alt="GitHub"
                className="img-fluid flip-image github-image"
            />
            </a>
        </Col>
        </Row>
    </div>
    </main>
);
}

export default Home;
