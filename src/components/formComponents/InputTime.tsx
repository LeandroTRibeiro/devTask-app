import { useEffect, useRef, useState } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { Clock } from "@phosphor-icons/react";

export const InputTime = () => {

    const detailsRef = useRef<HTMLDetailsElement>(null);

    const [hour, setHour] = useState('00:00');

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
            <summary className="flex items-center justify-center gap-1 text-lg list-none border border-purple-800 rounded-md py-1">{} <Clock size={25} /></summary>
            <div className="flex justify-between">
                <ul className="absolute w-1/2 max-w-[288px] max-h-44 mt-1 rounded-l-md backdrop-blur-sm bg-stone-400/20 z-20 overflow-y-scroll">
                    {Array.from({ length: 24 }, (_, indexH) => (
                        <li 
                            key={nanoid()}
                            className="w-full flex items-center justify-center p-2 hover:bg-purple-800 first:rounded-tl-md last:rounded-bl-md"
                        >
                                <div>{indexH.toString().padStart(2,'0')}</div>
                        </li>
                    ))}
                </ul>
                <ul className="absolute w-1/2 right-0 max-w-[288px] max-h-44 mt-1 rounded-r-md backdrop-blur-sm bg-stone-400/20 z-20 overflow-y-scroll">
                    {Array.from({ length: 24 }, (_, indexH) => (
                        <li 
                            key={nanoid()}
                            className="w-full flex items-center justify-center p-2 hover:bg-purple-800 first:rounded-tr-md last:rounded-br-md"
                        >
                                <div>{indexH.toString().padStart(2,'0')}</div>
                        </li>
                    ))}
                </ul>
            </div>
        </details>
    );
};