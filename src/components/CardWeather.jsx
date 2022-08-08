import axios from 'axios'
import React, { useEffect, useState } from 'react'

const CardWeather = ({lat, lon}) => {

    const [weather, setWeather] = useState()
    const [temperature, setTemperature] = useState()
    const [isCelsius, setItCelsius] = useState(true)

    useEffect(() => {
        if(lon){
            const APIKey = '0dedc90954fe85c740361a9629e189e6'
            const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}`
            
            axios.get(URL)  
                .then(res => {
                    setWeather(res.data)
                    const temp = {
                        celsius: `${Math.round(res.data.main.temp - 273.15)} °C`,
                        farenheit: `${Math.round((res.data.main.temp - 273.15) * 9/5 + 32)} °F`
                    }
                    setTemperature(temp)
                })
                .catch(err => console.log(err))
        }
    }, [lat, lon])


    const handleClick = () => setItCelsius(!isCelsius)

    return (
        <article className='card'>
            <h1 className='title'>Weather App</h1>
            <h2 className='subTitle'>{`${weather?.name}, ${weather?.sys.country}`}</h2>
            <div className='info'>
                <img src={weather && `http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} alt="" />
                <div className='data'>
                    <h3>&#34;{weather?.weather[0].description}&#34;</h3>
                    <ul className='list'>
                        <li className='element'><span className='span'>Wind Speed </span>{weather?.wind.speed} m/s</li>
                        <li className='element'><span className='span'>Clouds </span>{weather?.clouds.all}%</li>
                        <li className='element'><span className='span'>Pressure </span>{weather?.main.pressure} hPa</li>
                    </ul>
                </div>
            </div>
            <h2 className='temperature'>{isCelsius ? temperature?.celsius : temperature?.farenheit}</h2>
            <button className='btn' onClick={handleClick}>{isCelsius ? 'Change to °F' : 'Change to °C'}</button>
        </article>
    )
}


export default CardWeather