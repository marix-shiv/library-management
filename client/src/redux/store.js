import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import sidebarReducer from './sidebarSlice';

export default configureStore({
    reducer: {
        user: userReducer,
        sidebar: sidebarReducer,
    },
});