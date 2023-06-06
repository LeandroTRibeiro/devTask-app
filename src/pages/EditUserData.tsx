import { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';

import ImageEditor from '../components/ImageEditor';
import { Input } from "../components/Input";
import { ShowPasswordIcons } from '../components/ShowPasswordIcons';
import { Toast } from '../components/Toast';
import { FormErrMsg } from '../components/FormErrMsg';

import axios, { AxiosError } from 'axios';
import { API } from '../api/API';

import { CaretLeft, X } from "@phosphor-icons/react";


interface PropsType {
    close: () => void
};

interface ObjectUserType {
    avatar: string
    firstName: string,
    lastName: string,
    email: string,
    password: string, 
    birthday: string | null 
};

interface ObjectCurType {
    avatar?: string | Blob
    firstName?: string,
    lastName?: string,
    email?: string,
    password?: string, 
    birthday?: string | null 
};

interface UserDataType extends ObjectUserType {
    [key: string]: any;
};

interface UserCurType extends ObjectCurType {
    [key: string]: any;
};

export const EditUserData = (Props: PropsType) => {

    const { id } = useParams();

    const [formMsg, setFormMsg] = useState('');
    const [disabled, setDisabled] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [editAvatar, setEditAvatar] = useState(false);

    const [userUpdateInfo, setUserUpdateInfo] = useState<UserCurType>();
    const [userInfo, setUserInfo] = useState<UserDataType>({
        avatar: '',
        firstName : '',
        lastName: '',
        email: '',
        password: '', 
        birthday: null 
    });

    useEffect(() => {

        const HandlerUserInfo = async () => {
            if(id) {
                setDisabled(true);
                try {
                    const response = await API.getUserInfo(id);
                    setUserInfo(response);
                    setDisabled(false);

                } catch(error) {
                    setFormMsg('No momento nossos servidores estão ocupados tente novamente mais tarde!');
                    setDisabled(false);
                }
            };
        };

        HandlerUserInfo();

    },[]);

    const HandlerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        setDisabled(true);
        
        const formData = new FormData();

        if(!userUpdateInfo) {
            setDisabled(false);
            setFormMsg('Edite alguma informação antes de salvar!');
        }

        for(let key in userUpdateInfo) {
            formData.append(key, userUpdateInfo[key]);
        };

        if(id) {
            try {
                const response = await API.updateUserInfo(id, formData);
                setUserUpdateInfo(undefined)
                setUserInfo(prevState => {
                    const updatedState = { ...prevState };
                    for (let key in userInfo) {
                      if (response.update.hasOwnProperty(key) && response.update[key] !== userInfo[key]) {
                        updatedState[key] = response.update[key];
                      }
                    }
                    return updatedState;
                });
                setFormMsg('Novas Informações salvas!')
                setDisabled(false);
                
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
                        setFormMsg('Email inválido ou já cadastrado!');
                        setDisabled(false);
                        return;
                    };
                    if(error.response?.data.error.includes('password')) {
                        setFormMsg('Senha invalida!');
                        setDisabled(false);
                        return;
                    };
                    if(error.response?.data.error.includes('password')) {
                        setFormMsg('Senha invalida!');
                        setDisabled(false);
                        return;
                    };
    
                };
                
            }
        }

        
    };

    const UpdateUserData = ( e: React.ChangeEvent<HTMLInputElement>) => {

        const { name, value } = e.target;

        setUserInfo( prevState => ({
            ...prevState,
            [name]: value
        }));

        setUserUpdateInfo( prevState => ({
            ...prevState,
            [name]: value
        }));

    };

    return (
        <section className={`absolute w-screen max-w-[1440px] h-screen flex justify-center items-center backdrop-blur-sm bg-stone-400/20 text-stone-950 dark:text-stone-100 overflow-hidden ${disabled ? 'grayscale animate-pulse pointer-events-none' : ''}`}>
            <Toast 
                message={formMsg}
                onClick={() => setFormMsg('')}
            />
            <form action="POST" onSubmit={HandlerSubmit} className={`mobile-g:w-full mobile-g:h-full mobile-g:rounded-none flex flex-col gap-5 tablet-m:gap-3 shadow-xl p-5 rounded-md bg-stone-100 dark:bg-stone-950 transitions`}>
                <div className="w-full flex justify-end mobile-g:justify-start">
                    {editAvatar &&
                        <CaretLeft size={25} weight="bold" className="hidden mobile-gg:flex hover:text-red-500 active:scale-95 transitions" onClick={() => setEditAvatar(false)} /> 
                    }
                    <X size={25} weight="bold" className="hover:text-red-500 active:scale-95 transitions" onClick={Props.close} />
                </div>
                <div className='flex mobile-g:justify-center mobile-g:items-center mobile-g:h-full'>
                    <div className={`flex w-96 min-w-96 flex-col gap-2 tablet-m:gap-3 ${editAvatar ? 'mobile-gg:hidden' : ''}`}>
                        <div className="flex flex-col items-center gap-5">
                            <div className={`w-20 h-20 rounded-full bg-stone-400 bg-user bg-no-repeat bg-center flex justify-center items-center transitions after:transition-all after:duration-200 after:ease-in-out after:content-[''] after:absolute after:ml-14 after:mt-14 after:w-8 after:h-8 after:rounded-full after:flex after:justify-center after:items-center after:bg-camera after:bg-no-repeat after:bg-80% after:bg-center after:backdrop-blur-sm after:bg-white/10 cursor-pointer hover:after:bg-white/50 hover:after:scale-110 active:after:scale-95 overflow-hidden`} onClick={() => setEditAvatar(!editAvatar)}>
                                {userInfo?.avatar &&
                                    <img src={userInfo.avatar} alt="avatar" />
                                }
                            </div>
                            <label className={`flex w-full items-center cursor-pointer gap-2 ${userInfo.firstName.length + userInfo.lastName.length >= 19 ? 'flex-col' : 'flex-row justify-around'}`}>
                                <label className='flex flex-col w-full'>
                                    <span className='text-sm'>nome</span>
                                    <input
                                        className="h-fit w-fit outline-none bg-transparent text-2xl tablet-m:text-xl font-montserrat font-semibold border-b border-purple-800"
                                        id='edit-firstName'
                                        name='firstName'
                                        type="text"
                                        value={userInfo.firstName}
                                        onChange={(e) => UpdateUserData(e)}
                                        disabled={disabled}
                                        required={false}
                                        size={userInfo.firstName?.length || 5}
                                        maxLength={25}
                                    />
                                    <FormErrMsg 
                                        formErrMsg={formMsg}
                                        name='Nome'
                                    />
                                </label>
                                <label className='flex flex-col w-full'>
                                    <span className='text-sm'>sobrenome</span>
                                    <input
                                        className="h-fit w-fit outline-none bg-transparent text-2xl tablet-m:text-xl font-montserrat font-semibold border-b border-purple-800"
                                        id='edit-lastName'
                                        name='lastName'
                                        type="text"
                                        value={userInfo.lastName}
                                        onChange={(e) => UpdateUserData(e)}
                                        disabled={disabled}
                                        required={false}
                                        size={userInfo.lastName?.length || 5}
                                        maxLength={25}
                                    />
                                    <FormErrMsg 
                                        formErrMsg={formMsg}
                                        name='Sobrenome'
                                    />
                                </label>
                            </label>
                        </div>
                        <label className="flex flex-col">
                            <span className="font-semibold tablet-m:text-sm" >Email<span className='text-red-500 ml-1' title='Ao mudar seu email, não será mais possível acessar seu app com o email antigo!.'>*</span></span>
                            <Input
                                id="edit-email"
                                name="email"
                                type="email"
                                value={userInfo.email}
                                onChange={UpdateUserData}
                                formErrMsg={formMsg}
                                placeholder=""
                                disabled={disabled}
                                required={false}
                            />
                            <FormErrMsg 
                                formErrMsg={formMsg}
                                name='Email'
                            />
                        </label>
                        <label className="flex flex-col">
                            <span className="font-semibold tablet-m:text-sm">Senha</span>
                            <div className='flex justify-end items-center'>
                                <Input
                                    id="edit-password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={userInfo.password}
                                    onChange={UpdateUserData}
                                    formErrMsg={formMsg}
                                    placeholder=""
                                    disabled={disabled}
                                    required={false}
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
                        <label className="flex flex-col">
                            <span className="font-semibold tablet-m:text-sm">Aniversário</span>
                            <Input
                                id="edit-birthday"
                                name="birthday"
                                type="date"
                                value={userInfo.birthday ? userInfo.birthday : ''}
                                onChange={UpdateUserData}
                                formErrMsg={formMsg}
                                placeholder=""
                                disabled={disabled}
                                required={false}
                            />
                        </label>
                        <button className='w-full font-medium tracking-wider border border-purple-800 rounded-md bg-purple-800 text-stone-100 py-2 hover:bg-stone-100 dark:hover:bg-stone-950 hover:text-purple-800 active:scale-95 transitions disabled:grayscale disabled:animate-pulse' disabled={disabled}>SALVAR</button>
                    </div>
                    <div className={`transitions h-[428px] mobile-gg:h-full overflow-hidden ${editAvatar ? 'ml-5 mobile-gg:ml-0 w-96 tablet-m:w-64' : 'w-0'}`}>
                        {editAvatar &&
                            <ImageEditor 
                                HandlerNewAvatar={(img) => setUserUpdateInfo(prev => ({...prev, avatar: img}))}
                            />
                        }
                    </div>
                </div>
            </form>
        </section>
    );
};