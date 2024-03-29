import { useState, useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { setLogged } from '../redux/reducers/LoggedReducer';

import { Link, useNavigate } from 'react-router-dom';

import axios from 'axios';
import { devTaskAPI } from '../APIs/devTaskAPI';
import { getCookies, setCookies } from '../helpers/Cookie';

import { Input } from '../components/formComponents/Input';
import { Toast } from '../components/Toast';
import { FormErrMsg } from '../components/formComponents/FormErrMsg';

import { Eye, EyeClosed, PencilLine } from "@phosphor-icons/react";

export const Home = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [formMsg, setFormMsg] = useState('');
    const [disabled, setDisabled]= useState(false);

    useEffect(() => {

        const token = getCookies();        
        
        const autoLogin = async (token: string) => {
            
            try {
                const response = await devTaskAPI.autoLogin(token);
                setCookies(response.token);
                dispatch(setLogged(true));
                navigate(`/${response.id}/dashboard`);

            } catch(error) {
                // Nenhum tratamento necessário
            };

        };

        if(token) autoLogin(token);

    }, []);

    const HandlerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setFormMsg('');
        setDisabled(true);

        try {
            const response = await devTaskAPI.login(email, password);
            setCookies(response.token);
            dispatch(setLogged(true));
            navigate(`/${response.id}/dashboard`);
        } catch(error) {
            if (axios.isAxiosError(error))  {

                if(error.message.includes('Network')) {
                    setFormMsg('No momento nossos servidores estão ocupados tente novamente mais tarde!');
                    setDisabled(false);
                    return;
                };
                setFormMsg('Email ou Senha inválidos.');
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
            <form action="POST" className="tablet-p:h-2/3 flex flex-col items-center tablet-p:justify-around gap-10 tablet-p:gap-3 p-10 mobile-g:px-5 text-stone-950 dark:text-stone-100" onSubmit={HandlerSubmit}>
                <div className="w-full">
                    <h1 className="font-bold text-4xl mobile-g:text-3xl flex items-center text-purple-800">devTask <PencilLine className="text-stone-950 dark:text-stone-100" /> </h1>
                    <h3 className="font-semibold text-xl mobile-g:text-lg">Acesse sua conta</h3>
                </div>
                <label className="flex flex-col w-full mt-20 tablet-p:mt-0">
                    <span className="font-semibold">EMAIL</span>
                    <Input 
                        type='email' 
                        name='email' 
                        id='email'
                        placeholder='digite seu email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={disabled}
                        formErrMsg={formMsg}
                        required={true}
                    />
                    <FormErrMsg
                        formErrMsg={formMsg}
                        name='Email'
                    />
                </label>
                <label className="flex flex-col w-full">
                    <div className="flex justify-between">
                        <span className="font-semibold">SENHA</span>
                        <Link to="/forgotpassword" className="text-purple-800">Esqueceu a senha?</Link>
                    </div>
                    <div className="flex justify-end items-center">
                        <Input 
                            type={showPassword ? 'text' : 'password'} 
                            name='password' 
                            id='password'
                            placeholder='digite seu senha'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={disabled}
                            formErrMsg={formMsg}
                            required={true}
                        />
                        {showPassword &&
                            <EyeClosed size={22} className='absolute mr-2 cursor-pointer' onClick={() => setShowPassword(!showPassword)} />
                        }
                        {!showPassword &&
                            <Eye size={22} className='absolute mr-2 cursor-pointer' onClick={() => setShowPassword(!showPassword)} />
                        }
                    </div>
                    <FormErrMsg 
                        formErrMsg={formMsg}
                        name='Password'
                    />
                </label>
                <button className="w-full font-medium tracking-wider border border-purple-800 rounded-md bg-purple-800 text-stone-100 py-2 hover:bg-stone-100 dark:hover:bg-stone-950 hover:text-purple-800 active:scale-90 transitions disabled:grayscale disabled:animate-pulse" disabled={disabled}>ENTRAR</button>
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