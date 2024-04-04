/**
 * index.js
 * 
 * This is the entry point of the React application. It imports the necessary modules, creates a root, renders the App component into the root, and reports web vitals.
 * 
 * The React, createRoot, BrowserRouter, App, and reportWebVitals modules are imported. The axiosConfig middleware is also imported to configure axios.
 * 
 * The root of the application is fetched with document.getElementById('root').
 * 
 * The createRoot function is called with the root and the render method is called on the result. The render method takes the App component wrapped in BrowserRouter and React.StrictMode. BrowserRouter is used for routing in the application. React.StrictMode is a wrapper component that checks for potential problems in the application during development.
 * 
 * The reportWebVitals function is called to measure and report on various aspects of the application's performance.
 * 
 * @module index
 */

import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './components/App/App';
import reportWebVitals from './reportWebVitals';
import '../src/middlewares/axiosConfig';

const root = document.getElementById('root');
createRoot(root).render(
    <React.StrictMode>
        <Router>
            <App />
        </Router>
    </React.StrictMode>
);

reportWebVitals();