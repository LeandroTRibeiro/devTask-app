import { useState } from 'react';

import { Eye, EyeClosed, PencilLine } from "@phosphor-icons/react";

export const Home = () => {

    const [showPassword, setShowPassword] = useState(false);

    return (
        <section className="w-screen h-screen flex bg-stone-100">
            <form action="POST" className="flex flex-col items-center gap-5 p-10 text-stone-950">
                <div className="w-full">
                    <h1 className="font-bold text-4xl flex items-center text-purple-800">devTask <PencilLine className="text-stone-950" /> </h1>
                    <h3 className="font-semibold text-xl">Acesse sua conta</h3>
                </div>
                <label className="flex flex-col w-full mt-20">
                    <span className="font-semibold">EMAIL</span>
                    <input type="email" name="" id="" className="px-2 py-2 outline-none border border-purple-800 rounded-md bg-transparent" />
                </label>
                <label className="flex flex-col w-full">
                    <div className="flex justify-between">
                        <span className="font-semibold">SENHA</span>
                        <a href="" className="text-purple-800">Esqueceu a senha?</a>
                    </div>
                    <div className="flex justify-end items-center">
                        <input type={showPassword ? "text" : "password"} name="" id="" className="px-2 py-2 outline-none border border-purple-800 rounded-md bg-transparent w-full" />
                        {showPassword &&
                            <EyeClosed size={22} className='absolute mr-2 cursor-pointer' onClick={() => setShowPassword(!showPassword)} />
                        }
                        {!showPassword &&
                            <Eye size={22} className='absolute mr-2 cursor-pointer' onClick={() => setShowPassword(!showPassword)} />
                        }
                    </div>
                </label>
                <button className="w-full font-medium tracking-wider border border-purple-800 rounded-md bg-purple-800 text-stone-100 py-2 hover:bg-stone-100 hover:text-purple-800 active:scale-95 transition-all duration-200 ease-in-out">ENTRAR</button>
                <p>Não possui cadastro?<a href="" className="text-purple-800"> Casdastre-se é grátis.</a></p>
            </form>
            <div className="flex-1 flex flex-col items-center justify-center font-montserrat bg-purple-400">
                <div>
                    <h1 className="font-bold text-4xl flex items-center text-purple-800">devTask <PencilLine className="text-stone-950" /> </h1>
                    <h2 className="font-semibold text-2xl">Gerencie suas tarefas com muita <span className="text-5xl font-thin flex items-center">facilidade<span className="font-semibold text-purple-800">!</span></span></h2>
                </div>
            </div>
        </section>
    );
};