import { useState } from 'react';
import { Broom, Calendar, CalendarPlus, CaretLeft, CaretRight, CloudSun, Gear, GearSix, UserCircleGear, WechatLogo, X } from "@phosphor-icons/react";

import { EditUserData } from "./EditUserData";
// import * as Dates from '../../helpers/Dates';
import { useDispatch } from 'react-redux';
import { setTheme } from '../../redux/reducers/ThemeReducer';

interface MenuPropsType {
    avatar: string;
};

export const MenuTop = (Props: MenuPropsType) => {

    const dispatch = useDispatch();

    const [editPhoto, setEditPhoto] = useState(false);
    const [editUserData, setEditUserData] = useState(false);

    const [openMenu, setOpenMenu] = useState(false);

    // const [date, setDate] = useState(() => Dates.getDate());

    const HandlerEditPhoto = () => {
        setEditPhoto(false);
        setEditUserData(true);
    };

    return (
        <>
            <nav className="fixed h-16 w-screen max-w-[1440px] flex items-center justify-between p-3 bg-purple-800 dark:bg-stone-800 z-10">
                <div className='flex items-center gap-2'>
                    <button className="w-10 h-10 rounded-full bg-stone-100 dark:bg-stone-400 bg-user bg-no-repeat bg-center flex justify-center items-center dark:hover:bg-stone-600 hover:bg-edit active:scale-90 active: transitions overflow-hidden" onClick={() => setEditPhoto(!editPhoto)}>
                        {Props.avatar &&
                            <img src={Props.avatar} alt="avatar" className="hover:opacity-0 transitions"/>
                        }
                    </button>
                    {editPhoto &&
                        <div className="absolute ml-10 top-12 flex flex-col items-center gap-3 backdrop-blur-sm bg-stone-400/10 rounded-md p-5 text-stone-900 dark:text-stone-100 dark:font-thin tracking-wider">
                            <div className="w-full flex justify-end"><X className="w-5 h-5 hover:text-red-500 active:scale-90 transitions" onClick={() => setEditPhoto(!editPhoto)}/>
                            </div>
                            <div>Gostaria de editar seu perfil?</div>
                            <button className="w-fit border border-purple-800 bg-purple-800 font-semibold  text-stone-100 rounded-md py-1 px-8 hover:bg-transparent hover:text-purple-800 active:scale-90 transitions" onClick={HandlerEditPhoto}>SIM</button>
                        </div>
                    }
                    {/* <div className='font-montserrat text-xl text-stone-950 dark:text-stone-100 flex items-center gap-3'>
                        <button>
                            <CaretLeft size={25} className='transitions hover:text-stone-100 dark:hover:text-purple-800 active:scale-90' />
                        </button>
                        <button>
                            <CaretRight size={25} className='transitions hover:text-stone-100 dark:hover:text-purple-800 active:scale-90' />
                        </button>
                        {date}
                    </div> */}
                </div>

                <button className='p-2' onClick={() => setOpenMenu(!openMenu)}>
                    <Gear size={38} weight='light' className={`text-stone-950 dark:text-stone-100 transitions hover:text-purple-800 dark:hover:text-purple-800 active:scale-90`} />
                </button>

                {openMenu &&
                    <ul className='absolute flex flex-col gap-5 top-20 right-3 text-stone-950 dark:text-stone-100'>
                        <li className='bg-purple-800/30 dark:bg-stone-400/10 rounded-full p-2 transitions hover:text-purple-800 cursor-pointer' onClick={() => dispatch(setTheme('dark'))}><Broom size={30} weight='light' /></li>
                        <li className='bg-purple-800/30 dark:bg-stone-400/10 rounded-full p-2 transitions hover:text-purple-800 cursor-pointer' ><UserCircleGear size={30} weight='light' /></li>
                        <li className='bg-purple-800/30 dark:bg-stone-400/10 rounded-full p-2 transitions hover:text-purple-800 cursor-pointer' ><CloudSun size={30} weight='light' /></li>
                        <li className='bg-purple-800/30 dark:bg-stone-400/10 rounded-full p-2 transitions hover:text-purple-800 cursor-pointer' ><Calendar size={30} weight='light' /></li>
                        <li className='bg-purple-800/30 dark:bg-stone-400/10 rounded-full p-2 transitions hover:text-purple-800 cursor-pointer' ><CalendarPlus size={30} weight='light' /></li>
                        <li className='bg-purple-800/30 dark:bg-stone-400/10 rounded-full p-2 transitions hover:text-purple-800 cursor-pointer' ><WechatLogo size={30} weight='light' /> </li>
                    </ul>
                }
            </nav>
            {editUserData &&
                <EditUserData close={() => setEditUserData(false)}/>
            }

        </>
    );
};