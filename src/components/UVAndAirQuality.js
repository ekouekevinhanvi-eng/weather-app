"use client";
import { Sun, Leaf } from "lucide-react";

export default function UVAndAirQuality({ daily, airQuality }) {
  const uvIndex = daily?.uv_index_max?.[0] || 0;
  const aqi = airQuality?.european_aqi || null;

  const getAqiStatus = (val) => {
    if (!val) return "Inconnu";
    if (val <= 20) return "Très bon";
    if (val <= 40) return "Bon";
    if (val <= 60) return "Moyen";
    if (val <= 80) return "Mauvais";
    return "Très mauvais";
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '15px', height: '100%' }}>
      <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '150px' }}>
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.9)', fontSize: '1.1rem' }}>
          <Sun size={20} /> Indice UV
        </h3>
        <div style={{ textAlign: 'center', padding: '15px 0' }}>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{uvIndex}</div>
          <div style={{ opacity: 0.8, fontSize: '1.1rem' }}>{uvIndex > 5 ? 'Élevé' : uvIndex > 2 ? 'Modéré' : 'Faible'}</div>
        </div>
      </div>

      <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '150px' }}>
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.9)', fontSize: '1.1rem' }}>
          <Leaf size={20} /> Qualité Air
        </h3>
        <div style={{ textAlign: 'center', padding: '15px 0' }}>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{aqi !== null ? aqi : '-'}</div>
          <div style={{ opacity: 0.8, fontSize: '1.1rem' }}>{getAqiStatus(aqi)}</div>
        </div>
      </div>
    </div>
  );
}
