import axios from "axios";

const apiKey = import.meta.env.VITE_KEY_OPENWEATHER;

export const openWeatherAPI = async (position: GeolocationPosition) => {

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric&lang=pt_br`;

    const response = await axios.get(apiUrl);

    return response.data;
};