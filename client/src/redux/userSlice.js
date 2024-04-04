/**
 * userSlice.js
 * 
 * This is a Redux slice that manages the state of the user. It includes actions to set the user data and clear the store, and a reducer to handle these actions.
 * 
 * The initial state of the user is set to an object with properties `Username`, `Role`, and `Status`, all of which are set to null.
 * 
 * The `createSlice` function from the Redux Toolkit is used to generate the slice. The `createSlice` function takes an object with a `name`, `initialState`, and `reducers` property.
 * 
 * The `name` property is set to 'user'.
 * 
 * The `initialState` property is set to the initial state.
 * 
 * The `reducers` property is an object with two reducers: `setUser` and `clearStore`. The `setUser` reducer sets `Username`, `Role`, and `Status` to the values in the payload of the action. The `clearStore` reducer returns the initial state.
 * 
 * The `setUser` and `clearStore` actions are exported for use in components.
 * 
 * The reducer is exported as the default export for use in the store.
 * 
 * @module redux/userSlice
 */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    Username: null,
    Role: null,
    Status: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.Username = action.payload.Username;
            state.Role = action.payload.Role;
            state.Status = action.payload.Status;
        },
        clearStore: () => initialState,
    },
});

export const { setUser, clearStore } = userSlice.actions;

export default userSlice.reducer;