/**
 * axiosConfig.js
 * 
 * This is a Node.js module that configures axios, a promise-based HTTP client, to handle 401 Unauthorized responses.
 * 
 * The module imports axios, the Redux store, and the clearStore action from the userSlice.
 * 
 * An interceptor is added to the axios response using the axios.interceptors.response.use method. This interceptor takes two functions: one for the response and one for the error.
 * 
 * The response function simply returns the response as is.
 * 
 * The error function checks if the error has a response and if the status of the response is 401. If the status is 401, the clearStore action is dispatched to the Redux store to clear the user data. The error is then rejected with the Promise.reject method.
 * 
 * @module axiosConfig
 */

import axios from 'axios';
import store from '../redux/store';
import { clearStore } from '../redux/userSlice';

// If REACT_APP_BACKEND_URL is defined, set it as the base URL for axios
if (process.env.REACT_APP_BACKEND_URL) {
    axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL;
}

axios.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            store.dispatch(clearStore());
        }
        return Promise.reject(error);
    }
);