import { useState, useRef, useEffect } from "react";
import { nanoid } from "@reduxjs/toolkit";

interface InputWeekDayPropsType {
    change: (event: {value: number[], name: string}) => void;
}

export const InputWeekDay = (props: InputWeekDayPropsType) => {

    const weekDaysRef = useRef<HTMLDivElement>(null);

    const [weekDays, setWeekDays] = useState([
        {
            name: "D",
            value: 0,
            selected: false
        },
        {
            name: "S",
            value: 1,
            selected: false
        },
        {
            name: "T",
            value: 2,
            selected: false
        },
        {
            name: "Q",
            value: 3,
            selected: false
        },
        {
            name: "Q",
            value: 4,
            selected: false
        },
        {
            name: "S",
            value: 5,
            selected: false
        },
        {
            name: "S",
            value: 6,
            selected: false
        },
    ]);

    useEffect(() => {

        const keyDownHandler = (e: KeyboardEvent) => {
            if(weekDaysRef.current) {

                const items = Array.from(weekDaysRef.current.children);
                const lastIndex = items.length - 1;
                const lastItem = items[lastIndex].children[1] as HTMLButtonElement;
                const firstItem = items[0].children[1] as HTMLButtonElement;

                if(e.key === "ArrowLeft") {
                    const activeElement = document.activeElement as HTMLButtonElement;
                    const currentIndex = items.findIndex((item) => item.contains(activeElement));
                    if(currentIndex === 0) {
                        lastItem.focus();
                        return;
                    };
                    const previusItem = items[currentIndex - 1].children[1] as HTMLButtonElement;
                    previusItem.focus();
                    return;
                };
                if(e.key === "ArrowRight") {
                    const activeElement = document.activeElement as HTMLButtonElement;
                    const currentIndex = items.findIndex((item) => item.contains(activeElement));
                    if (currentIndex === lastIndex) {
                        firstItem.focus();
                        return;
                    };
                    const nextItem = items[currentIndex + 1].children[1] as HTMLButtonElement;
                    nextItem.focus();
                    return;
                };
            }
        };

        weekDaysRef.current?.addEventListener("keydown", keyDownHandler);

        return () => weekDaysRef.current?.removeEventListener("keydown", keyDownHandler);

    }, []);

    useEffect(() => {

        const weekDaysSelected: number[] = [];

        weekDays.forEach(item => {
            if(item.selected) {
                weekDaysSelected.push(item.value);
            };
        });

        props.change({value: weekDaysSelected, name: 'repeat'});

    }, [weekDays]);

    const onClickHandler = (value: number) => {
        setWeekDays(prevState => 
            prevState.map(item => 
                item.value === value ? {...item, selected: item.selected ? false : true} : {...item}));
    };

    return (
        <div ref={weekDaysRef} className="flex gap-5">
            {weekDays.map((item) => (
                <label key={nanoid()} className="flex flex-col items-center cursor-pointer">
                    <span>{item.name}</span>
                    <button 
                        className={`w-4 h-4 rounded-full border transitions hover:outline hover:outline-1 ${item.selected ? 'bg-purple-800 border-stone-100' : 'border-purple-800'}`} 
                        onClick={() => onClickHandler(item.value)}
                        onKeyDown={(e) => e.key === "Enter" ? onClickHandler(item.value) : null}
                    />
                </label>
            ))
            }
        </div>
    )
}