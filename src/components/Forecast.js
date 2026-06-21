import { getWeatherIconInfo } from "../lib/weatherApi";
import * as Icons from "lucide-react";

export default function Forecast({ daily }) {
  if (!daily) return null;
  
  return (
    <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
      <h3 style={{ fontSize: '1.5rem', marginBottom: '5px', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '10px' }}>Prévisions sur 7 jours</h3>
      {daily.time.map((time, idx) => {
        const date = new Date(time);
        const dayName = new Intl.DateTimeFormat('fr-FR', { weekday: 'long' }).format(date);
        
        const code = daily.weather_code[idx];
        const info = getWeatherIconInfo(code, 1);
        const IconComponent = Icons[info.icon] || Icons.Cloud;
        
        return (
          <div key={time} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: idx < daily.time.length - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none' }}>
            <div style={{ width: '100px', textTransform: 'capitalize', fontWeight: 500 }}>
              {idx === 0 ? 'Aujourd\'hui' : dayName}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 1, justifyContent: 'center' }}>
              <IconComponent size={24} />
              <div style={{ fontSize: '0.9rem', opacity: 0.8, display: ['none', 'block'] }}>{info.label}</div>
            </div>
            <div style={{ display: 'flex', gap: '15px', fontWeight: 600, width: '80px', justifyContent: 'flex-end' }}>
              <span>{Math.round(daily.temperature_2m_max[idx])}°</span>
              <span style={{ opacity: 0.6 }}>{Math.round(daily.temperature_2m_min[idx])}°</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
