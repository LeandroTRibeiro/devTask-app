import { useEffect } from "react";
import { RouterList } from "../../routers/RouterList";
import { useAppSelector } from "../../redux/hooks/useAppSelector";
import { useDispatch } from "react-redux";
import { setTheme } from "../../redux/reducers/ThemeReducer";
import { MoonStars, SunDim } from "@phosphor-icons/react";

export const Theme = () => {

    const dispatch = useDispatch();

    const theme = useAppSelector(state => state.ThemeReducer.status);
    const logged = useAppSelector(state => state.LoggedReducer.status);
  
    useEffect(() => {
      if(!theme) {
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
          dispatch(setTheme('dark'));
        } else {
          dispatch(setTheme('light'));
        };
      }
    },[]);

    return (
        <div className={`${theme} w-screen flex justify-center items-center ${theme === 'dark' ? 'bg-stone-950' : 'bg-stone-100'}`}>
            {theme === 'dark' && !logged &&
            <SunDim size={35} className='absolute z-20 right-3 top-3 text-stone-100 cursor-pointer' onClick={() => dispatch(setTheme('light'))} />
            }
            {theme === 'light' && !logged &&
            <MoonStars size={35} className='absolute z-20 right-3 top-3 text-stone-950 cursor-pointer' onClick={() => dispatch(setTheme('dark'))} />
            }
            <RouterList />
        </div>
    );
};