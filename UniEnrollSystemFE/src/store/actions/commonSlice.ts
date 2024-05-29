import { createSlice } from "@reduxjs/toolkit";

type CommonType = {
    showSideBar: boolean;
};

const initialState: CommonType = {
    showSideBar: false,
};

const commonSlice = createSlice({
    name: "common",
    initialState,
    reducers: {
        toggleSideBar: (state) => {
            state.showSideBar = !state.showSideBar;
        },
    },
});

export const { toggleSideBar } = commonSlice.actions;
export default commonSlice.reducer;
