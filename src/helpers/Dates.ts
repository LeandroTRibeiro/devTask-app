const inputDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const monthAndYear = (year: number, month: number) => {
    const curDate = new Date(year, month);
    // const day = curDate.getDate().toString().padStart(2,'0');
    const monthString = curDate.toLocaleDateString('default', {month: 'long'});
    const yearString = curDate.getFullYear();

    return `${monthString} de ${yearString}`;
};

const firstDayMonth = (year: number, month: number) => {

    const dayOfWeek = new Date(year, month, 1).getDay() + 1;

    switch (dayOfWeek) {
        case 1:
            return 'col-start-1';
        case 2:
            return 'col-start-2';
        case 3:
            return 'col-start-3';
        case 4:
            return 'col-start-4';
        case 5:
            return 'col-start-5';
        case 6:
            return 'col-start-6';
        case 7:
            return 'col-start-7';
        default:
            return '';
    };

};

const daysInMonth = (date: Date) => {

    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const daysArray = [];

    for(let i = 1; i <= daysInMonth; i++) {
        daysArray.push(i);
    };

    return daysArray;
};

export const calendarDataUpdate = (date: Date, day?: number) => {

    const curDate = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();

    return {
        curDate: curDate,
        updatedDate: date,
        inputDate: inputDate(date),
        selectedDay: {
            day: day ? day : curDate.getDate(),
            month: day ? date.getMonth() : curDate.getMonth(),
            year: day ? date.getFullYear() : curDate.getFullYear()
        },
        title: monthAndYear(year, month),
        firstDay: firstDayMonth(year, month),
        days: daysInMonth(date)
    };
};

export const selectedDayString = (date: Date) => {
    const day = date.getDate().toString().padStart(2,'0');
    const monthString = date.toLocaleDateString('default', {month: 'long'});
    const yearString = date.getFullYear();

    return `${day} de ${monthString} de ${yearString}`;
};