import { X } from '@phosphor-icons/react';
import { useState, useEffect } from 'react';
import { Input } from '../components/formComponents/Input';
import { InputReapeat } from '../components/formComponents/InputRepeat';
import { InputColors } from '../components/formComponents/InputColors';
import { InputTime } from '../components/formComponents/InputTime';

interface NewTaskPropsType {
    close: () => void,
};

export const NewTask = (Props: NewTaskPropsType) => {

    const [newTask, setNewTask] = useState({
        title: '',
        date: '',
        repeat: [],
        start: '',
        end: '',
        description: '',
        color: ''
    });

    const [disabled, setDisabled] = useState(false);
    const [formMsg, setFormMsg] = useState('');

    const HandlerSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    const frequences = [
        {
            name: 'Uma vez',
            value: []
        },
        {
            name: 'Diariamente',
            value: [0,1,2,3,4,5,6]
        },
        {
            name: 'Segunda a Sexta',
            value: [1,2,3,4,5]
        },
        {
            name: 'Finais de Semana',
            value: [0,6]
        }
    ];    

    const HandlerChange = (event: {value: string | number[] | never[], name: string}) => {

        const {value, name} = event;

        setNewTask(prevState => ({
            ...prevState,
            [name]: value
        }));

    };
    
    return (
        <section className={`absolute top-0 left-0 w-screen max-w-[1440px] h-screen flex justify-center items-center backdrop-blur-sm bg-stone-400/20 text-stone-950 dark:text-stone-100 overflow-hidden z-20 ${disabled ? 'grayscale animate-pulse pointer-events-none' : ''}`}>
            <form action="POST" onSubmit={HandlerSubmit} className={`mobile-g:w-full mobile-g:h-full mobile-g:rounded-none flex shadow-black shadow-md p-5 rounded-md bg-stone-100 dark:bg-stone-950 transitions`}>
                <div className='flex flex-col gap-5 tablet-m:gap-3'>
                    <label>
                        <input
                            className="h-fit w-fit outline-none bg-transparent text-2xl tablet-m:text-xl font-montserrat border-b border-purple-800"
                            type="text"
                            name="title"
                            id="title"
                            placeholder='Adicionar título'
                        />
                    </label>
                    <label className='flex flex-col'>
                        <span>data</span>
                        <Input
                            id='new-task'
                            name='new-task'
                            type='date'
                            value={newTask.date}
                            onChange={(e) => setNewTask(prev => ({...prev, date: e.target.value}))}
                            placeholder=''
                            formErrMsg={formMsg}
                            disabled={disabled}
                            required={false}
                        />
                    </label>
                    <label className='flex flex-col'>
                        <span>Repetir</span>
                        <InputReapeat
                            frequences={frequences}
                            selected={newTask.repeat}
                            change={(event) => HandlerChange(event)}
                        />
                    </label>
                    <div className='flex w-full gap-5'>
                        <label className='w-1/2'>
                            <span>Começa</span>
                            <InputTime
                                startInput={true}
                                startTime={''}
                                change={(event) => HandlerChange(event)}
                            />
                        </label>
                        <label className='w-1/2'>
                            <span>Termina</span>
                            <InputTime
                                startInput={false}
                                startTime={newTask.start}
                                change={(event) => HandlerChange(event)}
                            />
                        </label>
                    </div>
                    <label className='flex flex-col gap-2'>
                        <span>Cor</span>
                        <InputColors />
                    </label>
                </div>
                <div>
                    <label>
                        <span>Descrição</span>
                    </label>
                </div>
            </form>
        </section>
    );
};