import { getWeatherIconInfo } from "../lib/weatherApi";
import * as Icons from "lucide-react";

export default function CurrentWeather({ data }) {
  if (!data) return null;
  
  const info = getWeatherIconInfo(data.weather_code, data.is_day);
  const IconComponent = Icons[info.icon] || Icons.Cloud;

  return (
    <div className="glass-panel" style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '40px 20px',
      textAlign: 'center'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <IconComponent size={80} style={{ filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.5))' }} />
        <div style={{ fontSize: '6rem', fontWeight: 700, lineHeight: 1 }}>
          {Math.round(data.temperature_2m)}°
        </div>
      </div>
      <div style={{ fontSize: '2rem', fontWeight: 500, opacity: 0.9 }}>
        {info.label}
      </div>
      <div style={{ fontSize: '1.2rem', opacity: 0.8, marginTop: '10px' }}>
        Ressenti : {Math.round(data.apparent_temperature)}°C
      </div>
    </div>
  );
}
