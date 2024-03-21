import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

test('renders footer content', () => {
    render(<Footer />);
    const copyrightElement = screen.getByText(/© 2024 Online Library Management System/i);
    const licenseLinkElement = screen.getByText(/License/i);
    expect(copyrightElement).toBeInTheDocument();
    expect(licenseLinkElement).toBeInTheDocument();
});