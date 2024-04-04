/**
 * Sidebar.js
 * 
 * This is a React component that displays a sidebar with navigation links. The sidebar can be shown or hidden, and includes different links based on the user's role.
 * 
 * The component uses the react-bootstrap library for the UI, the react-redux library to access the Redux store, and the PropTypes library to type check the props.
 * 
 * The Sidebar function takes two props: show and handleClose. The show prop is a boolean that determines whether the sidebar is shown or hidden. The handleClose prop is a function that is called when the sidebar is closed.
 * 
 * The role of the user is fetched from the Redux store. The roleLinks object contains arrays of links for each role. Each link is an object with a href property for the URL and a text property for the link text. Some links also have a dropdown property with an array of sublinks.
 * 
 * The return statement renders the sidebar. The sidebar includes a header with a title and a close button, and a body with a navigation list. The navigation list includes a link to the dashboard and the links for the user's role. Each link is either a Nav.Link component or a NavDropdown component with NavDropdown.Item components for the sublinks.
 * 
 * The Sidebar function is type checked with PropTypes. The show prop is required and must be a boolean. The handleClose prop is required and must be a function.
 * 
 * @module components/Sidebar
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Offcanvas, Nav, NavDropdown } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import './Sidebar.scss';

const Sidebar = ({ show, handleClose }) => {
    const role = useSelector(state => state.user.Role);

    const roleLinks = {
        U: [
            { href: '/my-reservations', text: 'My Reservations 🔒' },
            { 
                text: 'Book Functions 📚', 
                dropdown: [
                    { href: '/all-books', text: 'All Books' },                    
                    { href: '/search-book', text: 'Search Book' },
                ]
            },
            { 
                text: 'Genre Functions 🏷️', 
                dropdown: [
                    { href: '/all-genres', text: 'All Genres' },
                    { href: '/search-genre', text: 'Search Genre' },
                ]
            },
            { 
                text: 'Author Functions ✍️', 
                dropdown: [
                    { href: '/all-authors', text: 'All Authors' },
                    { href: '/search-author', text: 'Search Author' },
                ]
            },
            { 
                text: 'Book Instances Functions 📖', 
                dropdown: [
                    { href: '/all-book-instances', text: 'All Book Instances' },
                    { href: '/search-book-instance', text: 'Search Book Instance' },
                ]
            },
            { 
                text: 'Announcements Functions 📢', 
                dropdown: [
                    { href: '/all-announcements', text: 'All Announcements' },
                    { href: '/search-announcements', text: 'Search Announcement' },
                ]
            },
            { 
                text: 'Policy Functions 📜', 
                dropdown: [
                    { href: '/all-policies', text: 'All Policies'},
                    { href: '/search-policies', text: 'Search Policy'},
                ]
            },
        ],
        S: [
            { 
                text: 'Book Functions 📚', 
                dropdown: [
                    { href: '/all-books', text: 'All Books' },
                    { href: '/add-book', text: 'Add Book' },
                    { href: '/search-book', text: 'Search Book' },
                    { href: '/receive-book', text: 'Receive Book' },
                    { href: '/reserve-book-librarian', text: 'Reserve Book' },
                    { href: '/issue-book', text: 'Issue Book' },
                ]
            },
            { 
                text: 'Genre Functions 🏷️', 
                dropdown: [
                    { href: '/all-genres', text: 'All Genres' },
                    { href: '/add-genre', text: 'Add Genre' },
                    { href: '/search-genre', text: 'Search Genre' },
                ]
            },
            { 
                text: 'Author Functions ✍️', 
                dropdown: [
                    { href: '/all-authors', text: 'All Authors' },
                    { href: '/add-author', text: 'Add Author' },
                    { href: '/search-author', text: 'Search Author' },
                ]
            },
            { 
                text: 'Reservations Functions 🔒', 
                dropdown: [
                    { href: '/all-reservations', text: 'All Reservations' },
                    { href: '/search-reservation', text: 'Search Reservation' },
                ]
            },
            { 
                text: 'Book Instances Functions 📖', 
                dropdown: [
                    { href: '/all-book-instances', text: 'All Book Instances' },
                    { href: '/add-book-instance', text: 'Add Book Instance' },
                    { href: '/search-book-instance', text: 'Search Book Instance' },
                ]
            },
            { 
                text: 'Announcements Functions 📢', 
                dropdown: [
                    { href: '/all-announcements', text: 'All Announcements' },
                    { href: '/search-announcements', text: 'Search Announcement' },
                    { href: '/announcement-by-date', text: 'Search Announcement by Date' },
                ]
            },
            { 
                text: 'Policy Functions 📜', 
                dropdown: [
                    { href: '/all-policies', text: 'All Policies'},
                    { href: '/add-policy', text: 'Add Policy'},
                    { href: '/search-policies', text: 'Search Policy'},
                ]
            },
        ],
        L: [
            { 
                text: 'Book Functions 📚', 
                dropdown: [
                    { href: '/all-books', text: 'All Books' },
                    { href: '/add-book', text: 'Add Book' },
                    { href: '/search-book', text: 'Search Book' },
                    { href: '/receive-book', text: 'Receive Book' },
                    { href: '/reserve-book-librarian', text: 'Reserve Book' },
                    { href: '/issue-book', text: 'Issue Book' },
                ]
            },
            { 
                text: 'Genre Functions 🏷️', 
                dropdown: [
                    { href: '/all-genres', text: 'All Genres' },
                    { href: '/add-genre', text: 'Add Genre' },
                    { href: '/search-genre', text: 'Search Genre' },
                ]
            },
            { 
                text: 'Author Functions ✍️', 
                dropdown: [
                    { href: '/all-authors', text: 'All Authors' },
                    { href: '/add-author', text: 'Add Author' },
                    { href: '/search-author', text: 'Search Author' },
                ]
            },
            { 
                text: 'Reservations Functions 🔒', 
                dropdown: [
                    { href: '/all-reservations', text: 'All Reservations' },
                    { href: '/search-reservation', text: 'Search Reservation' },
                ]
            },
            { 
                text: 'Book Instances Functions 📖', 
                dropdown: [
                    { href: '/all-book-instances', text: 'All Book Instances' },
                    { href: '/add-book-instance', text: 'Add Book Instance' },
                    { href: '/search-book-instance', text: 'Search Book Instance' },
                ]
            },
            { 
                text: 'Announcements Functions 📢', 
                dropdown: [
                    { href: '/all-announcements', text: 'All Announcements' },
                    { href: '/search-announcements', text: 'Search Announcement' },
                    { href: '/announcement-by-date', text: 'Search Announcement by Date' },
                ]
            },
            { 
                text: 'Policy Functions 📜', 
                dropdown: [
                    { href: '/all-policies', text: 'All Policies'},
                    { href: '/search-policies', text: 'Search Policy'},
                ]
            },
            { 
                text: 'Budget Functions 💰', 
                dropdown: [
                    { href: '/all-budgets', text: 'All Budgets' },
                    { href: '/add-budget', text: 'Add Budget' },
                    { href: '/search-budgets', text: 'Search Budget by Description' },
                    { href: '/budget-by-date', text: 'Search Budget by Date' },
                    { href: '/budget-by-money', text: 'Search Budget by Money' },
                ]
            },
        ],
        A: [
            { 
                text: 'Budget Functions 💰', 
                dropdown: [
                    { href: '/all-budgets', text: 'All Budgets' },
                    { href: '/add-budget', text: 'Add Budget' },
                    { href: '/search-budgets', text: 'Search Budget by Description' },
                    { href: '/budget-by-date', text: 'Search Budget by Date' },
                    { href: '/budget-by-money', text: 'Search Budget by Money' },
                ]
            },
            { 
                text: 'Announcements Functions 📢', 
                dropdown: [
                    { href: '/all-announcements', text: 'All Announcements' },
                    { href: '/add-announcement', text: 'Add Announcement' },
                    { href: '/search-announcements', text: 'Search Announcement by Title' },
                    { href: '/announcement-by-date', text: 'Search Announcement by Date' },
                ]
            },
            { 
                text: 'Policy Functions 📜', 
                dropdown: [
                    { href: '/all-policies', text: 'All Policies'},
                    { href: '/add-policy', text: 'Add Policy'},
                    { href: '/search-policies', text: 'Search Policy'},
                ]
            },
            { 
                text: 'Book Functions 📚', 
                dropdown: [
                    { href: '/all-books', text: 'All Books' },                    
                    { href: '/search-book', text: 'Search Book' },
                ]
            },
            { 
                text: 'Genre Functions 🏷️', 
                dropdown: [
                    { href: '/all-genres', text: 'All Genres' },
                    { href: '/search-genre', text: 'Search Genre' },
                ]
            },
            { 
                text: 'Author Functions ✍️', 
                dropdown: [
                    { href: '/all-authors', text: 'All Authors' },
                    { href: '/search-author', text: 'Search Author' },
                ]
            },
            { 
                text: 'Book Instances Functions 📖', 
                dropdown: [
                    { href: '/all-book-instances', text: 'All Book Instances' },
                    { href: '/search-book-instance', text: 'Search Book Instance' },
                ]
            },
        ],
    };

    return (
        <Offcanvas show={show} onHide={handleClose} placement="start" className="bg-light p-2 text-dark-purple">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title className='slab-font '>Toolbox 🧰</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body >
                <Nav className="flex-column">
                    <Nav.Link href="/dashboard">Home</Nav.Link>
                    {roleLinks[role]?.map((link, index) => (
                        link.dropdown ? (
                            <NavDropdown key={index} title={link.text} id="basic-nav-dropdown" className='bg-light'>
                                {link.dropdown.map((sublink, subIndex) => (
                                    <NavDropdown.Item key={subIndex} href={sublink.href}>{sublink.text}</NavDropdown.Item>
                                ))}
                            </NavDropdown>
                        ) : (
                            <Nav.Link key={link.href} href={link.href}>{link.text}</Nav.Link>
                        )
                    ))}
                </Nav>
            </Offcanvas.Body>
        </Offcanvas>
    );
};

Sidebar.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
};

export default Sidebar;