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