/**
 * sidebarSlice.js
 * 
 * This is a Redux slice that manages the state of the sidebar. It includes actions to show and hide the sidebar and a reducer to handle these actions.
 * 
 * The initial state of the sidebar is set to an object with a property `isVisible` which is set to false.
 * 
 * The `createSlice` function from the Redux Toolkit is used to generate the slice. The `createSlice` function takes an object with a `name`, `initialState`, and `reducers` property.
 * 
 * The `name` property is set to 'sidebar'.
 * 
 * The `initialState` property is set to the initial state.
 * 
 * The `reducers` property is an object with two reducers: `showSidebar` and `hideSidebar`. The `showSidebar` reducer sets `isVisible` to true. The `hideSidebar` reducer sets `isVisible` to false.
 * 
 * The `showSidebar` and `hideSidebar` actions are exported for use in components.
 * 
 * The reducer is exported as the default export for use in the store.
 * 
 * @module redux/sidebarSlice
 */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isVisible: false,
};

const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        showSidebar: (state) => {
            state.isVisible = true;
        },
        hideSidebar: (state) => {
            state.isVisible = false;
        },
    },
});

export const { showSidebar, hideSidebar } = sidebarSlice.actions;

export default sidebarSlice.reducer;