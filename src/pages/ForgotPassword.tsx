import { useState } from "react";

import { Link } from "react-router-dom";

import { API } from "../api/API";
import axios from "axios";

import { Input } from "../components/Input";
import { FormErrMsg } from "../components/FormErrMsg";
import { Toast } from "../components/Toast";

import { PencilLine } from "@phosphor-icons/react";

export const ForgotPassword = () => {

    const [email, setEmail] = useState('');
    const [disabled, setDisabled] = useState(false);
    const [formMsg, setFormMsg] = useState('');

    const HandlerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        setFormMsg('');
        setDisabled(true);

        try {

            await API.forgotPassword(email);

            setDisabled(false);
            setFormMsg('O email foi enviado com sucesso, acesse sua caixa de entrada e clique no link para refazer sua senha!');

        } catch(error) {

            if (axios.isAxiosError(error))  {

                if(error.message.includes('Network')) {
                    setFormMsg('No momento nossos servidores estão ocupados tente novamente mais tarde!');
                    setDisabled(false);
                    return;
                };
                setFormMsg('Email inválido.');
                setDisabled(false);
                return;
            };
        }
    };

    return (
        <section className={`w-screen max-w-[1440px] h-screen flex tablet-p:flex-col-reverse bg-stone-100 dark:bg-stone-950 ${disabled ? 'grayscale animate-pulse' : ''}`}>
            <Toast 
                message={formMsg}
                onClick={() => setFormMsg('')}
            />
            <form action="POST" className="tablet-p:h-2/3 w-[25rem] tablet-p:w-full flex flex-col items-center tablet-p:justify-around gap-10 tablet-p:gap-3 p-10 mobile-g:px-5 text-stone-950 dark:text-stone-100" onSubmit={HandlerSubmit}>
                <div className="w-full">
                    <h1 className="font-bold text-4xl mobile-g:text-3xl flex items-center text-purple-800">devTask <PencilLine className="text-stone-950 dark:text-stone-100" /> </h1>
                    <h3 className="font-semibold text-xl mobile-g:text-lg">Recupere sua senha</h3>
                    <p className="mt-5 mobile-g:text-sm">Insira seu email, e lhe enviaremos um e-mail contendo um link de recuperação de senha.</p>
                </div>
                <label className="flex flex-col w-full mt-20 tablet-p:mt-0">
                    <span className="font-semibold">EMAIL</span>
                    <Input 
                        type='email' 
                        name='email' 
                        id='email'
                        placeholder='digite seu email'
                        value={email}
                        onChange={setEmail}
                        disabled={disabled}
                        formErrMsg={formMsg}
                        required={true}
                    />
                    <FormErrMsg
                        formErrMsg={formMsg}
                        name='Email'
                    />
                </label>
                <button className="w-full font-medium tracking-wider border border-purple-800 rounded-md bg-purple-800 text-stone-100 py-2 hover:bg-stone-100 dark:hover:bg-stone-950 hover:text-purple-800 active:scale-95 transitions disabled:grayscale disabled:animate-pulse" disabled={disabled}>Enviar</button>
                <p className='text-center'>Não possui cadastro?<Link to="/signin" className="text-purple-800"> Casdastre-se é grátis.</Link></p>
            </form>
            <div className="flex-1 flex flex-col py-5 items-center justify-center px-10 mobile-g:px-5 font-montserrat bg-purple-400 dark:bg-stone-800">
                <div>
                    <h1 className="font-bold text-4xl mobile-g:text-3xl flex items-center text-purple-800">devTask <PencilLine className="text-stone-950" /> </h1>
                    <h2 className="font-semibold text-2xl mobile-g:text-xl">Gerencie suas tarefas com muita <span className="text-5xl mobile-g:text-4xl font-thin flex items-center">facilidade<span className="font-semibold text-purple-800">!</span></span></h2>
                </div>
            </div>
        </section>
    );
};