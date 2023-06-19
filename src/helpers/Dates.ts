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

export const setMinuteStart = (startMinute: number) => {

    return startMinute === 0 ? 'col-start-1' : `col-start-${startMinute+1}`;

    // switch (startMinute) {
    //     case 0o0:
    //         return 'col-start-1';
    //     case 0o1:
    //         return 'col-start-2';
    //     case 0o2:
    //         return 'col-start-3';
    //     case 15:
    //         return 'col-start-4';
    //     case 20:
    //         return 'col-start-5';
    //     case 25:
    //         return 'col-start-6';
    //     case 30:
    //         return 'col-start-7';
    //     case 35:
    //         return 'col-start-8';
    //     case 40:
    //         return 'col-start-9';
    //     case 45:
    //         return 'col-start-10';
    //     case 50:
    //         return 'col-start-11';
    //     case 55:
    //         return 'col-start-12';
    //     default:
    //         return '';              
    // };
};

export const setMinuteEnd = (startHour: number, endHour: number, endMinute: number, final: boolean) => {

    if(startHour < endHour && !final) {
        return 'col-end-60';
    };

    switch (endMinute) {
        case 0:
            return 'col-end-60';
        case 1:
            return 'col-end-2';
        case 2:
            return 'col-end-3';
        case 3:
            return 'col-end-4';
        case 4:
            return 'col-end-5';
        case 5:
            return 'col-end-6';
        case 6:
            return 'col-end-7';
        case 7:
            return 'col-end-8';
        case 8:
            return 'col-end-9';
        case 9:
            return 'col-end-10';
        case 10:
            return 'col-end-11';
        case 11:
            return 'col-end-12';
        case 12:
            return 'col-end-13';
        case 13:
            return 'col-end-14';
        case 14:
            return 'col-end-15';
        case 15:
            return 'col-end-16';
        case 16:
            return 'col-end-17';
        case 17:
            return 'col-end-18';
        case 18:
            return 'col-end-19';
        case 19:
            return 'col-end-20';
        case 20:
            return 'col-end-21';
        case 21:
            return 'col-end-22';
        case 22:
            return 'col-end-23';
        case 23:
            return 'col-end-24';
        case 24:
            return 'col-end-25';
        case 25:
            return 'col-end-26';
        case 26:
            return 'col-end-27';
        case 27:
            return 'col-end-28';
        case 28:
            return 'col-end-29';
        case 29:
            return 'col-end-30';
        case 30:
            return 'col-end-31';
        case 31:
            return 'col-end-32';
        case 32:
            return 'col-end-33';
        case 33:
            return 'col-end-34';
        case 34:
            return 'col-end-35';
        case 35:
            return 'col-end-36';
        case 36:
            return 'col-end-37';
        case 37:
            return 'col-end-38';
        case 38:
            return 'col-end-39';
        case 39:
            return 'col-end-40';
        case 40:
            return 'col-end-41';
        case 41:
            return 'col-end-42';
        case 42:
            return 'col-end-43';
        case 43:
            return 'col-end-44';
        case 44:
            return 'col-end-45';
        case 45:
            return 'col-end-46';
        case 46:
            return 'col-end-47';
        case 47:
            return 'col-end-48';
        case 48:
            return 'col-end-49';
        case 49:
            return 'col-end-50';
        case 50:
            return 'col-end-51';
        case 51:
            return 'col-end-52';
        case 52:
            return 'col-end-53';
        case 53:
            return 'col-end-54';
        case 54:
            return 'col-end-55';
        case 55:
            return 'col-end-56';
        case 56:
            return 'col-end-57';
        case 57:
            return 'col-end-58';
        case 58:
            return 'col-end-59';
        case 59:
            return 'col-end-60';
        default:
            return '';              
    };
};