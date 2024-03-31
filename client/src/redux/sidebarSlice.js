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