import { useEffect, useRef } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { Check } from "@phosphor-icons/react";

type SelectPropsType = {
    frequences: {
        name: string,
        value: never[] | number[]
    }[],
    selected: never[] | number[],
    change: (event: {value: number[] | never[], name: string}) => void,
}

export const InputReapeat = (Props: SelectPropsType) => {

    const detailsRef = useRef<HTMLDetailsElement>(null);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if(detailsRef.current) {
            if (!detailsRef.current.contains(event.target as Node)) {
              detailsRef.current.open = false;
            }
        }
      }
  
      document.addEventListener('click', handleClickOutside);
  
      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    }, []);

    return (
        <details className="max-w-[288px] relative cursor-pointer" ref={detailsRef}>
            <summary className="flex items-center justify-between list-none border border-purple-800 rounded-md p-2">
                {Props.frequences.map((item) => {
                    if(item.value.length === Props.selected.length) {
                        return (
                            <div key={nanoid()}>{item.name}</div>
                        )
                    }
                })}
                <Check size={20} className="text-green-500"/>
            </summary>
            <ul className="absolute w-full max-w-[288px] mt-1 rounded-md backdrop-blur-sm bg-stone-400/20 z-20">
                {Props.frequences.map((item) => (
                    <li 
                        key={nanoid()}
                        className="w-full flex items-center justify-between p-2 hover:bg-purple-800 first:rounded-t-md last:rounded-b-md"
                        onClick={() => Props.change({value: item.value, name: 'repeat' })}
                    >
                        {item.name}
                        {item.value === Props.selected &&
                            <Check size={20} className="text-green-500"/>
                        }
                    </li>
                ))}
            </ul>
        </details>
    );
};