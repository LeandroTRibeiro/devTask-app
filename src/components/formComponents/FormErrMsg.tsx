interface FormErrMsgPropsType {
    formErrMsg: string,
    name: string
}

export const FormErrMsg = (props: FormErrMsgPropsType) => {
    return (
        <>
            {props.formErrMsg.includes(props.name) &&
                <span className='font-thin text-sm text-red-500'>{props.formErrMsg}</span>
            }
        </>
    )
}