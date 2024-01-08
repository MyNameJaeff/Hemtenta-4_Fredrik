import React from "react";

function Weather() {
    const [weather, setWeather] = React.useState(null);
    const [date, setDate] = React.useState(null);

    React.useEffect(() => {
        fetch("/api")
            .then((res) => res.json())
            .then((data) => setWeather(data.weather));
        fetch("/api")
            .then((res) => res.json())
            .then((data) => setDate(data.currDate));
    }, []);
    return (
        <div className="weather-info">
            <div className="weather">
                <div>
                    <h3>{weather ?  weather.name : "Loading..."}</h3>
                    <img src={`http://openweathermap.org/img/w/${weather ? weather.weather[0].icon : "Loading..."}.png`} alt="weather icon" />
                    <h3>{weather ? Math.round(weather.main.temp - 273.15) : "Loading..."}°C</h3>
                    <h3>{weather ? weather.wind.speed+" m/s" : "Loading..."}</h3>
                </div>
            </div>
            <div className="current-date">
                <h3>{date ? date : "Loading..."}</h3>
            </div>
        </div>
    );
}

export default Weather;