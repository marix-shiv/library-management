import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './Home';

test('renders home page content', () => {
    render(<Home />);
    const headingElement = screen.getByText(/EMPOWERING MINDS,/i);
    const paragraphElement = screen.getByText(/Welcome to the Online Library Management System/i);
    const aboutElement = screen.getByText(/About/i);
    const featureElement = screen.getByText(/Online Library Services/i);
    const githubElement = screen.getByText(/Check it out on Github/i);
    expect(headingElement).toBeInTheDocument();
    expect(paragraphElement).toBeInTheDocument();
    expect(aboutElement).toBeInTheDocument();
    expect(featureElement).toBeInTheDocument();
    expect(githubElement).toBeInTheDocument();
});