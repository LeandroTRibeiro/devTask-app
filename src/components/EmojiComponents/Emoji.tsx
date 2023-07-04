import { useAppSelector } from '../../redux/hooks/useAppSelector';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';


interface EmojiPropsType {
    setEmoji: (emoji: any) => void;
    close: () => void
}

export const Emoji = (props: EmojiPropsType) => {

    const emojiPickerRef = useRef<HTMLDivElement>(null);

    const theme = useAppSelector(state => state.ThemeReducer.status);

    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            try {
                const node = ReactDOM.findDOMNode(emojiPickerRef.current);
                if (node && !node.contains(event.target as Node)) {
                    props.close();
                }
            } catch (error) {
                return null;
            }
        };

        document.addEventListener('mousedown', handleClick, false);

        return () => {
            document.removeEventListener('mousedown', handleClick, false);
        };
    }, []);

    return (
        <div className='absolute' ref={emojiPickerRef}>
            <Picker
                data={data} 
                onEmojiSelect={props.setEmoji} 
                theme={theme} 
            />
        </div>
    );
};