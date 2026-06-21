import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json({ error: 'Missing query' }, { status: 400 });
  }

  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=5&language=fr&format=json`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Open-Meteo returned ${res.status}`);
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Geocoding API Proxy Error:', error);
    return NextResponse.json({ error: 'Failed to fetch geocoding data' }, { status: 500 });
  }
}
