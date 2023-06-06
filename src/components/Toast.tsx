interface PropsType {
    message: string,
    onClick: () => void
};

export const Toast = (props: PropsType) => {

    return (
        <>
            {(props.message.includes('servidores') || props.message.includes('sucesso') || props.message.includes('informação') || props.message.includes('Informações')) &&
                <div className='absolute h-full w-full flex justify-center items-center backdrop-blur-sm bg-stone-950/20 z-10'>
                    <span className='flex flex-col justify-center items-center gap-5 text-center px-5 text-stone-950 dark:text-stone-100'>
                        {props.message}
                        <button className={`w-52 col-span-2 tablet-p:col-span-1 font-medium tracking-wider border  rounded-md  text-stone-100 py-2 hover:bg-transparent  active:scale-95 transitions ${props.message.includes('Informações') ? 'border-green-600 bg-green-600 hover:text-green-600' : 'border-purple-800 bg-purple-800 hover:text-purple-800'}`} onClick={props.onClick}>OK</button>
                    </span>
                </div>
            }
        </>
    );
};