import { X } from "@phosphor-icons/react"
import { InputWeekDay } from "../formComponents/InputRepeat/InputWeekDay"

interface CustomFrequencePropsType {
    close: () => void;
    change: (event: {value: number[], name: string}) => void;
}

export const CustomFrequence = (props: CustomFrequencePropsType) => {
    return (
        <div className={`absolute top-0 left-0 w-screen max-w-[1440px] h-screen flex justify-center items-center backdrop-blur-sm bg-stone-400/20 text-stone-950 dark:text-stone-100 overflow-hidden z-20`}>
            <div className="mobile-g:w-full mobile-g:h-full mobile-g:rounded-none grid grid-cols-2 gap-5 tablet-m:gap-3 shadow-black shadow-md p-5 rounded-md bg-stone-100 dark:bg-stone-950 transitions">
                <div className='col-span-2 w-full flex items-center justify-between'>
                    <h1 className='text-2xl'>Repetição Personalizada</h1>
                    <X size={25} weight="bold" className="hover:text-red-500 active:scale-90 transitions cursor-pointer" onClick={props.close} />
                </div>
                <InputWeekDay 
                    change={props.change}
                />
            </div>
        </div>
    )
}