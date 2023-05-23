import { configureStore } from "@reduxjs/toolkit";
import LoggedReducer from "./reducers/LoggedReducer";


export const store = configureStore({
    reducer: {
        LoggedReducer: LoggedReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;