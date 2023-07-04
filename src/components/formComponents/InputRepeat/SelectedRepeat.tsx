import { useState, useEffect } from 'react';

interface SelectedRepeatPropsType {
    selectedRepeat: number[],
    frequences: {
        name: string,
        value: never[] | number[]
    }[],
}

export const SelectedRepeat = (props: SelectedRepeatPropsType) => {

    const [frequence, setFrequence] = useState('');

    useEffect(() => {

        if(props.selectedRepeat.length === 0) {
            setFrequence('Uma vez');
            return;
        };
        if(props.selectedRepeat.length === 7) {
            setFrequence('Diariamente');
            return;
        };
        props.frequences.map((item) => {
            const matchingValues = item.value.filter((value) => props.selectedRepeat.includes(value));
            if(
                matchingValues.length === props.selectedRepeat.length &&
                matchingValues.length === item.value.length
            ) {
                setFrequence(item.name);
            }
        });
        if(!frequence) setFrequence('Personalizado...');

    }, [props.selectedRepeat]);

    return(
        <span>{frequence}</span>
    )
};