import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

function NavigationBar() {
return (
    <Navbar bg="dark" variant="dark" expand="md" role="navigation">
    {/* Brand logo and name */}
    <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
        <img
        src="/icons/OLMS_logo.png"
        height="70"
        className="d-inline-block align-top mx-3"
        alt="OLMS logo"
        />
        <div className="m-1 h2 slab-font text-light">OLMS</div>
    </Navbar.Brand>
    {/* Navigation links */}
    <Navbar.Toggle aria-controls="basic-navbar-nav" className="mx-3"/>
    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        <Nav>
        <Nav.Link as={Link} to="/#about" className="px-3 lead text-light slab-font">
            About
        </Nav.Link>
        <Nav.Link as={Link} to="/" className="px-3 lead text-light slab-font">
            Login
        </Nav.Link>
        <Nav.Link as={Link} to="/" className="px-3 lead text-light slab-font">
            Signup
        </Nav.Link>
        </Nav>
    </Navbar.Collapse>
    </Navbar>
);
}

export default NavigationBar;
