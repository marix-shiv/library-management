/**
 * Navbar.js
 * 
 * This is a React component that displays the navigation bar of the application. It includes links to the home, about, login, signup, and dashboard pages, and a logout button.
 * 
 * The component uses the useState, useEffect, useRef, useSelector, useDispatch, and useNavigate hooks to manage the state, side effects, DOM references, Redux store, and navigation. It also uses the react-bootstrap library for the UI and the axios library to send HTTP requests.
 * 
 * The expanded state is used to manage the expanded/collapsed state of the navigation bar. The navbarRef is used to reference the navigation bar element. The user is fetched from the Redux store. The dispatch function is used to dispatch actions to the Redux store. The navigate function is used to navigate to different routes.
 * 
 * The handleClickOutside function is used to handle click events outside the navigation bar. If the click event's target is outside the navigation bar, the navigation bar is collapsed.
 * 
 * The handleLogout function is used to handle the logout operation. It sends a POST request to the `/users/logout` endpoint, removes the user from the Redux store, navigates to the home page, and collapses the navigation bar.
 * 
 * The useEffect hook is used to add/remove the click event listener based on the expanded state. If the navigation bar is expanded, the click event listener is added. If the navigation bar is collapsed, the click event listener is removed. The click event listener is also removed when the component unmounts.
 * 
 * The return statement renders the navigation bar. The navigation bar includes a brand logo and name, and links to the home, about, login, signup, and dashboard pages. The links are only displayed if the user is logged in. The logout button is only displayed if the user is logged in.
 * 
 * @module components/Navbar
 */

import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';
import { clearStore } from "../../redux/userSlice";
import {toast} from 'react-toastify';

function NavigationBar() {
// State variable for managing the expanded/collapsed state of the navbar
const [expanded, setExpanded] = useState(false);

// Reference to the navbar element
const navbarRef = useRef(null);

// Access the user from the Redux store
const user = useSelector(state => state.user);

// Access the dispatch function from Redux
const dispatch = useDispatch();

const navigate = useNavigate();

// Function to handle click events outside the navbar
const handleClickOutside = (event) => {
    // If the click event's target is outside the navbar, collapse the navbar
    if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setExpanded(false);
    }
};

// Function to handle logout
const handleLogout = () => {
    axios.post('/users/logout')
        .then(() => {
            // Remove the user from the Redux store
            dispatch(clearStore());

            // Navigate to the / route
            navigate('/');

            // Collapse the navbar
            setExpanded(false);
        })
        .catch(() => {
            toast.error('Error logging out');
        });
};

// Effect hook to add/remove the click event listener based on the expanded state
useEffect(() => {
    // If the navbar is expanded, add the click event listener
    if (expanded) {
        document.addEventListener("click", handleClickOutside);
    } else {
        // If the navbar is collapsed, remove the click event listener
        document.removeEventListener("click", handleClickOutside);
    }

    // Cleanup function to remove the click event listener when the component unmounts
    return () => {
        document.removeEventListener("click", handleClickOutside);
    };
}, [expanded]); // Dependency array includes expanded state to re-run the effect when it changes

return (
    <Navbar ref={navbarRef} bg="dark" variant="dark" expand="md" role="navigation" expanded={expanded} onToggle={setExpanded} >

    {/* Brand logo and name */}
    <Navbar.Brand as={Link} to={user.Username ? "/dashboard" : "/"} className="d-flex align-items-center">
        <img
        src="/icons/OLMS_logo.png"
        height="70"
        className="d-inline-block align-top mx-3 icon-tilt"
        alt="OLMS logo"
        />

        <div className="m-1 h2 slab-font text-light">OLMS</div>
    </Navbar.Brand>

    {/* Navigation links */}
    <Navbar.Toggle aria-controls="basic-navbar-nav" className="mx-3" onClick={()=> setExpanded(prevExpanded => !prevExpanded)} />

    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        <Nav>
            <Nav.Link as={Link} to="/#about" className="px-3 lead text-light slab-font" onClick={() => setExpanded(false)}>
                About
            </Nav.Link>

            {user.Username ? (
                <>
                    <Nav.Link onClick={handleLogout} className="px-3 lead text-light slab-font">
                        Logout
                    </Nav.Link>
                    <Nav.Link as={Link} to="/dashboard" className="px-3 lead text-light slab-font" onClick={() => setExpanded(false)}>
                        Dashboard
                    </Nav.Link>
                </>
            ) : (
                <>
                    <Nav.Link as={Link} to="/login" className="px-3 lead text-light slab-font" onClick={() => setExpanded(false)}>
                        Login
                    </Nav.Link>

                    <Nav.Link as={Link} to="/signup" className="px-3 lead text-light slab-font" onClick={() => setExpanded(false)}>
                        Signup
                    </Nav.Link>
                </>
            )}
        </Nav>
    </Navbar.Collapse>

    </Navbar>
);
}

export default NavigationBar;
