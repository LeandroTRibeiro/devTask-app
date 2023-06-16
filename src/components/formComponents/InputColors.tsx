import { useState } from "react";

export const InputColors = () => {

    const [color, setColor] = useState('purple')

    return (
        <div className="flex flex-col gap-2">
            <div className='flex justify-between'>
                <button
                    type="button" 
                    className={`w-7 h-7 transitions rounded-full bg-purple-800 ${color === 'purple' ? 'border-2 border-stone-100 scale-125' : ''}`}
                    onClick={() => setColor('purple')}
                />
                <button
                    type="button" 
                    className={`w-7 h-7 transitions rounded-full bg-yellow-500 ${color === 'yellow' ? 'border-2 border-stone-100 scale-125' : ''}`}
                    onClick={() => setColor('yellow')}
                />
                <button
                    type="button" 
                    className={`w-7 h-7 transitions rounded-full bg-blue-500 ${color === 'blue' ? 'border-2 border-stone-100 scale-125' : ''}`}
                    onClick={() => setColor('blue')}
                />
                <button
                    type="button" 
                    className={`w-7 h-7 transitions rounded-full bg-green-500 ${color === 'green' ? 'border-2 border-stone-100 scale-125' : ''}`}
                    onClick={() => setColor('green')}
                />
                <button
                    type="button" 
                    className={`w-7 h-7 transitions rounded-full bg-orange-500 ${color === 'orange' ? 'border-2 border-stone-100 scale-125' : ''}`}
                    onClick={() => setColor('orange')}
                />
                <button
                    type="button" 
                    className={`w-7 h-7 transitions rounded-full bg-pink-500 ${color === 'pink' ? 'border-2 border-stone-100 scale-125' : ''}`}
                    onClick={() => setColor('pink')}
                />
                <button 
                    className={`w-7 h-7 transitions rounded-full bg-red-500 ${color === 'red' ? 'border-2 border-stone-100 scale-125' : ''}`}
                    onClick={() => setColor('red')}
                />
            </div>
        </div>
    );
};