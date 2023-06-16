import { createSlice } from "@reduxjs/toolkit";

interface TasksType {
    day: number,
    month: number,
    year: number,
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
                day: 12,
                month: 0o6,
                year: 2023,
                repeat: [0],
                start: '00:00',
                end: '00:20',
                title: 'Fazer Aplicação',
                description: ['montagem', 'inicialização', 'atualização', 'desmontagem'],
                color: 'red'
            },
            {
                day: 14,
                month: 0o6,
                year: 2023,
                repeat: [0, 1, 2, 3, 4, 5, 6],
                start: '00:00',
                end: '00:10',
                title: 'Fazer Aplicação',
                description: ['montagem', 'inicialização', 'atualização', 'desmontagem'],
                color: 'red'
            },
            {
                day: 14,
                month: 0o6,
                year: 2023,
                repeat: [0, 1, 2, 3, 4, 5, 6],
                start: '00:10',
                end: '00:20',
                title: 'Fazer Aplicação',
                description: ['montagem', 'inicialização', 'atualização', 'desmontagem'],
                color: 'red'
            },
            {
                day: 14,
                month: 0o6,
                year: 2023,
                repeat: [0, 1, 2, 3, 4, 5, 6],
                start: '00:20',
                end: '00:30',
                title: 'Fazer Aplicação',
                description: ['montagem', 'inicialização', 'atualização', 'desmontagem'],
                color: 'red'
            },
            {
                day: 14,
                month: 0o6,
                year: 2023,
                repeat: [0, 1, 2, 3, 4, 5, 6],
                start: '00:30',
                end: '00:40',
                title: 'Fazer Aplicação',
                description: ['montagem', 'inicialização', 'atualização', 'desmontagem'],
                color: 'red'
            },
            {
                day: 14,
                month: 0o6,
                year: 2023,
                repeat: [0, 1, 2, 3, 4, 5, 6],
                start: '00:40',
                end: '00:50',
                title: 'Fazer Aplicação',
                description: ['montagem', 'inicialização', 'atualização', 'desmontagem'],
                color: 'red'
            },
            {
                day: 14,
                month: 0o6,
                year: 2023,
                repeat: [0, 1, 2, 3, 4, 5, 6],
                start: '00:50',
                end: '01:00',
                title: 'Fazer Aplicação',
                description: ['montagem', 'inicialização', 'atualização', 'desmontagem'],
                color: 'red'
            },
            {
                day: 12,
                month: 0o6,
                year: 2023,
                repeat: [0, 1, 2, 3, 4, 5, 6],
                start: '00:10',
                end: '00:30',
                title: 'Fazer Aplicação',
                description: ['montagem', 'inicialização', 'atualização', 'desmontagem'],
                color: 'red'
            },
            {
                day: 12,
                month: 0o6,
                year: 2023,
                repeat: [0, 1, 2, 3, 4, 5, 6],
                start: '00:25',
                end: '00:35',
                title: 'Fazer Aplicação',
                description: ['montagem', 'inicialização', 'atualização', 'desmontagem'],
                color: 'red'
            },
            {
                day: 12,
                month: 0o6,
                year: 2023,
                repeat: [0, 1, 2, 3, 4, 5, 6],
                start: '00:45',
                end: '00:55',
                title: 'Fazer Aplicação',
                description: ['montagem', 'inicialização', 'atualização', 'desmontagem'],
                color: 'red'
            },
            {
                day: 12,
                month: 0o6,
                year: 2023,
                repeat: [0, 1, 2, 3, 4, 5, 6],
                start: '21:00',
                end: '22:00',
                title: 'Fazer Aplicação',
                description: ['montagem', 'inicialização', 'atualização', 'desmontagem'],
                color: 'red'
            },
            {
                day: 12,
                month: 0o6,
                year: 2023,
                repeat: [0, 1, 2, 3, 4, 5, 6],
                start: '14:30',
                end: '17:30',
                title: 'Fazer Aplicação',
                description: ['montagem', 'inicialização', 'atualização', 'desmontagem'],
                color: 'red'
            },
            {
                day: 12,
                month: 0o6,
                year: 2023,
                repeat: [0, 1, 2, 3, 4, 5, 6],
                start: '09:20',
                end: '10:10',
                title: 'TEST',
                description: ['montagem', 'inicialização', 'atualização', 'desmontagem'],
                color: 'red'
            },
            {
                day: 12,
                month: 0o6,
                year: 2023,
                repeat: [0, 1, 2, 3, 4, 5, 6],
                start: '09:20',
                end: '10:10',
                title: 'HAHAHAHHAHAHAHAHAHHA',
                description: ['montagem', 'inicialização', 'atualização', 'desmontagem'],
                color: 'red'
            },
            {
                day: 12,
                month: 0o6,
                year: 2023,
                repeat: [0, 1, 2, 3, 4, 5, 6],
                start: '02:00',
                end: '02:10',
                title: 'TEST 2',
                description: ['montagem', 'inicialização', 'atualização', 'desmontagem'],
                color: 'red'
            },
            {
                day: 12,
                month: 0o6,
                year: 2023,
                repeat: [0, 1, 2, 3, 4, 5, 6],
                start: '02:00',
                end: '02:10',
                title: 'asdopaskdpoakdpoksapodk',
                description: ['montagem', 'inicialização', 'atualização', 'desmontagem'],
                color: 'red'
            },
            {
                day: 12,
                month: 0o6,
                year: 2023,
                repeat: [0, 1, 2, 3, 4, 5, 6],
                start: '02:00',
                end: '02:10',
                title: 'TEST 3',
                description: ['montagem', 'inicialização', 'atualização', 'desmontagem'],
                color: 'red'
            }
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