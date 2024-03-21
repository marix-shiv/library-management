import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

// Mock window.scrollTo
global.window.scrollTo = jest.fn();

test('renders App component', () => {
    render(
        <Router>
            <App />
        </Router>
    );
    const navbarElement = screen.getByRole('navigation');
    const homeElement = screen.getByRole('main');
    const footerElement = screen.getByRole('contentinfo');
    expect(navbarElement).toBeInTheDocument();
    expect(homeElement).toBeInTheDocument();
    expect(footerElement).toBeInTheDocument();
});