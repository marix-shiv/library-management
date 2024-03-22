import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import Login from './Login';
import { BrowserRouter as Router } from 'react-router-dom';

// Mock the axios module
jest.mock('axios', () => ({
    post: jest.fn(),
}));

describe('Login', () => {
    it('renders correctly', () => {
        render(<Router><Login /></Router>);
        expect(screen.getByPlaceholderText('Enter username')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    });

    it('allows the user to login successfully', async () => {
        // Import the mocked axios module
        const axios = require('axios');
        axios.post.mockResolvedValueOnce({
            data: {},
            status: 200,
        });

        render(<Router><Login /></Router>);
        fireEvent.change(screen.getByPlaceholderText('Enter username'), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'testpass' } });
        fireEvent.click(screen.getByText('SUBMIT'));

        await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));
        expect(axios.post).toHaveBeenCalledWith('/users/login', {
            Username: 'testuser',
            Password: 'testpass',
        });
    });
});