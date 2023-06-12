interface InputPropsType {
    type: string,
    name: string,
    id: string,
    placeholder: string,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    disabled: boolean,
    required: boolean,
    formErrMsg: string
};

export const Input = (props: InputPropsType) => {

    return (
        <input 
            className={
                `w-full px-2 py-2 outline-none border rounded-md birthday dark:birthday-dark bg-transparent ${props.formErrMsg.includes('Email') && props.id.includes('email') ||
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
            onChange={(e) => props.onChange(e)}
            autoComplete='on'
            minLength={props.name.includes('assword') ? 6 : 1}
            required={props.required ? true : false}
            disabled={props.disabled}
        />
    );
};