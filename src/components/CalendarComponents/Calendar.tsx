import { useEffect, useState } from 'react';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';

import { calendarDataUpdate } from '../../helpers/Dates';
import { nanoid } from 'nanoid';

interface CalendarPropsType {
    chooseDay: (date: Date) => void
};

interface CalendarDatatype {
    curDate: Date,
    updatedDate: Date,
    inputDate: string,
    selectedDay: {
        day: number,
        month: number,
        year: number
    },
    title: string,
    firstDay: string,
    days: number[]
};

export const Calendar = (Props: CalendarPropsType) => {

    const [calendarData, setCalendarData] = useState<CalendarDatatype | null>(null);

    useEffect(() => {
        setCalendarData(calendarDataUpdate(new Date()));
    },[]);

    const HandlerMonthMinus = () => {

        if(calendarData && calendarData.updatedDate.getMonth() === 0) {
            setCalendarData(calendarDataUpdate(new Date(calendarData.updatedDate.getFullYear()-1, 11)));
            return;
        };

        if(calendarData) {
            setCalendarData(calendarDataUpdate(new Date(calendarData.updatedDate.getFullYear(), calendarData.updatedDate.getMonth()-1)));
        };

    };

    const HandlerMonthPlus = () => {
        if(calendarData && calendarData.updatedDate.getMonth() === 11) {
            setCalendarData(calendarDataUpdate(new Date(calendarData.updatedDate.getFullYear()+1,0)));
            return;
        };
        if(calendarData) {
            setCalendarData(calendarDataUpdate(new Date(calendarData.updatedDate.getFullYear(), calendarData.updatedDate.getMonth()+1)));
        };
    };

    const HandlerSelectDay = (day?: number, event?: React.ChangeEvent<HTMLInputElement>) => {
        if(calendarData && day) {
            Props.chooseDay(new Date(calendarData.updatedDate.getFullYear(), calendarData.updatedDate.getMonth(), day));
            setCalendarData(calendarDataUpdate(calendarData.updatedDate, day));
        };
        if(calendarData && event) {
            const inputDate = event.target.value.split('-').map(item => Number(item));
            const date = new Date(inputDate[0], inputDate[1]-1, inputDate[2])
            Props.chooseDay(date);
            setCalendarData(calendarDataUpdate(date, inputDate[2]));
        };
    };
    

    return (
        <section className="w-56 h-[28.5rem] flex flex-col items-center gap-2 backdrop-blur-sm bg-purple-800/30 dark:bg-stone-400/10 rounded-md p-2 text-stone-900 dark:text-stone-100 dark:font-thin">

            <nav className='w-full flex justify-around'>
                <button className='text-stone-950 dark:text-stone-100 transitions hover:text-purple-800 active:scale-90 dark:hover:text-purple-800' onClick={HandlerMonthMinus}><CaretLeft size={20} /></button>
                <div className='flex justify-center font-semibold text-lg text-stone-950 dark:text-stone-100 transitions hover:text-purple-800 dark:hover:text-purple-800'>
                    <h1>{calendarData?.title}</h1>
                    <input 
                        className='opacity-0 absolute calendar-date'
                        type="date" 
                        name="date" 
                        id="date" 
                        value={'2023-06-11'}
                        onChange={(e) => HandlerSelectDay(undefined, e)}
                    />
                </div>
                <button className='text-stone-950 dark:text-stone-100 transitions hover:text-purple-800 active:scale-90 dark:hover:text-purple-800' onClick={HandlerMonthPlus}><CaretRight size={20} /></button>
            </nav>

            <ul className="grid grid-cols-7 grid-rows-6 gap-x-4 gap-y-2 h-fit">
                <li>D</li>
                <li>S</li>
                <li>T</li>
                <li>Q</li>
                <li>Q</li>
                <li>S</li>
                <li>S</li>
                {calendarData?.days.map((item, index) => (
                    <li 
                        key={nanoid()} 
                        className={`h-fit transitions hover:text-purple-800 active:scale-90 cursor-pointer
                            ${index === 0 ? calendarData.firstDay : ''}  
                            ${item === calendarData.selectedDay.day &&
                                calendarData.updatedDate.getMonth() === calendarData.selectedDay.month &&
                                calendarData.updatedDate.getFullYear() === calendarData.selectedDay.year ? 'text-purple-800 font-semibold' : ''}`}
                        onClick={ () => HandlerSelectDay(item, undefined) }
                    >
                        {item}
                    </li>
                ))}
            </ul>
        </section>
    );
};