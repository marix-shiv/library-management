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