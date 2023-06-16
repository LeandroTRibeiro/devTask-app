import { X } from '@phosphor-icons/react';
import { useState } from 'react';
import { Input } from '../components/formComponents/Input';
import { Select } from '../components/formComponents/Select';
import { InputColors } from '../components/formComponents/InputColors';

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

    const HandlerSubmit = () => {

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
            <form action="POST" onSubmit={HandlerSubmit} className={`mobile-g:w-full mobile-g:h-full mobile-g:rounded-none flex flex-col gap-5 tablet-m:gap-3 shadow-black shadow-md p-5 rounded-md bg-stone-100 dark:bg-stone-950 transitions`}>
                <div className="w-full flex justify-end mobile-g:justify-start">
                    <X size={25} weight="bold" className="hover:text-red-500 active:scale-90 transitions cursor-pointer" onClick={Props.close} />
                </div>
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
                        required={true}
                    />
                </label>
                <label className='flex flex-col'>
                    <span>Repetir</span>
                    <Select 
                        frequences={frequences}
                        selected={newTask.repeat}
                        change={(event) => HandlerChange(event)}
                    />
                    {/* <select 
                        className='outline-none bg-transparent font-montserrat border border-purple-800 px-2 py-2
                        rounded-md'
                        name="repeat" 
                        id="repeat"
                    >
                        <option value="" selected className='dark:bg-stone-950 '>Uma vez</option>
                        <option value="" className='dark:bg-stone-950 '>Diariamente</option>
                        <option value="" className='dark:bg-stone-950 '>Segunda a Sexta</option>
                        <option value="" className='dark:bg-stone-950 '>Finais de Semana</option>
                        <option value="" className='dark:bg-stone-950 '>Personalizado...</option>
                    </select> */}
                </label>
                <div className='w-full flex justify-around'>
                    <label className='flex flex-col items-center gap-2'>
                        <span>Começa</span>
                        <input 
                            className='bg-transparent outline-none border border-purple-800 rounded-md px-2 py-1 hour dark:hour-dark'
                            type="time" 
                            name="start" 
                            id="start" 
                        />
                    </label>
                    <label className='flex flex-col items-center gap-2'>
                        <span>Termina</span>
                        <input 
                            className='bg-transparent outline-none border border-purple-800 rounded-md px-2 py-1 hour dark:hour-dark leading-4'
                            type="time" 
                            name="end" 
                            id="end" 
                        />
                    </label>
                </div>
                <InputColors />
            </form>
        </section>
    );
};