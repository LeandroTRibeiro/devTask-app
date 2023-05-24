import { Eye, EyeClosed } from "@phosphor-icons/react";

interface PropsType {
    showPassword: boolean,
    message: string,
    onClick: () => void
}

export const ShowPasswordIcons = (props: PropsType) => {

    return (
        <>
            {props.showPassword &&
                <EyeClosed size={22} className={`absolute mr-2 cursor-pointer ${props.message.includes('Senha') ? 'text-red-500' : ''}`} onClick={props.onClick} />
            }
            {!props.showPassword &&
                <Eye size={22} className={`absolute mr-2 cursor-pointer ${props.message.includes('Senha') ? 'text-red-500' : ''}`} onClick={props.onClick} />
            }
        </>
    );
};