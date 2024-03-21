import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import NavigationBar from './Navbar';

test('renders navigation bar content', () => {
    render(
        <Router>
            <NavigationBar />
        </Router>
    );
    const brandElement = screen.getByAltText(/OLMS logo/i);
    const aboutLinkElement = screen.getByText(/About/i);
    const loginLinkElement = screen.getByText(/Login/i);
    const signupLinkElement = screen.getByText(/Signup/i);
    expect(brandElement).toBeInTheDocument();
    expect(aboutLinkElement).toBeInTheDocument();
    expect(loginLinkElement).toBeInTheDocument();
    expect(signupLinkElement).toBeInTheDocument();
});