import { useState } from 'react';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export const CalendarDashboard = () => {

    const [date, setDate] = useState<Date | Date[]>(new Date());

    const handleDateChange = (value: Date | Date[]) => {
      setDate(value);
    };

    return (
        <Calendar 
        />
    );
};