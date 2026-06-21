export async function getWeatherByCoords(lat, lon) {
  const url = `/api/weather?lat=${lat}&lon=${lon}`;
  try {
    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) throw new Error("Failed to fetch weather data");
    return await res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function searchCity(query) {
  if (!query || query.length < 2) return null;
  const url = `/api/geocoding?q=${encodeURIComponent(query)}`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch cities");
    const data = await res.json();
    return data.results || [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

export function getWeatherIconInfo(weatherCode, isDay = 1) {
  const codes = {
    0: { label: 'Ciel dégagé', theme: isDay ? 'clear-day' : 'clear-night', icon: isDay ? 'Sun' : 'Moon' },
    1: { label: 'Principalement clair', theme: isDay ? 'clear-day' : 'clear-night', icon: isDay ? 'Sun' : 'Moon' },
    2: { label: 'Partiellement nuageux', theme: 'cloudy', icon: 'CloudSun' },
    3: { label: 'Couvert', theme: 'cloudy', icon: 'Cloud' },
    45: { label: 'Brouillard', theme: 'cloudy', icon: 'CloudFog' },
    48: { label: 'Brouillard givrant', theme: 'cloudy', icon: 'CloudFog' },
    51: { label: 'Bruine légère', theme: 'rain', icon: 'CloudDrizzle' },
    53: { label: 'Bruine modérée', theme: 'rain', icon: 'CloudDrizzle' },
    55: { label: 'Bruine dense', theme: 'rain', icon: 'CloudDrizzle' },
    61: { label: 'Pluie faible', theme: 'rain', icon: 'CloudRain' },
    63: { label: 'Pluie modérée', theme: 'rain', icon: 'CloudRain' },
    65: { label: 'Pluie forte', theme: 'rain', icon: 'CloudRain' },
    71: { label: 'Chute de neige faible', theme: 'cloudy', icon: 'CloudSnow' },
    73: { label: 'Chute de neige modérée', theme: 'cloudy', icon: 'CloudSnow' },
    75: { label: 'Chute de neige forte', theme: 'cloudy', icon: 'CloudSnow' },
    95: { label: 'Orage', theme: 'rain', icon: 'CloudLightning' },
    96: { label: 'Orage avec grêle légère', theme: 'rain', icon: 'CloudLightning' },
    99: { label: 'Orage avec grêle forte', theme: 'rain', icon: 'CloudLightning' },
  };

  return codes[weatherCode] || { label: 'Inconnu', theme: 'cloudy', icon: 'Cloud' };
}
