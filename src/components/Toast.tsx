interface PropsType {
    message: string,
    onClick: () => void
};

export const Toast = (props: PropsType) => {

    return (
        <>
            {(props.message.includes('servidores') || props.message.includes('sucesso')) &&
                <div className='absolute h-full w-full flex justify-center items-center backdrop-blur-sm bg-stone-950/20 z-10'>
                    <span className='flex flex-col justify-center items-center gap-5 text-center px-5 text-stone-950 dark:text-stone-100'>
                        {props.message}
                        <button className="w-52 col-span-2 tablet-p:col-span-1 font-medium tracking-wider border border-purple-800 rounded-md bg-purple-800 text-stone-100 py-2 hover:bg-transparent hover:text-purple-800 active:scale-95 transitions" onClick={props.onClick}>OK</button>
                    </span>
                </div>
            }
        </>
    );
};