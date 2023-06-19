import { useState, useEffect } from 'react';
import { CalendarPlus, CaretCircleLeft, CaretCircleRight, ListMagnifyingGlass } from "@phosphor-icons/react";
import { nanoid } from 'nanoid';
import { useAppSelector } from '../../redux/hooks/useAppSelector';
import { selectedDayString, setMinuteEnd, setMinuteStart } from "../../helpers/Dates";
import { NewTask } from '../../pages/NewTask';

interface DayTasksPropsType {
    selectedDay: Date,
    plusDay: () => void,
    minusDay: () => void,
    newTask: () => void
}

export const DayTasks = (Props: DayTasksPropsType) => {

    const tasks = useAppSelector(state => state.TasksReducer.tasks);

    const [clock, setClock] = useState(new Date().toLocaleTimeString());

    const [hours, setHours] = useState(
        ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00']
    );

    const [selectDay, setSelectDay] = useState({
        title: selectedDayString(Props.selectedDay),
        day: Props.selectedDay.getDate(),
        month: Props.selectedDay.getMonth()+1,
        year: Props.selectedDay.getFullYear(),
        week: Props.selectedDay.getDay()
    });    

    // useEffect(() =>{

    //     const timer = setInterval(() => {
    //         setClock(new Date().toLocaleTimeString());
    //     },1000);

    //     return () => clearInterval(timer);

    // },[]);

    useEffect(() => {
        setSelectDay({
            title: selectedDayString(Props.selectedDay),
            day: Props.selectedDay.getDate(),
            month: Props.selectedDay.getMonth()+1,
            year: Props.selectedDay.getFullYear(),
            week: Props.selectedDay.getDay()
        });
    }, [Props.selectedDay]);

    return (
        <div className="flex flex-col w-full gap-5 backdrop-blur-sm bg-stone-200 dark:bg-stone-400/10 rounded-md p-5 text-stone-900 dark:text-stone-100 dark:font-thin overflow-y-scroll snap-y snap-mandatory scroll-smooth">
            <div className="flex items-center gap-2 snap-start pt-5">
                <h1 className="text-2xl">{selectDay.title}</h1>
                <button className='transitions hover:text-purple-800 active:scale-90' onClick={() => Props.minusDay()}><CaretCircleLeft size={35} /></button>
                <button className='transitions hover:text-purple-800 active:scale-90' onClick={() => Props.plusDay()}><CaretCircleRight size={35} /></button>
                <button className='p-1 border rounded-md border-purple-800 text-stone-100 bg-purple-800 transitions dark:hover:bg-transparent dark:hover:text-purple-800 active:scale-90' title='adicionar nova tarefa' onClick={Props.newTask}><CalendarPlus size={25} /></button>
                <button className='p-1 border rounded-md border-purple-800 text-stone-100 bg-purple-800 transitions dark:hover:bg-transparent dark:hover:text-purple-800 active:scale-90' title='pesquisar por tarefas'><ListMagnifyingGlass size={25} /></button>
                <div className='flex-1 flex justify-end'>
                    <div className='text-3xl'>{clock}</div>
                </div>
            </div>
            <div className='text-sm flex items-center gap-5'>
                <span className='w-10'>hh:mm</span>
                <div className='grid grid-cols-12'>
                    <span className='flex justify-end col-start-2'>hh:10</span>
                    <span className='flex justify-end col-start-4'>hh:20</span>
                    <span className='flex justify-end col-start-6'>hh:30</span>
                    <span className='flex justify-end col-start-8'>hh:40</span>
                    <span className='flex justify-end col-start-10'>hh:50</span>
                    <span className='flex justify-end col-start-12'>hh:60</span>
                </div>
            </div>
            <ul className='flex flex-col'>
                {hours.map((hours) => (
                    <li key={nanoid()} className={`w-full snap-start flex items-center gap-5 py-2 border-t border-stone-900 text-sm ${hours.split(':')[0] === clock.split(':')[0] ? 'backdrop-brightness-90' : ''}`}>
                        <div className='flex flex-col justify-between'>
                            <span className='w-10'>{hours}</span>
                        </div>
                        <div className='grid grid-cols-60 gap-y-1'>
                            {tasks.map((tasks) => {

                                const startHour = +tasks.start.split(':')[0];
                                const startMinute = +tasks.start.split(':')[1];
                                const endHour = +tasks.end.split(':')[0];
                                const endMinute = +tasks.end.split(':')[1];
                                const hour = +hours.split(':')[0];

                                console.log(startHour, startMinute, endHour, endMinute, hour);
                                

                                if(
                                    (tasks.day.includes(selectDay.day)  && 
                                    tasks.month.includes(selectDay.month) && 
                                    tasks.year.includes(selectDay.year)) ||
                                    tasks.repeat.includes(selectDay.week)
                                ) {
                                    
                                    if(startHour === hour) {
                                        return (
                                            <div 
                                                key={nanoid()}
                                                title={tasks.title}
                                                className={`overflow-hidden p-1 flex justify-center items-center rounded-md bg-red-500  
                                                ${setMinuteStart(startMinute)}
                                                ${setMinuteEnd(startHour, endHour, endMinute, false)}`}
                                            >
                                                {tasks.title}
                                            </div>
                                        )
                                    }
                                    if(startHour < hour && endHour > hour) {
                                        return (
                                            <div
                                               key={nanoid()}
                                               title={tasks.title} 
                                               className={`overflow-hidden col-start-1 col-end-60 p-1 flex justify-center items-center rounded-md bg-red-500 `}
                                            >
                                               {tasks.title}
                                            </div>
                                        )
                                    }
                                    if(endHour === hour && endMinute > 0) {
                                        return (
                                            <div
                                               key={nanoid()}
                                               title={tasks.title} 
                                               className={`overflow-hidden col-start-1 p-1 flex justify-center items-center rounded-md bg-red-500  ${setMinuteEnd(startHour, endHour, endMinute, true)}`}
                                            >
                                               {tasks.title}
                                            </div>
                                        )
                                    }
                                }
                            })}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};