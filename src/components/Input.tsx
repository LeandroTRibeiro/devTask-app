interface PropsType {
    type: string,
    name: string,
    id: string,
    placeholder: string,
    value: string,
    onChange: (e: string) => void,
    disabled: boolean,
    formErrMsg: string
};

export const Input = (props: PropsType) => {

    return (
        <input 
            className={
                `w-full px-2 py-2 outline-none border rounded-md bg-stone-100 dark:bg-stone-950 ${props.formErrMsg.includes('Email') && props.id.includes('email') ||
                props.formErrMsg.includes('Senha') && props.id.includes('password') ||
                props.formErrMsg.includes('Nome') && props.id.includes('firstName') ||
                props.formErrMsg.includes('Sobrenome') && props.id.includes('lastName')
                    ? 'border-red-500 text-red-500' 
                    : 'border-purple-800'}`} 
            type={props.type} 
            name={props.name} 
            id={props.id}
            placeholder={props.placeholder}
            value={props.value ? props.value : ''}
            onChange={(e) => props.onChange(e.target.value)}
            autoComplete='on'
            minLength={props.name.includes('assword') ? 6 : 1}
            required
            disabled={props.disabled}
        />
    );
};