import { createSlice } from "@reduxjs/toolkit";

interface ThemeType {
    status: '' | 'dark' | 'light'
}

export const slice = createSlice({
    name: 'theme',
    initialState: {
        status: ''
    } as ThemeType,
    reducers: {
        setTheme: (state, action) => {
            state.status = action.payload;
        }
    }
});

export const { setTheme } = slice.actions;
export default slice.reducer;