import { configureStore } from "@reduxjs/toolkit";
import LoggedReducer from "./reducers/LoggedReducer";
import ThemeReducer from "./reducers/ThemeReducer";
import TasksReducer from "./reducers/TasksReducer";


export const store = configureStore({
    reducer: {
        LoggedReducer: LoggedReducer,
        ThemeReducer: ThemeReducer,
        TasksReducer: TasksReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;