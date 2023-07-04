import { useState, useEffect, useRef, useMemo } from "react";
import ReactDOM from 'react-dom';
import { nanoid } from "@reduxjs/toolkit";
import { Check } from "@phosphor-icons/react";
import { SelectedRepeat } from "./SelectedRepeat";

type SelectPropsType = {
    frequences: {
        name: string,
        value: never[] | number[]
    }[],
    selected: number[],
    change: (event: {value: number[] | never[], name: string}) => void,
    customFrequence: () => void
}

export const InputReapeat = (props: SelectPropsType) => {

  //   const detailsRef = useRef<HTMLDetailsElement>(null);
  //   const summaryRef = useRef<HTMLDetailsElement>(null);
  //   const listRef = useRef<HTMLUListElement>(null);

  //   const [isOpen, setIsOpen] = useState(false);
  //   const [onFocus, setOnFocus] = useState(false);
  //   const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

  //   useEffect(() => {
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
  //   }, []); 

    
  // useEffect(() => {
  //   const handleKeyDown = (event: KeyboardEvent) => {    
      
  //     if (listRef.current && detailsRef.current && onFocus) {

  //       const items = Array.from(listRef.current.children);
  //       let newIndex = highlightedIndex;

  //       if (event.key === "ArrowUp") {
  //         event.preventDefault();          
  //         newIndex = (highlightedIndex - 1 + items.length) % items.length;

  //       } else if (event.key === "ArrowDown") {
  //         event.preventDefault();
  //         newIndex = (highlightedIndex + 1) % items.length;
  //       } else if (event.key === "Enter") {
  //         event.preventDefault();
  //         if (newIndex >= 0 && newIndex < items.length) {
  //           const selectedValue = props.frequences[newIndex].value;
  //           props.change({ value: selectedValue, name: "repeat" });
  //           setIsOpen(false);
  //           return;
  //         }      
  //         setIsOpen(false);
  //       }

  //       setHighlightedIndex(newIndex);
  //     }
  //   };

  //   document.addEventListener("keydown", handleKeyDown);

  //   return () => document.removeEventListener("keydown", handleKeyDown);

  // }, [highlightedIndex, props.frequences, props.change, onFocus]);

  // const eventHandlers = useMemo(() => ({
  //   onFocus: () => !onFocus ? setOnFocus(true) : null,
  //   onblur: () => onFocus ? setOnFocus(false) : null,
  // }), [onFocus]);

  // const handleClick = (value: never[] | number[], name: string) => {

  //   if(name === 'Personalizado...') {
  //     props.customFrequence();
  //     return;
  //   };

  //   props.change({value, name: 'repeat' });

  // }

  //   return (
  //       <details ref={detailsRef} className="w-full relative cursor-pointer" open={isOpen} onFocus={eventHandlers.onFocus} onBlur={eventHandlers.onblur}>
  //           <summary ref={summaryRef} className="flex items-center justify-between list-none border border-purple-800 rounded-md p-2">
  //               {props.frequences.map((item) => {
  //                   if(item.value.length === props.selected.length) {
  //                       return (
  //                           <div key={nanoid()}>{item.name}</div>
  //                       )
  //                   }
  //               })}
  //               <Check size={20} className="text-green-500"/>
  //           </summary>
  //           <ul ref={listRef} className="absolute w-full mt-1 rounded-md backdrop-blur-sm bg-stone-400/20 z-20">
  //               {props.frequences.map((item, index) => (
  //                   <li 
  //                       key={nanoid()}
  //                       className={`w-full flex items-center justify-between p-2 hover:bg-purple-800 first:rounded-t-md last:rounded-b-md ${index === highlightedIndex ? 'bg-purple-800' : ''}`}
  //                       onClick={() => handleClick(item.value, item.name)}
  //                   >
  //                       {item.name}
  //                   </li>
  //               ))}
  //           </ul>
  //       </details>
  //   );

  const repeatRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClickOutSide = (event: MouseEvent) => {
      try {
          const node = ReactDOM.findDOMNode(repeatRef.current);
          if (node && !node.contains(event.target as Node)) {
            setIsOpen(false);
          }
      } catch (error) {
          return null;
      }
    };

    document.addEventListener('mousedown', handleClickOutSide, false);

    return () => {
        document.removeEventListener('mousedown', handleClickOutSide, false);
    };
  }, []);

  useEffect(() => {

    const keyDownHandler = (e: KeyboardEvent) => {
      
      try {        
        const node = ReactDOM.findDOMNode(buttonRef.current);
        if(node && node.contains(e.target as Node)) {          
          if(e.key === "Enter") {
            e.preventDefault();
            setIsOpen(!isOpen);
            return;
          };
        };
      } catch (error) {
        return null
      };
    };

    buttonRef.current?.addEventListener("keydown", keyDownHandler);

    return () => buttonRef.current?.removeEventListener("keydown", keyDownHandler);

  }, [isOpen]);

  useEffect(() => {

    const keyDownHandler = (e: KeyboardEvent) => {

      try {
        if(listRef.current) {
          const items = Array.from(listRef.current.children);
          const lastIndex = items.length - 1;
          const lastItem = items[lastIndex].children[0] as HTMLButtonElement;
          const firstItem = items[0].children[0] as HTMLButtonElement;
          
          if(e.key === "Tab") {
            if(document.activeElement === lastItem) {
              e.preventDefault();
              firstItem.focus();
            }
          };
          if(e.key === "ArrowUp") {

            const activeElement = document.activeElement as HTMLButtonElement;
            const currentIndex = items.findIndex((item) => item.contains(activeElement));
            
            if(currentIndex === -1) {
              lastItem.focus();
              return;
            };
            if(currentIndex === 0) {
              lastItem.focus();
              return;
            };
            const previusItem = items[currentIndex - 1].children[0] as HTMLButtonElement;
            previusItem.focus();
            return;
          };
          if(e.key === "ArrowDown") {

            const activeElement = document.activeElement as HTMLButtonElement;
            const currentIndex = items.findIndex((item) => item.contains(activeElement));

            if(currentIndex === -1) {
              firstItem.focus();
              return;
            };
            if(currentIndex === lastIndex) {
              firstItem.focus();
              return;
            };
            const nextItem = items[currentIndex + 1].children[0] as HTMLButtonElement;
            nextItem.focus();
            return;
          };

  
        }      

      } catch (error) {
        return null;
      };

    };

    document.addEventListener("keydown", keyDownHandler);

    return () => document.removeEventListener("keydown", keyDownHandler);

  }, []);
  
  const handleClick = (value: never[] | number[], name: string, key: boolean) => {
    props.change({value, name: 'repeat' });
    key ? setIsOpen(false) : null;
  };

  return (
    <div ref={repeatRef} className="flex flex-col gap-2 relative">
      <button ref={buttonRef} className="flex items-center justify-between border border-purple-800 rounded-md p-2" onClick={() => setIsOpen(!isOpen)}>
        <SelectedRepeat 
          selectedRepeat={props.selected}
          frequences={props.frequences}
        />
        <Check size={20} className="text-green-500"/>
      </button>
      <div className="w-full">
        {isOpen &&
          <ul ref={listRef} className="absolute w-full rounded-md backdrop-blur-sm bg-stone-400/20 z-20">
            {props.frequences.map((item) => (
              <li key={nanoid()}>
                <button 
                  className="w-full flex items-center justify-between p-2 hover:bg-purple-800 first:rounded-t-md last:rounded-b-md focus:bg-purple-800" 
                  onClick={() => handleClick(item.value, item.name, false)}
                  onKeyDown={(e) => e.key === "Enter" ? handleClick(item.value, item.name, true) : null}
                >
                  {item.name}                
                </button>
              </li>
            ))
            }
            <li key={nanoid()}>
              <button 
                className="w-full flex items-center justify-between p-2 hover:bg-purple-800 first:rounded-t-md last:rounded-b-md focus:bg-purple-800" 
                onClick={() => props.customFrequence()}
                onKeyDown={(e) => e.key === "Enter" ? props.customFrequence() : null}
              >
                Personalizado...       
              </button>
            </li>
          </ul>
        }
      </div>
    </div>
  )
};