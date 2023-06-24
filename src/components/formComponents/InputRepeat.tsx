import { useState, useEffect, useRef } from "react";
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

export const InputReapeat = (props: SelectPropsType) => {

    const detailsRef = useRef<HTMLDetailsElement>(null);
    const summaryRef = useRef<HTMLDetailsElement>(null);
    const listRef = useRef<HTMLUListElement>(null);

    const [onFocus, setOnFocus] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

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

    
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {   

      if (listRef.current && detailsRef.current && onFocus) {

        const items = Array.from(listRef.current.children);
        let newIndex = highlightedIndex;

        if (event.key === "ArrowUp" && detailsRef.current.open === true) {
          event.preventDefault();
          newIndex = (highlightedIndex - 1 + items.length) % items.length;

        } else if (event.key === "ArrowDown" && detailsRef.current.open === true) {
          event.preventDefault();
          newIndex = (highlightedIndex + 1) % items.length;
        } else if (event.key === "Enter") {
          event.preventDefault();
          if (newIndex >= 0 && newIndex < items.length) {
            const selectedValue = props.frequences[newIndex].value;
            props.change({ value: selectedValue, name: "repeat" });
            detailsRef.current.open = false;
            return;
          }
          detailsRef.current.open = true;
        }

        setHighlightedIndex(newIndex);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);

  }, [highlightedIndex, props.frequences, props.change, onFocus]);

  useEffect(() => {
    if(summaryRef.current) {
        summaryRef.current.addEventListener("focus", () => setOnFocus(true));
        summaryRef.current.addEventListener("blur", () => setOnFocus(false));
    }

    return () => {
        if(summaryRef.current) {
            summaryRef.current.removeEventListener("focus", () => setOnFocus(true));
            summaryRef.current.removeEventListener("blur", () => setOnFocus(false));
        }
    }
  }, []);

    return (
        <details ref={detailsRef} className="w-full relative cursor-pointer">
            <summary ref={summaryRef} className="flex items-center justify-between list-none border border-purple-800 rounded-md p-2">
                {props.frequences.map((item) => {
                    if(item.value.length === props.selected.length) {
                        return (
                            <div key={nanoid()}>{item.name}</div>
                        )
                    }
                })}
                <Check size={20} className="text-green-500"/>
            </summary>
            <ul ref={listRef} className="absolute w-full mt-1 rounded-md backdrop-blur-sm bg-stone-400/20 z-20">
                {props.frequences.map((item, index) => (
                    <li 
                        key={nanoid()}
                        className={`w-full flex items-center justify-between p-2 hover:bg-purple-800 first:rounded-t-md last:rounded-b-md ${index === highlightedIndex ? 'bg-purple-800' : ''}`}
                        onClick={() => props.change({value: item.value, name: 'repeat' })}
                    >
                        {item.name}
                    </li>
                ))}
            </ul>
        </details>
    );
};