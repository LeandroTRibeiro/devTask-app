import { CalendarBlank, Cards, PaintBucket, Play, SmileyWink, Stop, TextAlignLeft, X } from '@phosphor-icons/react';
import { useState, useEffect, useRef } from 'react';
import { Input } from '../components/formComponents/Input';
import { InputReapeat } from '../components/formComponents/InputRepeat/InputRepeat';
import { InputColors } from '../components/formComponents/InputColors';
import { InputTime } from '../components/formComponents/InputTime';
import { Emoji } from '../components/EmojiComponents/Emoji';
import { CustomFrequence } from '../components/CustomFrequence/CustomFrequence';

interface NewTaskPropsType {
    close: () => void,
};

export const NewTask = (Props: NewTaskPropsType) => {

    const formRef = useRef<HTMLFormElement>(null);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const [newTask, setNewTask] = useState({
        title: '',
        date: '',
        repeat: [],
        start: '',
        end: '',
        description: '',
        color: 'yellow'
    });

    const [openEmojiPicker, setOpenEmojiPicker] = useState(false);
    const [customFrequence, setCustomFrequence] = useState(false);

    const [frequences, setFrequences] = useState([
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
    ]);

    const [disabled, setDisabled] = useState(false);
    const [formMsg, setFormMsg] = useState('');

    useEffect(() => {

        const keydownHandler = (e: KeyboardEvent) => {
            if(e.key === "Enter") e.preventDefault();
        };

        formRef.current?.addEventListener('keydown', keydownHandler);

        return () => formRef.current?.removeEventListener('keydown', keydownHandler);

    }, []);

    const handlerSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    const changeNewTaskHandler = (event: {value: string | number[] | never[], name: string}) => {

        const {value, name} = event;

        setNewTask(prevState => ({
            ...prevState,
            [name]: value
        }));

    };

    const handlerEmoji = (emoji: any) => {
        setNewTask(prevState => ({...prevState, description: newTask.description + emoji.native}));
        setOpenEmojiPicker(false);
    };

    useEffect(() => {
        console.log(newTask.repeat);
        
    }, [newTask])
    
    return (
        <section className={`absolute top-0 left-0 w-screen max-w-[1440px] h-screen flex justify-center items-center backdrop-blur-sm bg-stone-400/20 text-stone-950 dark:text-stone-100 overflow-hidden z-20 ${disabled ? 'grayscale animate-pulse pointer-events-none' : ''}`}>
            {!customFrequence &&
                <form ref={formRef} action="POST" onSubmit={handlerSubmit} className={`mobile-g:w-full mobile-g:h-full mobile-g:rounded-none grid grid-cols-2 gap-5 tablet-m:gap-3 shadow-black shadow-md p-5 rounded-md bg-stone-100 dark:bg-stone-950 transitions`}>
                    <div className='col-span-2 w-full flex items-center justify-between'>
                        <h1 className='text-2xl'>Nova Tarefa</h1>
                        <X size={25} weight="bold" className="hover:text-red-500 active:scale-90 transitions cursor-pointer" onClick={Props.close} />
                    </div>
                    <div className='flex-1 flex flex-col gap-5 tablet-m:gap-3'>
                        <label>
                            <input
                                className="h-fit w-fit outline-none bg-transparent text-xl tablet-m:text-xl font-montserrat border-b border-purple-800 placeholder:text-stone-950 dark:placeholder:text-stone-100"
                                autoFocus={true}
                                type="text"
                                name="title"
                                id="title"
                                placeholder={newTask.title === '' ? 'Adicionar título' : newTask.title}
                                value={newTask.title}
                                onChange={(e) => setNewTask(prev => ({...prev, [e.target.name]: e.target.value}))}
                            />
                        </label>
                        <label className='flex flex-col'>
                            <span className='flex items-center gap-1 text-lg'>
                                <CalendarBlank size={20} />
                                Data
                            </span>
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
                            <span className='flex items-center gap-1 text-lg'>
                                <Cards size={20}  />
                                Repetir
                            </span>
                            <InputReapeat
                                frequences={frequences}
                                selected={newTask.repeat}
                                change={(event) => changeNewTaskHandler(event)}
                                customFrequence={() => setCustomFrequence(true)}
                            />
                        </label>
                        {/* <div className='flex w-full gap-5'>
                            <label className='w-1/2'>
                                <span className='flex items-center gap-1 text-lg'>
                                    <Play size={20}  />
                                    Começa
                                </span>
                                <InputTime
                                    startInput={true}
                                    startTime={''}
                                    change={(event) => HandlerChange(event)}
                                />
                            </label>
                            <label className='w-1/2'>
                                <span className='flex items-center gap-1 text-lg'>
                                    <Stop size={20}  />
                                    Termina
                                </span>
                                <InputTime
                                    startInput={false}
                                    startTime={newTask.start}
                                    change={(event) => HandlerChange(event)}
                                />
                            </label>
                        </div> */}
                        <label className='flex flex-col gap-2'>
                            <span className='flex items-center gap-1 text-lg'>
                                <PaintBucket size={20}  />
                                Cor
                            </span>
                            <InputColors 
                                color={newTask.color}
                                change={(event) => changeNewTaskHandler(event)}
                            />
                        </label>
                    </div>
                    <div className='flex flex-col gap-5'>
                        <label className='flex flex-col gap-2 h-full'>
                            <span className='flex items-center gap-1 text-lg'>
                                <TextAlignLeft size={20}  />
                                Adicionar descrição
                            </span>
                            <div className='flex justify-end h-full'>
                                <textarea
                                    ref={textAreaRef}
                                    className={`w-full h-full p-2 pr-9 rounded-md resize-none outline-none bg-${newTask.color}-500 placeholder:text-stone-950 dark:placeholder:text-stone-100`}
                                    name="description"
                                    id="description"
                                    placeholder='escreva a descrição'
                                    value={newTask.description}
                                    onChange={(e) => setNewTask(prev => ({...prev, [e.target.name]: e.target.value}))}
                                >
                                </textarea>
                                <div title='adicionar emoji' className='absolute mr-2 mt-2 cursor-pointer' onClick={() => setOpenEmojiPicker(true)}>
                                    <SmileyWink weight='light' size={25} />
                                </div>
                                {openEmojiPicker &&
                                    <Emoji  
                                        setEmoji={handlerEmoji}
                                        close={() => setOpenEmojiPicker(false)}
                                    />
                                }
                            </div>
                        </label>
                        <input type='submit' value="Criar tarefa" className='w-full font-medium tracking-wider border border-purple-800 rounded-md bg-purple-800 text-stone-100 py-2 hover:bg-stone-100 dark:hover:bg-stone-950 hover:text-purple-800 active:scale-90 transitions disabled:grayscale disabled:animate-pulse' disabled={disabled}/>
                    </div>
                </form>
            }
            {customFrequence &&
                <CustomFrequence 
                    close={() => setCustomFrequence(false)}
                    change={(event) => changeNewTaskHandler(event)}
                />
            }
        </section>
    );
};