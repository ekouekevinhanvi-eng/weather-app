import { useState, useEffect, useRef } from "react";
import { Search, MapPin } from "lucide-react";
import { searchCity } from "../lib/weatherApi";

export default function SearchBar({ onSelect }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const fetchCities = async () => {
      if (query.length >= 2) {
        const data = await searchCity(query);
        setResults(data);
        setIsOpen(true);
      } else {
        setResults([]);
        setIsOpen(false);
      }
    };
    
    const timeoutId = setTimeout(fetchCities, 300);
    return () => clearTimeout(timeoutId);
  }, [query]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (city) => {
    onSelect(city);
    setQuery("");
    setIsOpen(false);
  };

  return (
    <div ref={wrapperRef} style={{ width: '100%', maxWidth: '600px', position: 'relative' }}>
      <div className="glass-panel" style={{ padding: '12px 24px', borderRadius: '50px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Search size={24} />
        <input 
          type="text" 
          placeholder="Rechercher une ville..." 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => { if(results.length > 0) setIsOpen(true); }}
          style={{
            width: '100%',
            background: 'transparent',
            border: 'none',
            color: 'inherit',
            fontSize: '1.2rem',
            outline: 'none'
          }}
        />
      </div>
      
      {isOpen && results.length > 0 && (
        <div className="glass-panel" style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          marginTop: '10px',
          borderRadius: '20px',
          padding: '10px 0',
          zIndex: 10,
          maxHeight: '300px',
          overflowY: 'auto'
        }}>
          {results.map((city) => (
            <div 
              key={city.id} 
              onClick={() => handleSelect(city)}
              style={{
                padding: '12px 24px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                transition: 'background 0.2s',
                borderBottom: '1px solid rgba(255,255,255,0.1)'
              }}
              onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
              onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <MapPin size={18} />
              <div>
                <div style={{ fontWeight: 600 }}>{city.name}</div>
                <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>{city.admin1 ? `${city.admin1}, ` : ''}{city.country}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
