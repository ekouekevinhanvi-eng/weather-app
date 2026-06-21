"use client";

import { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import CurrentWeather from "../components/CurrentWeather";
import Forecast from "../components/Forecast";
import WeatherDetails from "../components/WeatherDetails";
import HourlyChart from "../components/HourlyChart";
import WindWidget from "../components/WindWidget";
import UVAndAirQuality from "../components/UVAndAirQuality";
import { Cloud, Loader2, MapPin } from "lucide-react";
import { getWeatherByCoords, getWeatherIconInfo } from "../lib/weatherApi";

export default function Home() {
  const [weatherData, setWeatherData] = useState(null);
  const [locationName, setLocationName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState("clear-day");

  useEffect(() => {
    // Set theme on body
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  const loadWeather = async (lat, lon, name) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getWeatherByCoords(lat, lon);
      if (data) {
        setWeatherData(data);
        setLocationName(name || "Position Actuelle");
        
        // Determine theme
        const isDay = data.current.is_day;
        const code = data.current.weather_code;
        const info = getWeatherIconInfo(code, isDay);
        setTheme(info.theme);
      } else {
        setError("Impossible de récupérer les données météorologiques.");
      }
    } catch (err) {
      setError("Une erreur s'est produite lors de la connexion.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Try to get geolocation on mount
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          loadWeather(position.coords.latitude, position.coords.longitude, "Ma Position");
        },
        (error) => {
          console.error("Geolocation error:", error);
          // Default to Paris if geolocation fails or is denied
          loadWeather(48.8566, 2.3522, "Paris, France");
        }
      );
    } else {
      // Default location
      loadWeather(48.8566, 2.3522, "Paris, France");
    }
  }, []);

  const handleCitySelect = (city) => {
    loadWeather(city.latitude, city.longitude, `${city.name}${city.country ? `, ${city.country}` : ''}`);
  };

  return (
    <main>
      <header className="fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', position: 'relative', zIndex: 50 }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem', textShadow: '0 2px 10px rgba(0,0,0,0.2)', textAlign: 'center' }}>
          <Cloud size={48} /> Météo Dynamique
        </h1>
        <SearchBar onSelect={handleCitySelect} />
      </header>
      
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '40vh' }}>
           <Loader2 className="animate-spin" size={48} />
        </div>
      ) : error ? (
        <div className="glass-panel" style={{ color: '#ff6b6b', textAlign: 'center' }}>
          <p>{error}</p>
        </div>
      ) : weatherData && (
        <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '100%' }}>
          <div style={{ textAlign: 'center', marginBottom: '-10px' }}>
            <h2 style={{ fontSize: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', textShadow: '0 2px 10px rgba(0,0,0,0.2)' }}>
              <MapPin /> {locationName}
            </h2>
          </div>
          <div className="dashboard-grid">
            <div className="grid-current">
              <CurrentWeather data={weatherData.current} />
            </div>
            <div className="grid-hourly">
              <HourlyChart hourly={weatherData.hourly} />
            </div>
            <div className="grid-wind">
              <WindWidget current={weatherData.current} />
            </div>
            <div className="grid-aqi">
              <UVAndAirQuality daily={weatherData.daily} airQuality={weatherData.airQuality} />
            </div>
            <div className="grid-details">
              <WeatherDetails data={weatherData.current} />
            </div>
            <div className="grid-forecast">
              <Forecast daily={weatherData.daily} />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
