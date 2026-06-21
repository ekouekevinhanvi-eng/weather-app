"use client";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function HourlyChart({ hourly }) {
  if (!hourly || !hourly.time) return null;

  const currentHour = new Date().getHours();
  const todayPrefix = new Date().toISOString().split('T')[0];
  
  const nowIndex = hourly.time.findIndex(t => new Date(t).getHours() === currentHour && t.startsWith(todayPrefix));
  const startIndex = nowIndex !== -1 ? nowIndex : 0;
  
  const data = hourly.time.slice(startIndex, startIndex + 24).map((time, i) => {
    const d = new Date(time);
    return {
      time: d.getHours() + 'h',
      temp: hourly.temperature_2m && hourly.temperature_2m[startIndex + i] !== undefined ? Math.round(hourly.temperature_2m[startIndex + i]) : 0,
      precip: hourly.precipitation_probability ? hourly.precipitation_probability[startIndex + i] : 0
    };
  });

  return (
    <div className="glass-panel" style={{ height: '100%', minHeight: '300px', display: 'flex', flexDirection: 'column' }}>
      <h3 style={{ marginBottom: '20px', fontSize: '1.2rem', color: 'rgba(255,255,255,0.9)' }}>Évolution sur 24h</h3>
      <div style={{ flex: 1, width: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ffb142" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#ffb142" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="time" stroke="rgba(255,255,255,0.5)" tick={{fill: 'rgba(255,255,255,0.8)'}} />
            <YAxis stroke="rgba(255,255,255,0.5)" tick={{fill: 'rgba(255,255,255,0.8)'}} />
            <Tooltip 
              contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '10px', color: 'white' }}
              itemStyle={{ color: '#ffb142' }}
            />
            <Area type="monotone" dataKey="temp" name="Température (°C)" stroke="#ffb142" fillOpacity={1} fill="url(#colorTemp)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
