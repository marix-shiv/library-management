import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from './NotFound';

test('renders NotFound component', () => {
    render(<NotFound />);
    const error404 = screen.getByText(/404/i);
    const errorText = screen.getByText(/Oops, page not found!/i);
    const errorDescription = screen.getByText(/The page you're looking for doesn't exist./i);
    expect(error404).toBeInTheDocument();
    expect(errorText).toBeInTheDocument();
    expect(errorDescription).toBeInTheDocument();
});