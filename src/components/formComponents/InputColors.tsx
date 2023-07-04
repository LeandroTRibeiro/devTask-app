import { useRef, useEffect } from 'react';

interface InputColorsPropsType {
    color: string
    change: (event: {value: string, name: string}) => void;
}

export const InputColors = (props: InputColorsPropsType) => {

    const colorsRef = useRef<HTMLDivElement>(null); 

    useEffect(() => {

        const keyDownHandler = (e: KeyboardEvent) => {                
        
            try {

                if(colorsRef.current) {
                    const items = Array.from(colorsRef.current.children);
                    const lastIndex = items.length - 1;
                    const lastItem = items[lastIndex] as HTMLButtonElement;
                    const firstItem = items[0] as HTMLButtonElement;

                    if(e.key === "ArrowLeft") {
                        const activeElement = document.activeElement as HTMLButtonElement;
                        const currentIndex = items.findIndex((item) => item.contains(activeElement));

                        if(currentIndex === 0) {
                            lastItem.focus();
                            return;
                        };
                        const previusItem = items[currentIndex - 1] as HTMLButtonElement;
                        previusItem.focus();
                    };
                    if(e.key === "ArrowRight") {
                        const activeElement = document.activeElement as HTMLButtonElement;
                        const currentIndex = items.findIndex((item) => item.contains(activeElement));

                        if(currentIndex === lastIndex) {
                            firstItem.focus();
                            return;
                        };
                        const nextItem = items[currentIndex + 1] as HTMLButtonElement;
                        nextItem.focus();
                        return;
                    };
                }

            } catch (error) {
                return null;
            }

        }

        colorsRef.current?.addEventListener("keydown", keyDownHandler);

        return () => colorsRef.current?.removeEventListener("keydown", keyDownHandler);

    }, []);

    return (
        <div className="flex flex-col gap-2">
            <div ref={colorsRef} className='flex justify-between'>
                <button
                    type="button" 
                    className={`w-7 h-7 transitions rounded-full bg-yellow-500 ${props.color === 'yellow' ? 'border-2 border-stone-950 dark:border-stone-100 scale-125' : ''}`}
                    onClick={() => props.change({value: 'yellow', name: 'color'})}
                    onKeyDown={(e) => e.key === "Enter" ? props.change({value: 'yellow', name: 'color'}) : null}
                />
                <button
                    type="button" 
                    className={`w-7 h-7 transitions rounded-full bg-blue-500 ${props.color === 'blue' ? 'border-2 border-stone-950 dark:border-stone-100 scale-125' : ''}`}
                    onClick={() => props.change({value: 'blue', name: 'color'})}
                    onKeyDown={(e) => e.key === "Enter" ? props.change({value: 'blue', name: 'color'}) : null}
                />
                <button
                    type="button" 
                    className={`w-7 h-7 transitions rounded-full bg-green-500 ${props.color === 'green' ? 'border-2 border-stone-950 dark:border-stone-100 scale-125' : ''}`}
                    onClick={() => props.change({value: 'green', name: 'color'})}
                    onKeyDown={(e) => e.key === "Enter" ? props.change({value: 'green', name: 'color'}) : null}
                />
                <button
                    type="button" 
                    className={`w-7 h-7 transitions rounded-full bg-orange-500 ${props.color === 'orange' ? 'border-2 border-stone-950 dark:border-stone-100 scale-125' : ''}`}
                    onClick={() => props.change({value: 'orange', name: 'color'})}
                    onKeyDown={(e) => e.key === "Enter" ? props.change({value: 'orange', name: 'color'}) : null}
                />
                <button
                    type="button" 
                    className={`w-7 h-7 transitions rounded-full bg-pink-500 ${props.color === 'pink' ? 'border-2 border-stone-950 dark:border-stone-100 scale-125' : ''}`}
                    onClick={() => props.change({value: 'pink', name: 'color'})}
                    onKeyDown={(e) => e.key === "Enter" ? props.change({value: 'pink', name: 'color'}) : null}
                />
                <button 
                    className={`w-7 h-7 transitions rounded-full bg-red-500 ${props.color === 'red' ? 'border-2 border-stone-950 dark:border-stone-100 scale-125' : ''}`}
                    onClick={() => props.change({value: 'red', name: 'color'})}
                    onKeyDown={(e) => e.key === "Enter" ? props.change({value: 'red', name: 'color'}) : null}
                />
            </div>
        </div>
    );
};