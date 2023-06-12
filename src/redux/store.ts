import { configureStore } from "@reduxjs/toolkit";
import LoggedReducer from "./reducers/LoggedReducer";
import ThemeReducer from "./reducers/ThemeReducer";


export const store = configureStore({
    reducer: {
        LoggedReducer: LoggedReducer,
        ThemeReducer: ThemeReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;