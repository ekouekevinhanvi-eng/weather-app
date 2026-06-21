import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');

  if (!lat || !lon) {
    return NextResponse.json({ error: 'Missing lat or lon' }, { status: 400 });
  }

  const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m,pressure_msl&hourly=temperature_2m,precipitation_probability,wind_speed_10m,weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max&timezone=auto`;
  const airQualityUrl = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&current=european_aqi`;

  try {
    const [weatherRes, aqiRes] = await Promise.all([
      fetch(weatherUrl),
      fetch(airQualityUrl).catch(() => null)
    ]);

    if (!weatherRes.ok) {
      throw new Error(`Open-Meteo returned ${weatherRes.status}`);
    }
    
    const data = await weatherRes.json();
    let aqiData = null;
    
    if (aqiRes && aqiRes.ok) {
      aqiData = await aqiRes.json();
    }
    
    return NextResponse.json({
        current: data.current,
        hourly: data.hourly,
        daily: data.daily,
        airQuality: aqiData?.current || null
    });
  } catch (error) {
    console.error('Weather API Proxy Error:', error);
    return NextResponse.json({ error: 'Failed to fetch weather data' }, { status: 500 });
  }
}
