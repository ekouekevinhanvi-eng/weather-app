import { Droplets, Wind, Gauge, Umbrella } from "lucide-react";

export default function WeatherDetails({ data }) {
  if (!data) return null;
  
  const details = [
    { icon: Droplets, label: "Humidité", value: `${Math.round(data.relative_humidity_2m)}%` },
    { icon: Wind, label: "Vent", value: `${Math.round(data.wind_speed_10m)} km/h` },
    { icon: Gauge, label: "Pression", value: `${Math.round(data.pressure_msl)} hPa` },
    { icon: Umbrella, label: "Précipitations", value: `${data.precipitation} mm` },
  ];

  return (
    <div className="glass-panel" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', alignContent: 'start' }}>
      <h3 style={{ gridColumn: '1 / -1', fontSize: '1.5rem', marginBottom: '10px', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '10px' }}>Détails</h3>
      {details.map((item, idx) => {
        const Icon = item.icon;
        return (
          <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '15px', background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '15px' }}>
            <div style={{ background: 'rgba(255,255,255,0.2)', padding: '10px', borderRadius: '50%', display: 'flex' }}>
              <Icon size={24} />
            </div>
            <div>
              <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>{item.label}</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 600 }}>{item.value}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
