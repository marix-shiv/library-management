/**
 * store.js
 * 
 * This is a Redux store that combines the user and sidebar reducers.
 * 
 * The module imports the `configureStore` function from the Redux Toolkit, and the `userReducer` and `sidebarReducer` from the userSlice and sidebarSlice respectively.
 * 
 * The `configureStore` function is called with an object that has a `reducer` property. The `reducer` property is an object that maps the 'user' and 'sidebar' keys to the `userReducer` and `sidebarReducer` respectively.
 * 
 * The store is exported as the default export for use in the application.
 * 
 * @module redux/store
 */

import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import sidebarReducer from './sidebarSlice';

export default configureStore({
    reducer: {
        user: userReducer,
        sidebar: sidebarReducer,
    },
});