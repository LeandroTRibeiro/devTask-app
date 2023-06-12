import { useState, useEffect } from 'react';
import { CalendarPlus, CaretCircleLeft, CaretCircleRight, ListMagnifyingGlass } from "@phosphor-icons/react";
import { nanoid } from 'nanoid';

interface DayTasksPropsType {
    selectedDay: string,
    plusDay: () => void,
    minusDay: () => void
}

export const DayTasks = (Props: DayTasksPropsType) => {

    const [clock, setClock] = useState(new Date().toLocaleTimeString());

    const [hours, setHours] = useState(
        ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00']
    );

    useEffect(() =>{

        const timer = setInterval(() => {
            setClock(new Date().toLocaleTimeString());
        },1000);

        return () => clearInterval(timer);

    },[]);

    return (
        <div className="flex flex-col w-full gap-5 backdrop-blur-sm bg-purple-800/30 dark:bg-stone-400/10 rounded-md p-5 text-stone-900 dark:text-stone-100 dark:font-thin overflow-y-scroll snap-y snap-mandatory scroll-smooth">
            <div className="flex items-center gap-2 snap-start pt-5">
                <h1 className="text-2xl">{Props.selectedDay}</h1>
                <button className='transitions hover:text-purple-800 active:scale-90' onClick={() => Props.minusDay()}><CaretCircleLeft size={35} /></button>
                <button className='transitions hover:text-purple-800 active:scale-90' onClick={() => Props.plusDay()}><CaretCircleRight size={35} /></button>
                <button className='flex items-center tracking-wider p-1 border rounded-md border-purple-800 text-stone-100 bg-purple-800 transitions dark:hover:bg-transparent dark:hover:text-purple-800 active:scale-90' title='adicionar nova tarefa'><CalendarPlus size={25} /></button>
                <button className='flex items-center tracking-wider p-1 border rounded-md border-purple-800 text-stone-100 bg-purple-800 transitions dark:hover:bg-transparent dark:hover:text-purple-800 active:scale-90' title='pesquisar por tarefas'><ListMagnifyingGlass size={25} /></button>
                <div className='flex-1 flex justify-end'>
                    <div className='text-3xl'>{clock}</div>
                </div>
            </div>
            <div className='text-sm flex gap-20 '>
                <span>hh:mm</span>
                <span>hh:10</span>
                <span>hh:20</span>
                <span>hh:30</span>
                <span>hh:40</span>
                <span>hh:50</span>
                <span>hh:60</span>
            </div>
            <ul className='flex flex-col gap-2'>
                {hours.map((item) => (
                    <li key={nanoid()} className='snap-start flex items-center border-t border-stone-900 text-sm'>
                        <div className='flex flex-col justify-between'>
                            <span>{item}</span>
                        </div>
                        <div>
                            
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};