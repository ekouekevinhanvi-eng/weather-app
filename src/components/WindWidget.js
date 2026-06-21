"use client";
import { Compass, Wind } from "lucide-react";

export default function WindWidget({ current }) {
  if (!current) return null;
  
  return (
    <div className="glass-panel" style={{ height: '100%', minHeight: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'rgba(255,255,255,0.9)', fontSize: '1.2rem' }}>
        <Wind size={20} /> Vent
      </h3>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1, padding: '20px 0' }}>
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
           <Compass size={100} strokeWidth={1} style={{ opacity: 0.3 }} />
           <div style={{ position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
             <span style={{ fontSize: '2rem', fontWeight: 'bold' }}>{current.wind_speed_10m}</span>
             <span style={{ fontSize: '0.9rem', opacity: 0.8 }}>km/h</span>
           </div>
        </div>
      </div>
    </div>
  );
}
