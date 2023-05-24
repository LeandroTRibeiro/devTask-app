import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
    name: 'logged',
    initialState: {
        status: false
    },
    reducers: {
        setLogged: (state, action) => {
            state.status = action.payload;
        }
    }
});

export const { setLogged } = slice.actions;
export default slice.reducer;