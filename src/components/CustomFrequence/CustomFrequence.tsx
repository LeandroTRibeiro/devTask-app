import { Plus, Trash, X } from "@phosphor-icons/react"
import { InputWeekDay } from "../formComponents/InputRepeat/InputWeekDay"
import { useState, useEffect } from "react";
import { Input } from "../formComponents/Input";

interface CustomFrequencePropsType {
    selectedWeekDays: number[];
    selectedSpecificDays: string[];
    close: () => void;
    change: (event: {value: number[] | string[], name: string}) => void;
}

export const CustomFrequence = (props: CustomFrequencePropsType) => {

    const [recurrenceType, setRecurrenceType] = useState(props.selectedSpecificDays.length > 0 ? true : false);

    const [repeatWeekDay, setRepeatWeekDay] = useState([
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
    const [repeatDates, setRepeatDates] = useState(['']);

    useEffect(() => {
        const getFrequence = () => {
            const selectedWeekDays = repeatWeekDay.map((item) => {
                if(props.selectedWeekDays.includes(item.value)) {
                    return {...item, selected: true};
                };
                return {...item, selected: false};
            });
            setRepeatWeekDay(selectedWeekDays);
            if(props.selectedSpecificDays.length > 0) {
                return setRepeatDates(props.selectedSpecificDays);
            };
        }
        getFrequence();
    },[props.selectedWeekDays, props.selectedSpecificDays]);

    const updateRepeatWeekDay = (value: number) => {
        setRepeatWeekDay(prevState => 
            prevState.map(item => 
                item.value === value ? {...item, selected: item.selected ? false : true} : {...item}));
    };

    const updateRepeatDates = (value: string, index: number) => {
        const updateDates = [...repeatDates];
        updateDates[index] = value;
        setRepeatDates(updateDates);
    };

    const addNewDate = () => {
        setRepeatDates([...repeatDates, '']);
    };

    const removeDate = (index: number) => {
        const updatedInputs = [...repeatDates];
        updatedInputs.splice(index, 1);
        setRepeatDates(updatedInputs);
    };

    const setFrequenceWeekDay = () => {        
        const weekDaysSelected: number[] = [];
        repeatWeekDay.forEach(item => {
            if(item.selected) {
                weekDaysSelected.push(item.value);
            };
        });
        props.change({value: weekDaysSelected, name: 'repeatWeekDays'});
        props.close();
    };

    const setSpecificDays = () => {
        props.change({value: repeatDates, name: 'repeatSpecificDays'});
        props.close();
    };

    return (
        <div className={`absolute top-0 left-0 w-screen max-w-[1440px] h-screen flex justify-center items-center backdrop-blur-sm bg-stone-400/20 text-stone-950 dark:text-stone-100 overflow-hidden z-20`}>
            <div className="mobile-g:w-full mobile-g:h-full mobile-g:rounded-none grid grid-cols-2 shadow-black shadow-md p-5 rounded-md bg-stone-100 dark:bg-stone-950 transitions">
                <div className='col-span-2 w-full flex items-center justify-between mb-5'>
                    <h1 className='text-2xl'>Repetição Personalizada</h1>
                    <button onClick={props.close}>
                        <X size={25} weight="bold" className="hover:text-red-500 active:scale-90 transitions cursor-pointer" />
                    </button>
                </div>
                <button className={`flex justify-center p-5 pt-2 pb-2 rounded-tl-lg cursor-pointer ${recurrenceType ? 'bg-stone-800/20' : 'bg-stone-900'}`} onClick={() => setRecurrenceType(false)}>
                    Configurar Recorrência Semanal
                </button>
                <button className={`flex justify-center p-5 pt-2 pb-2 rounded-tr-lg cursor-pointer ${recurrenceType ? 'bg-stone-900' : 'bg-stone-800/20'}`} onClick={() => setRecurrenceType(true)}>
                    Configurar Dias Específicos
                </button>
                {!recurrenceType &&
                    <div className={`col-span-2 flex-col gap-5 items-center bg-stone-900 p-5 rounded-b-lg flex`}>
                        <InputWeekDay 
                            updateRepeatWeekDay={repeatWeekDay}
                            updateWeekDay={updateRepeatWeekDay}
                        />
                        <button className='w-full font-medium tracking-wider border border-purple-800 rounded-md bg-purple-800 text-stone-100 py-2 hover:bg-stone-100 dark:hover:bg-stone-900 hover:text-purple-800 active:scale-90 transitions disabled:grayscale disabled:animate-pulse' onClick={() => setFrequenceWeekDay()}>Salvar</button>
                    </div>
                }
                {recurrenceType &&
                    <div className={`col-span-2 flex-col gap-5 items-center bg-stone-900 p-5 rounded-b-lg flex`}>
                        <div className="w-full flex flex-col gap-5 h-80 overflow-y-scroll">
                            {repeatDates.map((date, index) => (
                                <div key={index} className={`w-full flex items-center gap-5`}>
                                    <Input
                                        id={`repeatDates`}
                                        name={`repeatDates`}
                                        type='date'
                                        value={date}
                                        onChange={(e) => updateRepeatDates(e.target.value, index)}
                                        placeholder=''
                                        formErrMsg={''}
                                        disabled={false}
                                        required={false}
                                    />
                                    <button className="w-10 flex justify-center items-center mr-5" onClick={() => removeDate(index)}>
                                        <Trash size={25} className="cursor-pointer transitions hover:text-red-500 active:scale-90" />  
                                    </button>
                                </div>
                            ))}
                        </div>
                        <button onClick={addNewDate}>
                            <Plus size={25} className="cursor-pointer transitions hover:text-green-500 active:scale-90" />
                        </button>
                        <button className='w-full font-medium tracking-wider border border-purple-800 rounded-md bg-purple-800 text-stone-100 py-2 hover:bg-stone-100 dark:hover:bg-stone-900 hover:text-purple-800 active:scale-90 transitions disabled:grayscale disabled:animate-pulse' onClick={setSpecificDays}>Salvar</button>
                    </div>
                }
            </div>
        </div>
    )
}