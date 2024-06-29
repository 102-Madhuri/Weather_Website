import React, { useEffect, useState } from 'react';

export default function Home() {
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);
    const [city, setCity] = useState('London');
    const [userCity, setUserCity] = useState('');
    const [err,seterr] = useState('');
   

    const fetchWeatherData = async (city) => {
        try {
            const res = await fetch(`/api/weather?city=${city}`);
            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = await res.json();
            console.log("data",data)
            setWeatherData(data);
        } catch (err) {
            seterr(err);
            setError(err.message);
        }
    };

    
    useEffect(() => {
        fetchWeatherData(city);
        
    }, [city]);

    const handleSubmit = (event) => {
        event.preventDefault();
        setCity(userCity);
    };

    const getBackgroundImage = () => {
        if (!weatherData || !weatherData.current || !weatherData.current.weather_descriptions) {
            return 'img/back.jpg'; 
        } else {
            const weatherDescription = weatherData.current.weather_descriptions[0].toLowerCase();
            if (weatherDescription.includes('sunny')) {
                return 'img/back.jpg'; 
            }
            if (weatherDescription.includes('rain')) {
                return 'img/back.jpg'; 
            }
            if (weatherDescription.includes('cloud')) {
                return 'img/back.jpg'; 
            }

            return 'img/back.jpg';
        }
    };

    return (
        <div  style={{ ...styles.container, backgroundImage: `url(${getBackgroundImage()})` }}>
             
            <main style={styles.main}>
           
                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.box1}>
                    <input 
                        type="text" 
                        value={userCity} 
                        onChange={(e) => setUserCity(e.target.value)} 
                        placeholder="Enter city name"
                        style={styles.input}
                    /></div>
                    <div style={styles.box2}>
                        <button type="submit" style={styles.button}>Get Weather</button>
                    </div>
                </form>
                {weatherData && weatherData.location && weatherData.location.name ?(
                    <div style={styles.weatherContainer}>
                        <h2 style={styles.cityName} >Weather in {weatherData.location.name}, {weatherData.location.country}</h2>
                        <div style={styles.currentWeather}>
                            <img src={weatherData.current.weather_icons[0]} alt="Weather Icon" style={styles.weatherIcon} />
                            
                            <div>
                                <p>Temperature: {weatherData.current.temperature}Â°C</p>
                                <p>Weather: {weatherData.current.weather_descriptions[0]}</p>
                                <p>Wind: {weatherData.current.wind_speed} km/h {weatherData.current.wind_dir}</p>
                            </div>
                        </div>
                       
                    </div>
                ) : (
                    <p style = {styles.error}>Please Enter Valid City Name</p>
                )}
            </main>
        </div>
    );
}

const styles = {
    cityName: {
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '20px',
        fontFamily:'Arial-serif',
        color: '#333',
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '98.2vh',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        
    },
    main: {
        width: '90%',
        maxWidth: '50%',
        maxHeight: '1000px',
        padding: '60px',
        opacity: '0.7',
        background: '#fff',
        boxShadow: '0px 20px 50px rgba(8, 112, 184, 0.7)',
        borderRadius: '40px',
    },
    form: {    
        display:'flex',
        flexWrap:'wrap',
        justifyContent:'center',
        alignItems:'baseline',
        width:'100%',
        marginBottom: '80px',   
        
    },
    box1: {
        width:'80%',
        padding:'0px 0px 10px 10px'
    },
    input: {
        flex: 1,
        width:'95%',
        padding: '10px',
        marginRight: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        fontSize: '16px',
    },
    button: {
        flex:1,
        width:'100%',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        backgroundColor: '#0070f3',
        color: 'white',
        cursor: 'pointer',
        fontSize: '16px',
    },
    error: {
        color: 'red',
        textAlign: 'center',
        margin: '20px 0',
    },
    weatherContainer: {
        textAlign: 'center',
    },
    currentWeather: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '20px',
    },
    weatherIcon: {
        width: '100px',
        height: '100px',
        borderRadius:'20px',
        marginRight: '20px',
    },
    forecastContainer: {
        marginTop: '20px',
    },
    forecastItem: {
        marginBottom: '10px',
        padding: '10px',
        background: '#f5f5f5',
        borderRadius: '5px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    forecastIcon: {
        width: '50px',
        height: '50px',
    },
};