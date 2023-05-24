import { useEffect, useState } from "react";
import { RouterList } from "./routers/RouterList";

import { MoonStars, SunDim } from "@phosphor-icons/react";

const App = () => {

  const [theme, setTheme] = useState<'light' | 'dark' | ''>('');

  useEffect(() => {
    if(!theme) {
      if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        setTheme('dark')
      } else {
        setTheme('light')
      };
    }
  },[])

  return(
    <div className={`${theme} w-screen flex justify-center items-center ${theme === 'dark' ? 'bg-stone-950' : 'bg-stone-100'}`}>
      {theme === 'dark' &&
        <SunDim size={35} className='absolute right-5 top-5 text-stone-100 cursor-pointer' onClick={() => setTheme('light')} />
      }
      {theme === 'light' &&
        <MoonStars size={35} className='absolute right-5 top-5 text-stone-950 cursor-pointer' onClick={() => setTheme('dark')} />
      }
      <RouterList />
    </div>
  );
};

export default App;