import clearSkyDay from '../../assets/images/weatherIcons/clearskyday.png';
import clearSkyNight from '../../assets/images/weatherIcons/clearskynight.png';
import cloudsDay from '../../assets/images/weatherIcons/suncloudsday.png';
import cloudsNight from '../../assets/images/weatherIcons/moncloudsnight.png';
import rainDay from '../../assets/images/weatherIcons/rainday.png';
import rainNight from '../../assets/images/weatherIcons/rainnight.png';
import storm from '../../assets/images/weatherIcons/storm.png';
import snow from '../../assets/images/weatherIcons/snow.png';
import fog from '../../assets/images/weatherIcons/fog.png';
import hot from '../../assets/images/weatherIcons/highttemperature.png';
import cold from '../../assets/images/weatherIcons/lowtemperature.png';

interface WeatherIconPropsType {
    iconCode: string
};

export const WeatherIcon = (props: WeatherIconPropsType) => {
    switch (props.iconCode) {
        case '01d':
            return <img src={clearSkyDay} alt="clear sky day icon" className='w-10' />;
        case '01n':
            return <img src={clearSkyNight} alt="clear sky night" className='w-10' />;
        case '02d':
        case '03d':
        case '04d':
            return <img src={cloudsDay} alt="clouds day icon" className='w-14' />;
        case '02n':
        case '03n':
        case '04n':
            return <img src={cloudsNight} alt="clouds night icon" className='w-14' />;
        case '09d':
        case '10d':
            return <img src={rainDay} alt="rain day icon" className='w-12'/>;
        case '09n':
        case '10n':
            return <img src={rainNight} alt="rain night icon" className='w-12' />;
        case '11d':
        case '11n':
            return <img src={storm} alt="storm icon" className='w-10' />;
        case '13d':
        case '13n': 
            return <img src={snow} alt="snow icon" className='w-9' />;
        case '50d':
        case '50n':
            return <img src={fog} alt="fog icon" className='w-10' />;
        case '51d': 
            return <img src={hot} alt="hot icon" className='w-10' />;
        case '52d':
            return <img src={cold} alt="cold icon" className='w-10' />;
        default:
            return null;
    }
};