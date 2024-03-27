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