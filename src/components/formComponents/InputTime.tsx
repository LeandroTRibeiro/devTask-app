import { useEffect, useRef, useState, useMemo } from "react";
import { nanoid } from "@reduxjs/toolkit";

let side = 0;

interface InputTimeProps {
  startInput: boolean,
  startTime: string,
  change: (event: {value: string, name: string}) => void,
}

export const InputTime = (props: InputTimeProps) => {
  
    // const detailsRef = useRef<HTMLDetailsElement>(null);
    // const inputRef = useRef<HTMLInputElement>(null);
    // const summaryRef = useRef<HTMLDetailsElement>(null);
    // const hoursRef = useRef<HTMLUListElement>(null);
    // const minutesRef = useRef<HTMLUListElement>(null);

    // const [isOpen, setIsOpen] = useState(false);
    // const [onFocus, setOnFocus] = useState(false);
    // const [highlightedIndexHour, setHighlightedIndexHour] = useState<number>(-1);
    // const [highlightedIndexMinute, setHighlightedIndexMinute] = useState<number>(-1);

    // const [selectedTime, setSelectedTime] = useState({
    //   hour: '',
    //   minute: ''
    // });

    // const [listTimes, setListTimes] = useState({
    //   hours: Array.from({length: 24}, (_, index) => index.toString().padStart(2,'0')),
    //   minutes: Array.from({length: 60}, (_, index) => index.toString().padStart(2,'0'))
    // });

    // useEffect(() => {
    //     const handleClickOutside = (event: MouseEvent) => {
    //       if(detailsRef.current && isOpen) {
    //           if (!detailsRef.current.contains(event.target as Node)) {
    //             setIsOpen(false);
    //           }            
    //       }                    
    //     }
    
    //     document.addEventListener('click', handleClickOutside);
    
    //     return () => {
    //       document.removeEventListener('click', handleClickOutside);
    //     };
    // }, []);
    
    // useEffect(() => {
    //   if(!props.startInput && props.startTime) {
    //     const startTime = {
    //       hour: +props.startTime.split(':')[0],
    //       minute: +props.startTime.split(':')[1]
    //     }

    //     setListTimes({
    //       hours: listTimes.hours.filter((item) => +item >= startTime.hour || +item === 0),
    //       minutes: listTimes.minutes.filter((item) => +item >= startTime.minute || +item === 0)
    //     });

    //   }
    // }, [props.startTime]);

    // useEffect(() => {

    //   if(props.startInput) {
    //     props.change({
    //       value: `${selectedTime.hour}:${selectedTime.minute}`,
    //       name: 'start'
    //     });
    //   };

    //   if(!props.startInput) {
    //     props.change({
    //       value: `${selectedTime.hour}:${selectedTime.minute}`,
    //       name: 'end'
    //     });
    //   };

    // }, [selectedTime]);
    
    // useEffect(() => {

    //   const handleKeyDown = (event: KeyboardEvent) => {

    //     if(
    //         hoursRef.current && 
    //         minutesRef.current && 
    //         detailsRef.current && 
    //         onFocus
    //       ) {

    //       const hoursItems = Array.from(hoursRef.current.children);
    //       const minutesItems = Array.from(minutesRef.current.children);

    //       let hourIndex = highlightedIndexHour;
    //       let minuteIndex = highlightedIndexMinute;

    //       if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
    //           side === 0 ? side = 1 : side = 0;
    //       } else if (event.key === "ArrowUp") {
    //         event.preventDefault();
    //         if (side === 0) {
    //           hourIndex = (highlightedIndexHour - 1 + hoursItems.length) % hoursItems.length;
    //           hoursItems[hourIndex].scrollTo();                           
    //         }
    //         if (side === 1) {
    //           minuteIndex = (highlightedIndexMinute - 1 + minutesItems.length) % minutesItems.length;
    //           minutesItems[minuteIndex].scrollTo();
    //         }
    //       } else if (event.key === "ArrowDown") {
    //         event.preventDefault();
    //         if (side === 0) {
    //           hourIndex = (highlightedIndexHour + 1) % hoursItems.length;
    //           hoursItems[hourIndex].scrollTo();                           
    //         }
    //         if (side === 1) {
    //           minuteIndex = (highlightedIndexMinute + 1) % minutesItems.length;
    //           minutesItems[minuteIndex].scrollTo(); 
    //         }
    //       } else if (event.key === "Enter") {
    //         event.preventDefault();
    //         if(side === 0) {
    //           if (hourIndex >= 0 && hourIndex < hoursItems.length) {
    //             setSelectedTime(prev => ({...prev, hour: hoursItems[hourIndex].innerHTML}));
    //             return;
    //           }

    //         }
    //         if(side === 1) {
    //           if (hourIndex >= 0 && hourIndex < hoursItems.length) {
    //             setSelectedTime(prev => ({...prev, minute: minutesItems[minuteIndex].innerHTML}));
    //             setIsOpen(false);
    //             return;
    //           }
    //         }
    //         side = 0;
    //         setIsOpen(true);
    //       }
    //       setHighlightedIndexHour(hourIndex);
    //       setHighlightedIndexMinute(minuteIndex);
    //     }
    //   }

    //   document.addEventListener('keydown', handleKeyDown);

    //   return () => document.removeEventListener('keydown', handleKeyDown);

    // }, [highlightedIndexHour, highlightedIndexMinute, listTimes, onFocus]);

    // const eventHandlers = useMemo(() => ({
    //   onFocus: () => !onFocus ? setOnFocus(true) : null,
    //   onblur: () => onFocus ? setOnFocus(false) : null,
    // }), []);

    // useEffect(() => {

    //   const handleFocus = () => {
    //     setOnFocus(true);
    //   };
  
    //   const handleBlur = () => {
    //     setOnFocus(false);
    //   };

    //   if(summaryRef.current) {
    //       summaryRef.current.addEventListener("focus", handleFocus);
    //       summaryRef.current.addEventListener("blur", handleBlur);
          
    //   }
  
    //   return () => {
    //       if(summaryRef.current) {
    //           summaryRef.current.removeEventListener("focus", handleFocus);
    //           summaryRef.current.removeEventListener("blur", handleBlur);
    //       }
    //   }
    // }, []);
    
    // const handleClick = () => {
    //   if(detailsRef.current && inputRef.current) {
    //     setIsOpen(true);
    //     inputRef.current.focus();
    //     inputRef.current.select();
    //   }
    // };

    // const changeTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    //   const { name, value } = e.target;
      
    //   if(value.length < 3) {
    //     if((name === 'hour' && +value < 24 && +value > -1) || (name === 'minute' && +value < 60 && +value > -1)) {
    //       setSelectedTime(prevState => ({
    //         ...prevState,
    //         [name]: value
    //       }));
    //       return;
    //     }
    //   }
    //     setSelectedTime(prevState => ({
    //       ...prevState,
    //       [name]: '00'
    //     }));
    // }

    // return (
    //     <details ref={detailsRef} className="max-w-[288px] relative cursor-pointer" open={isOpen} onFocus={eventHandlers.onFocus} onBlur={eventHandlers.onblur} >
    //         <summary ref={summaryRef} className="flex items-center justify-end text-lg list-none border border-purple-800 rounded-md" onClick={handleClick}>
    //             <input
    //               ref={inputRef} 
    //               className="outline-none appearance-none max-w-[67px] bg-transparent py-1 px-2 text-center tracking-widest placeholder:text-stone-950 dark:placeholder:text-stone-100"
    //               type="number" 
    //               name="hour" 
    //               id="hour"
    //               value={selectedTime.hour ? selectedTime.hour : ''}
    //               placeholder="hh"
    //               onChange={changeTime}
    //               maxLength={2}
    //             />
    //             <div>:</div>
    //             <input 
    //               className="outline-none appearance-none max-w-[67px] bg-transparent py-1 px-2 text-center tracking-widest placeholder:text-stone-950 dark:placeholder:text-stone-100"
    //               type="number" 
    //               name="minute" 
    //               id="minute"
    //               value={selectedTime.minute ? selectedTime.minute : ''}
    //               placeholder="mm"
    //               onChange={changeTime}
    //               maxLength={2}
    //             />  
    //         </summary>
    //         <div className="flex justify-between">
    //             <ul ref={hoursRef} className="absolute w-1/2 max-w-[288px] max-h-44 mt-1 rounded-l-md backdrop-blur-sm bg-stone-400/20 z-20 overflow-y-scroll scroll-smooth snap-y">
    //                 {listTimes.hours.map((hour, index) => (
    //                       <li 
    //                         key={nanoid()}
    //                         onClick={() => setSelectedTime(prev => ({...prev, hour: hour}))}
    //                         className={`snap-start w-full flex items-center justify-center p-2 hover:bg-purple-800 first:rounded-tl-md last:rounded-bl-md ${index === highlightedIndexHour ? 'bg-purple-800 focus:' : ''}`}
    //                       >
    //                         {hour}
    //                       </li>
    //                 ))}
    //             </ul>
    //             <ul ref={minutesRef} className="absolute w-1/2 right-0 max-w-[288px] max-h-44 mt-1 rounded-r-md backdrop-blur-sm bg-stone-400/20 z-20 overflow-y-scroll snap-y">
    //                 {listTimes.minutes.map((minute, index) => (
    //                     <li 
    //                       key={nanoid()}
    //                       onClick={() => setSelectedTime(prev => ({...prev, minute: minute}))}
    //                       className={`snap-start w-full flex items-center justify-center p-2 hover:bg-purple-800 first:rounded-tr-md last:rounded-br-md ${index === highlightedIndexMinute ? 'bg-purple-800' : ''}`}
    //                     >
    //                         {minute}
    //                     </li>
    //                 ))}
    //             </ul>
    //         </div>
    //     </details>
    // );

  return (
    <div>
      
    </div>
  );

};