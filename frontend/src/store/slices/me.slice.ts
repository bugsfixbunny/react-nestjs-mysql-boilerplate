import { createSlice } from "@reduxjs/toolkit";

const MeSlice = createSlice({
    name: "me",
    initialState: {},
    reducers: {
        setMe: (state, { payload }) => {
            return payload;
        },
        resetMe: () => ({})
    }
});

export default MeSlice;