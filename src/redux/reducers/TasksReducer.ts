import { createSlice } from "@reduxjs/toolkit";

interface TasksType {
    day: number[],
    month: number[],
    year: number[],
    repeat: number[],
    start: string,
    end: string,
    title: string,
    description: string[],
    color: string
}
export const slice = createSlice({
    name: 'tasks',
    initialState: {
        tasks: [
            {
                day: [23],
                month: [0o6],
                year: [2023],
                repeat: [],
                start: '03:55',
                end: '04:00',
                title: 'testindo',
                description: ['montagem', 'inicialização', 'atualização', 'desmontagem'],
                color: 'red'
            },
        ] as TasksType[]
    },
    reducers: {
        setTasks: (state, action) => {
            state.tasks = action.payload;
        }
    }
});

export const { setTasks } = slice.actions;
export default slice.reducer;