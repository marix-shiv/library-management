import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Signup from './SignUp';

// Mock the axios module
jest.mock('axios', () => ({
    get: jest.fn(),
    post: jest.fn(),
}));

describe('Signup', () => {
    it('renders correctly', () => {
        render(
            <Router>
                <Signup />
            </Router>
        );

        expect(screen.getByPlaceholderText('Enter first name')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Enter last name')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Enter username')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
        expect(screen.getByText('SUBMIT')).toBeInTheDocument();
    });

    // Add more tests as needed
});