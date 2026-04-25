import { useState } from "react";

function Searching({ onSearch }) {

  const [sourceText, setSourceText] = useState('');
  const [destinationText, setDestinationText] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const getCoords = async (query) => {
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}`);
      const data = await res.json();
      if (data.length > 0) {
        return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
      }
    } catch (error) {
      console.error("Geocoding error:", error);
    }
    return null;
  }

  const handleSearch = async () => {
    if (sourceText && destinationText) {
      setIsSearching(true);
      const sCoords = await getCoords(sourceText);
      const dCoords = await getCoords(destinationText);

      if (sCoords && dCoords) {
        onSearch(sCoords, dCoords);
      } else {
        alert("Could not find locations. Try being more specific.");
      }
      setIsSearching(false);
    } else {
      alert("Please enter both source and destination.");
    }
  }

  return (
    <div className="form-container">
      <h2 style={{ marginBottom: '20px', color: '#fff' }}>Plan Your Trip</h2>
      <div className="form-labels">
        <label>Source</label>
        <input 
          type="text" 
          value={sourceText}
          onChange={(e) => setSourceText(e.target.value)} 
          placeholder="e.g. Tirupati" 
        />
      </div>
      <div className="form-labels">
        <label>Destination</label>
        <input 
          type="text" 
          value={destinationText}
          onChange={(e) => setDestinationText(e.target.value)} 
          placeholder="e.g. Nellore" 
        />
      </div>
      <button className="search-button" onClick={handleSearch} disabled={isSearching}>
        {isSearching ? <span className="spinner"></span> : null}
        {isSearching ? ' Searching...' : 'Search Route'}
      </button>
    </div>
  )
}

export default Searching;