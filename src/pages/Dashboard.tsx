import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { devTaskAPI } from "../APIs/devTaskAPI";
import { Toast } from "../components/Toast";
import { MenuTop } from "../components/menuComponents/MenuTop";
import { WeatherWindow } from "../components/weatherComponents/WeatherWindow";
import { Calendar } from "../components/CalendarComponents/Calendar";
import { DayTasks } from "../components/DayTasksComponents/DayTasks";
import { NewTask } from "./NewTask";

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

    const [disabled, setDisabled] = useState(false);
    const [formMsg, setFormMsg] = useState(''); 

    const [dashboardInfo, setDashboardInfo] = useState<DashboardInfoType>();

    const [selectedDay, setSelectedDay] = useState(new Date());

    const [newTask, setNewTask] = useState(false);

    useEffect(() => {
        
        const HandlerDashboardInfo = async () => {

            if(id) {
                setFormMsg('');
                setDisabled(true);
                try {
                    const response = await devTaskAPI.getDashboardInfo(id);
                    setDashboardInfo(response.user);
                    setDisabled(false);
                } catch(error) {
                    setFormMsg('No momento nossos servidores estão ocupados tente novamente mais tarde!');
                    setDisabled(false);
                }
            };
        };
        HandlerDashboardInfo();
    },[]);

    const HandlerSelectedDayPlus = () => {
        setSelectedDay(new Date(selectedDay.getFullYear(), selectedDay.getMonth(), selectedDay.getDate()+1));
    };

    const HandlerSelectedDayMinus = () => {
        setSelectedDay(new Date(selectedDay.getFullYear(), selectedDay.getMonth(), selectedDay.getDate()-1));
    };

    const HandlerChooseSelectedDay = (date: Date) => {
        setSelectedDay(date);
    };

    return (
        <main className={`w-screen max-w-[1440px] h-screen bg-stone-100 dark:bg-stone-900 overflow-hidden ${disabled ? 'grayscale animate-pulse pointer-events-none' : ''}`}>
            <Toast 
                message={formMsg}
                onClick={() => setFormMsg('')}
            />
            <MenuTop 
                avatar={dashboardInfo?.avatar ? dashboardInfo?.avatar : ''}
            />
            <div className="flex h-[calc(100vh-4rem)] gap-3 mt-16 p-3">
                <div className="flex flex-col gap-3">
                    <Calendar 
                        chooseDay={HandlerChooseSelectedDay}
                    />
                    {/* <WeatherWindow /> */}
                </div>
                <DayTasks 
                    selectedDay={selectedDay} 
                    plusDay={HandlerSelectedDayPlus}
                    minusDay={HandlerSelectedDayMinus}
                    newTask={() => setNewTask(!newTask)}
                />
            </div>
            {newTask &&
                <NewTask 
                    close={() => setNewTask(!newTask)}
                />
            }
        </main>
    );
};