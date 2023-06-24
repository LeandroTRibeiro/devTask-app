import { useEffect, useState } from "react";
import { openWeatherAPI } from "../../APIs/openWeatherAPI";
import { X } from "@phosphor-icons/react";
import { WeatherIcon } from "./WeatherIcon";


export const WeatherWindow = () => {

    const [xVisible, setXVisible] = useState(false);

    const [weather, setWeather] = useState({
        temp: 0,
        weather: '',
        iconCode: '',
    });

    useEffect(() => {

        const setPosition = async (position: GeolocationPosition) => {

            try {

                const response = await openWeatherAPI(position);
                
                setWeather({
                    temp: Math.round(response.main.temp),
                    weather: response.weather[0].description,
                    iconCode: response.weather[0].icon
                });

            } catch(error) {

            }
        };

        navigator.geolocation.getCurrentPosition( position => setPosition(position) );

        let getPosition = setInterval(() => {
            navigator.geolocation.getCurrentPosition( position => setPosition(position) );
        }, 300000);

        return () => clearInterval(getPosition);

    },[]);

    if(!weather.temp || !weather.weather) {
        return null;
    };

    return (
        <div className="w-56 flex flex-col items-center backdrop-blur-sm bg-purple-800/30 dark:bg-stone-400/10 rounded-md p-2 text-stone-900 dark:text-stone-100 dark:font-thin tracking-wider" onMouseEnter={() => setXVisible(true)} onMouseLeave={() => setXVisible(false)}>
            <div className={`w-full h-full flex justify-end transitions ${xVisible ? 'opacity-100' : 'opacity-0'}`}>
                <X className="w-4 h-4 hover:text-red-500 active:scale-90 transitions" onClick={() => setWeather(prev => ({...prev, weather: ''}))} />
            </div>
            <div className="flex items-center gap-2">
                <div className="text-4xl ">{weather.temp}°</div>
                <WeatherIcon iconCode={weather.temp >= 30 ? '51d' : weather.temp <= 10 ? '52d' : weather.iconCode} />
            </div>
            <div className="">{weather.weather}</div>
        </div>
    );
};