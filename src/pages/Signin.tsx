import { useState } from 'react';

import { useDispatch } from 'react-redux';
import { setLogged } from '../redux/reducers/LoggedReducer';
import { useNavigate } from 'react-router-dom';

import axios from "axios";
import { AxiosError } from 'axios';
import { devTaskAPI } from '../APIs/devTaskAPI';
import { setCookies } from '../helpers/Cookie';

import { Toast } from '../components/Toast';
import { ShowPasswordIcons } from '../components/formComponents/ShowPasswordIcons';
import { Input } from '../components/formComponents/Input';
import { FormErrMsg } from '../components/formComponents/FormErrMsg';

import { PencilLine } from "@phosphor-icons/react";

export const Signin = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [email, setEmail] = useState('');
    const [emailConfirm, setEmaiConfirm] = useState('');
    
    const [formMsg, setFormMsg] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [disabled, setDisabled] = useState(false);

    const HandlerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        
        e.preventDefault();

        if(email != emailConfirm) {
            setFormMsg('Os Emails devem ser iguais');
            return;
        };
        if(password != passwordConfirm) {
            setFormMsg('As Senhas devem ser iguais');
            return;
        };

        setFormMsg('');
        setDisabled(true);

        try {

            const response = await devTaskAPI.signin(firstName, lastName, email, password);
            setCookies(response.token);
            dispatch(setLogged(true));
            navigate(`/${response.id}/dashboard`);
            
        } catch(error: unknown | AxiosError) {
            
            if (axios.isAxiosError(error))  {
                if(error.message.includes('Network')) {
                    setFormMsg('No momento nossos servidores estão ocupados tente novamente mais tarde!');
                    setDisabled(false);
                    return;
                };
                if(error.response?.data.error.includes('firstName')) {
                    setFormMsg('Nome inválido!');
                    setDisabled(false);
                    return;
                };
                if(error.response?.data.error.includes('lastName')) {
                    setFormMsg('Sobrenome inválido!');
                    setDisabled(false);
                    return;
                };
                if(error.response?.data.error.includes('email invalid.')) {
                    setFormMsg('Email inválido!');
                    setDisabled(false);
                    return;
                };
                if(error.response?.data.error.includes('email already')) {
                    setFormMsg('Email já possui registro!');
                    setDisabled(false);
                    return;
                };
                if(error.response?.data.error.includes('password')) {
                    setFormMsg('Senha invalida!');
                    setDisabled(false);
                    return;
                };

            };
            
        };

    };

    return (
        <section className="w-screen h-screen max-w-[1440px] flex justify-center items-center bg-stone-100 dark:bg-stone-950 text-stone-950 dark:text-stone-100 py-5 tablet-p:py-0">
            <Toast 
                message={formMsg}
                onClick={() => setFormMsg('')}
            />
            <form action="POST" className={`w-1/2 tablet-p:w-full tablet-p:h-full grid grid-cols-2 tablet-p:grid-cols-1 gap-5 tablet-p:gap-2 p-5 border tablet-p:border-0 border-purple-800 rounded-md shadow-lg dark:shadow-stone-100/5 ${disabled ? 'grayscale animate-pulse' : ''}`} onSubmit={HandlerSubmit}>
                <div className="col-span-2 tablet-p:col-span-1">
                    <h1 className={`font-bold text-4xl tablet-p:text-2xl flex items-center text-purple-800`}>devTask <PencilLine className={`text-stone-950 dark:text-stone-100`} /> </h1>
                    <h3 className={`font-semibold text-xl tablet-p:text-base`}>Cadastre-se é grátis</h3>
                </div>
                <label className="flex flex-col w-full tablet-p:mt-0 tablet-p:text-sm">
                    <span>Nome</span>
                    <Input 
                        type='text'
                        name='firstName'
                        id='firstName'
                        placeholder='digite seu nome'
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        formErrMsg={formMsg}
                        disabled={disabled}
                        required={true}
                    />
                    <FormErrMsg 
                        formErrMsg={formMsg}
                        name='Nome'
                    />
                </label>
                <label className="flex flex-col w-full tablet-p:mt-0 tablet-p:text-sm">
                    <span>Sobrenome</span>
                    <Input 
                        type='text'
                        name='lastName'
                        id='lastName'
                        placeholder='digite seu sobrenome'
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        formErrMsg={formMsg}
                        disabled={disabled}
                        required={true}
                    />
                    <FormErrMsg 
                        formErrMsg={formMsg}
                        name='Sobrenome'
                    />
                </label>
                <label className="flex flex-col w-full tablet-p:mt-0 tablet-p:text-sm">
                    <span>Email</span>
                    <Input 
                        type='email'
                        name='email'
                        id='email'
                        placeholder='digite seu email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        formErrMsg={formMsg}
                        disabled={disabled}
                        required={true}
                    />
                    <FormErrMsg 
                        formErrMsg={formMsg}
                        name='Email'
                    />
                </label>
                <label className="flex flex-col w-full tablet-p:mt-0 tablet-p:text-sm">
                    <span>Confirme o email</span>
                    <Input 
                        type='email'
                        name='emailConfirm'
                        id='emailConfirm'
                        placeholder='confirme seu email'
                        value={emailConfirm}
                        onChange={(e) => setEmaiConfirm(e.target.value)}
                        formErrMsg={formMsg}
                        disabled={disabled}
                        required={true}
                    />
                </label>
                <label className="flex flex-col w-full tablet-p:text-sm">
                    <span>Senha</span>
                    <div className="flex justify-end items-center">
                        <Input 
                            type={showPassword ? 'text' : 'password'}
                            name='password'
                            id='password'
                            placeholder='digite sua senha'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            formErrMsg={formMsg}
                            disabled={disabled}
                            required={true}
                        />
                        <ShowPasswordIcons 
                            message={formMsg}
                            showPassword={showPassword}
                            onClick={() => setShowPassword(!showPassword)}
                        />
                    </div>
                    <FormErrMsg 
                        formErrMsg={formMsg}
                        name='Senha'
                    />
                </label>
                <label className="flex flex-col w-full tablet-p:text-sm">
                    <span>Confirme a Senha</span>
                    <div className="flex justify-end items-center">
                        <Input 
                            type={showPassword ? 'text' : 'password'}
                            name='passwordConfirm'
                            id='passwordConfirm'
                            placeholder='confirme sua senha'
                            value={passwordConfirm}
                            onChange={(e) => setPasswordConfirm(e.target.value)}
                            formErrMsg={formMsg}
                            disabled={disabled}
                            required={true}
                        />
                        <ShowPasswordIcons 
                            message={formMsg}
                            showPassword={showPassword}
                            onClick={() => setShowPassword(!showPassword)}
                        />
                    </div>
                </label>
                <button className="col-span-2 tablet-p:col-span-1 font-medium tracking-wider border border-purple-800 rounded-md bg-purple-800 text-stone-100 py-2 hover:bg-stone-100 dark:hover:bg-stone-950 hover:text-purple-800 active:scale-90 transitions" disabled={disabled}>ENTRAR</button>
            </form>
        </section>
    );
};