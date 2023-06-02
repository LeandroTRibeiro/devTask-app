import { useState, useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { setLogged } from '../redux/reducers/LoggedReducer';

import { Link, useNavigate, useSearchParams } from 'react-router-dom';

import axios from 'axios';
import { API } from '../api/API';
import { setCookies } from '../helpers/Cookie';

import { Input } from '../components/Input';
import { Toast } from '../components/Toast';
import { FormErrMsg } from '../components/FormErrMsg';
import { ShowPasswordIcons } from '../components/ShowPasswordIcons';

import { PencilLine } from "@phosphor-icons/react";

interface TokenType {
    token: string,
    valid: boolean | undefined
}

export const RecoverPassword = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [ searchParams ] = useSearchParams();

    const [token, setToken] = useState<TokenType>({
        token: '',
        valid: undefined
    });
    
    const [showPassword, setShowPassword] = useState(false);

    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const [formMsg, setFormMsg] = useState('');
    const [disabled, setDisabled]= useState(false);

    useEffect(() => {

        const verifyToken = async () => {
            
            const token = searchParams.get('token');

            if(token) {
                try {
                    await API.tokenVerification(token);
                    setToken(({
                        token,
                        valid: true
                    }));
    
                } catch(error) {
                    setToken({
                        token: '',
                        valid: false
                    });
                }

                return;
            };

            setToken({
                token: '',
                valid: false
            });
        };

        verifyToken();
    },[]);

    const HandlerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        if(password != passwordConfirm) {
            setFormMsg('As Senhas devem ser iguais!');
            return;
        };

        setFormMsg('');
        setDisabled(true);

        try {

            const response = await API.recoverPassword(token.token, password);
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
                setFormMsg('Senha inválida!');
                setDisabled(false);
                return;
            };
        };
    };

    if(token.valid === true) {
        return (
            <section className={`w-screen max-w-[1440px] h-screen flex tablet-p:flex-col-reverse bg-stone-100 dark:bg-stone-950 ${disabled ? 'grayscale animate-pulse' : ''}`}>
                <Toast 
                    message={formMsg}
                    onClick={() => setFormMsg('')}
                />
                <form action="POST" className="tablet-p:h-2/3 flex flex-col items-center tablet-p:justify-around gap-10 tablet-p:gap-3 p-10 mobile-g:px-5 text-stone-950 dark:text-stone-100" onSubmit={HandlerSubmit}>
                    <div className="w-full">
                        <h1 className="font-bold text-4xl mobile-g:text-3xl flex items-center text-purple-800">devTask <PencilLine className="text-stone-950 dark:text-stone-100" /> </h1>
                        <h3 className="font-semibold text-xl mobile-g:text-lg">Recupere sua Senha</h3>
                    </div>
                    <label className="flex flex-col w-full">
                        <div className="flex justify-between">
                            <span className="font-semibold">Nova Senha</span>
                        </div>
                        <div className="flex justify-end items-center">
                            <Input 
                                type={showPassword ? 'text' : 'password'} 
                                name='password' 
                                id='password'
                                placeholder='digite seu senha'
                                value={password}
                                onChange={setPassword}
                                disabled={disabled}
                                formErrMsg={formMsg}
                                required={true}
                            />
                            <ShowPasswordIcons 
                                message={formMsg}
                                onClick={() => setShowPassword(!showPassword)}
                                showPassword={showPassword}
                            />
                        </div>
                        <FormErrMsg 
                            formErrMsg={formMsg}
                            name='Senha'
                        />
                    </label>
                    <label className="flex flex-col w-full">
                        <div className="flex justify-between">
                            <span className="font-semibold">Confirme a nova Senha</span>
                        </div>
                        <div className="flex justify-end items-center">
                            <Input 
                                type={showPassword ? 'text' : 'password'} 
                                name='passwordConfirm' 
                                id='passwordConfirm'
                                placeholder='confirme seu senha'
                                value={passwordConfirm}
                                onChange={setPasswordConfirm}
                                disabled={disabled}
                                formErrMsg={formMsg}
                                required={true}
                            />
                            <ShowPasswordIcons 
                                message={formMsg}
                                onClick={() => setShowPassword(!showPassword)}
                                showPassword={showPassword}
                            />
                        </div>
                    </label>
                    <button className="w-full font-medium tracking-wider border border-purple-800 rounded-md bg-purple-800 text-stone-100 py-2 hover:bg-stone-100 dark:hover:bg-stone-950 hover:text-purple-800 active:scale-95 transitions disabled:grayscale disabled:animate-pulse" disabled={disabled}>Redefinir</button>
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
    } else if(token.valid === false) {
        return (
            <div className='h-screen w-screen flex justify-center items-center bg-stone-100 dark:bg-stone-950 z-10'>
                <span className='flex flex-col justify-center items-center gap-5 text-center px-5 text-stone-950 dark:text-stone-100'>
                    O token de acesso expirou.
                    <p>Por favor, reenvie o email para continuar usando o aplicativo.</p>
                    <Link to='/forgotpassword'><button className="w-52 col-span-2 tablet-p:col-span-1 font-medium tracking-wider border border-purple-800 rounded-md bg-purple-800 text-stone-100 py-2 hover:bg-transparent hover:text-purple-800 active:scale-95 transitions">OK</button></Link>
                </span>
            </div>
        );
    } else {
        return null;
    };
};