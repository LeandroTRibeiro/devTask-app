import { useState, useEffect } from 'react';

interface SelectedRepeatPropsType {
    selectedWeekDays: number[];
    selectedSpecificDays: number[];
    frequences: {
        name: string,
        value: never[] | number[]
    }[];
};

export const SelectedFrequency = (props: SelectedRepeatPropsType) => {

    const [frequence, setFrequence] = useState('');

    useEffect(() => {

        const getFrequence = () => {
            if(props.selectedSpecificDays.length > 0) {
                return setFrequence("Personalizado...");
            } else {
                for(let i = 0; i < props.frequences.length; i++) {
                    if(props.frequences[i].value.length === props.selectedWeekDays.length) {
                        const sameValues = props.frequences[i].value.filter((value) => props.selectedWeekDays.includes(value));
                        if(sameValues.length === props.selectedWeekDays.length) {
                            return setFrequence(props.frequences[i].name);
                        };
                    };
                };
            }
            if(!frequence) setFrequence("Personalizado...");
        };

        getFrequence();

    }, [props.selectedWeekDays]);

    return(
        <span>{frequence}</span>
    )
};