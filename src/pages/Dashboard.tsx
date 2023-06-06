import { X } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { EditUserData } from "./EditUserData";
import { useParams } from "react-router-dom";
import { API } from "../api/API";
import { Toast } from "../components/Toast";
import { CalendarDashboard } from "../components/Calendar";

interface DashboardInfoType {
    _id: string,
    dateCreated: Date,
    birthday: Date,  
    name : {
        firstName: string,
        lastName: string
    },
    email: string,
    password: string, 
    token: string,
    avatar: string
}

export const Dashboard = () => {

    const { id } = useParams();
    const [editPhoto, setEditPhoto] = useState(false);
    const [editUserData, setEditUserData] = useState(false);

    const [disabled, setDisabled] = useState(false);
    const [formMsg, setFormMsg] = useState(''); 

    const [dashboardInfo, setDashboardInfo] = useState<DashboardInfoType>();

    const HandlerEditPhoto = () => {
        setEditPhoto(false);
        setEditUserData(true);
    };

    useEffect(() => {
        
        const HandlerDashboardInfo = async () => {

            if(id) {
                setFormMsg('');
                setDisabled(true);
                try {
                    const response = await API.getDashboardInfo(id);
                    setDashboardInfo(response.user);
                    setDisabled(false);
                } catch(error) {
                    setFormMsg('No momento nossos servidores estão ocupados tente novamente mais tarde!');
                    setDisabled(false);
                }
            };
        };
        HandlerDashboardInfo();
    },[])

    return (
        <main className={`w-screen max-w-[1440px] h-screen bg-stone-100 dark:bg-stone-900 ${disabled ? 'grayscale animate-pulse pointer-events-none' : ''}`}>
            <Toast 
                message={formMsg}
                onClick={() => setFormMsg('')}
            />
            <nav className="h-16 w-screen max-w-[1440px] flex items-center pl-3 bg-purple-600 dark:bg-stone-800">
                <button className="w-10 h-10 rounded-full bg-stone-100 dark:bg-stone-400 bg-user bg-no-repeat bg-center flex justify-center items-center dark:hover:bg-stone-600 hover:bg-edit active:scale-95 active: transitions overflow-hidden" onClick={() => setEditPhoto(!editPhoto)}>
                    {dashboardInfo?.avatar &&
                        <img src={dashboardInfo.avatar} alt="avatar" className="hover:opacity-0 transitions"/>
                    }
                </button>
                {editPhoto &&
                    <div className="absolute ml-10 top-12 flex flex-col items-center gap-3 backdrop-blur-sm bg-stone-400/20 rounded-md p-5 text-stone-900 dark:text-stone-100 dark:font-thin tracking-wider">
                        <div className="w-full flex justify-end"><X className="w-5 h-5 hover:text-red-500 active:scale-95 transitions" onClick={() => setEditPhoto(!editPhoto)}/></div>
                        <div>Gostaria de editar sua foto de perfil?</div>
                        <button className="w-fit border border-purple-800 bg-purple-800 font-semibold  text-stone-100 rounded-md py-1 px-8 hover:bg-transparent hover:text-purple-800 active:scale-95 transitions" onClick={HandlerEditPhoto}>SIM</button>
                    </div>
                }
            </nav>
            {editUserData &&
                <EditUserData close={() => setEditUserData(false)}/>
            }
            <CalendarDashboard />
        </main>
    );
};