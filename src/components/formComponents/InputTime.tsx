import { useEffect, useRef, useState, WheelEvent } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { Clock } from "@phosphor-icons/react";

interface InputTimePropsType {
    hour: string
}

export const InputTime = (Props: InputTimePropsType) => {

    const detailsRef = useRef<HTMLDetailsElement>(null);
    const scrollRef = useRef<HTMLUListElement>(null);

    const [time, setTime] = useState({
      hour: 0,
      minute: 0
    });

    const [scrollPosition, setScrollPosition] = useState(0);
    const [hours, setHours] = useState(Array.from({length: 24}, (_, index) => index.toString().padStart(2,'0')));
    const [minutes, seMinutes] = useState(Array.from({length: 24}, (_, index) => index.toString().padStart(2,'0')));

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

    const handleScroll = (event: React.UIEvent<HTMLUListElement>) => {
        const target = event.target as HTMLUListElement;
        const currentPosition = target.scrollTop;
      
        if (currentPosition === 0) {
          // Impedir rolagem para cima além do topo
          target.scrollTop = 1;
        } else if (
          currentPosition + target.offsetHeight >= target.scrollHeight
        ) {
          // Impedir rolagem para baixo além do final
          target.scrollTop = target.scrollHeight - target.offsetHeight - 1;
        }
      
        if (currentPosition > scrollPosition) {
          // Rolar para baixo, adicionar próximo item da lista
          setHours((prevHours) => {
            const nextIndex = (prevHours.indexOf(prevHours[prevHours.length - 1]) + 1) % prevHours.length;
            return [...prevHours, prevHours[nextIndex]];
          });
        } else if (currentPosition < scrollPosition) {
          // Rolar para cima, adicionar item anterior da lista
          setHours((prevHours) => {
            const lastIndex = prevHours.length - 1;
            const prevIndex = (lastIndex + prevHours.indexOf(prevHours[0])) % lastIndex;
            return [prevHours[prevIndex], ...prevHours];
          });
        }
      
        setScrollPosition(currentPosition);
    };
    
    const handleClick = () => {

      if(detailsRef.current) {
        detailsRef.current.open = true; // Abre o <details>
        const input = document.getElementById("time") as HTMLInputElement | null;
        if (input) {
          input.focus();
          input.select();
        }
      }
    };

    const changeTime = (e: React.ChangeEvent<HTMLInputElement>) => {

      const { name, value } = e.target;

      if(value.length < 3) {
        setTime(prevState => ({
          ...prevState,
          [name]: value
        }));
      }

    }

    return (
        <details className="max-w-[288px] relative cursor-pointer" ref={detailsRef}>
            <summary className="flex items-center justify-end text-lg list-none border border-purple-800 rounded-md" onClick={handleClick}>
                <input 
                  className="outline-none appearance-none max-w-[67px] bg-transparent py-1 px-2 text-center tracking-widest"
                  type="number" 
                  name="hour" 
                  id="hour"
                  value={time.hour ? time.hour : ''}
                  placeholder="hh"
                  onChange={changeTime}
                  minLength={2}
                  maxLength={2}
                  max={23}
                />
                :
                <input 
                  className="outline-none appearance-none max-w-[67px] bg-transparent py-1 px-2 text-center tracking-widest"
                  type="number" 
                  name="minute" 
                  id="minute"
                  value={time.minute ? time.minute : ''}
                  placeholder="mm"
                  onChange={changeTime}
                  minLength={2}
                  maxLength={2}
                />  
            </summary>
            <div className="flex justify-between">
                <ul ref={scrollRef} className="absolute w-1/2 max-w-[288px] max-h-44 mt-1 rounded-l-md backdrop-blur-sm bg-stone-400/20 z-20 overflow-y-scroll scroll-smooth snap-y">
                    {hours.map((hour) => (
                            <li 
                                key={nanoid()}
                                className="snap-start w-full flex items-center justify-center p-2 hover:bg-purple-800 first:rounded-tl-md last:rounded-bl-md"
                            >
                                {hour}
                            </li>
                    ))}
                </ul>
                <ul className="absolute w-1/2 right-0 max-w-[288px] max-h-44 mt-1 rounded-r-md backdrop-blur-sm bg-stone-400/20 z-20 overflow-y-scroll snap-y">
                    {Array.from({ length: 24 }, (_, indexH) => (
                        <li 
                            key={nanoid()}
                            className="snap-start w-full flex items-center justify-center p-2 hover:bg-purple-800 first:rounded-tr-md last:rounded-br-md"
                        >
                                <div>{indexH.toString().padStart(2,'0')}</div>
                        </li>
                    ))}
                </ul>
            </div>
        </details>
    );
};