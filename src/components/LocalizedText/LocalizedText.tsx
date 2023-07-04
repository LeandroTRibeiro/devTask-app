import { useEffect, useState } from 'react';
import { texts } from '../../../locale/translations.js';

const LocalizedText = (props: {id: string}) => {

    const [userLanguage, setUserLanguage] = useState(navigator.language.split('-')[0]);
    const [text, setText] = useState('');

    useEffect(() => {

        const changeLanguage = () => {
            console.log('mudei');
            
            setUserLanguage(navigator.language.split('-')[0]);
        };  

        window.addEventListener('languagechange', changeLanguage);

        return () => window.removeEventListener('languagechange', changeLanguage);

    },[]);

    useEffect(() => {
        if (texts[props.id] && texts[props.id][userLanguage]) {
            setText(texts[props.id][userLanguage]);
          } else {
            setText(texts[props.id]['en']);
          }
    },[props.id, userLanguage]);

    return (
        <span>{text}</span>
    )
}

export default LocalizedText;