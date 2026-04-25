import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './Map.css';
import LocateUser from './LocateUser'
import RoutingMachine from './RoutingMachine';

const userIcon = L.divIcon({
  className: 'user-marker-container',
  html: '<div class="user-marker"></div>',
  iconSize: [12, 12],
  iconAnchor: [6, 6]
});

const Map = ({ route }) => {
  // Default to a generic location until GPS is found
  const [position, setPosition] = useState([13.6288, 79.4192]);
  const [map, setMap] = useState();
  const [isLocating, setIsLocating] = useState(false);

  const handleLocate = () => {
    if (!map) return;
    setIsLocating(true);
    map.locate().on("locationfound", (e) => {
      // Zoom level 18 is close enough to see road details
      map.flyTo(e.latlng, 18, { animate: true, duration: 2 });
      setPosition([e.latlng.lat, e.latlng.lng]);
      setIsLocating(false);
    }).on("locationerror", () => {
      setIsLocating(false);
      alert("Location access denied or unavailable.");
    });
  };

  return (
    <div className='map-container'>
      <MapContainer center={position} zoom={13} ref={setMap} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* This component handles the auto-location logic */}
        <LocateUser setPosition={setPosition} />

        {route && (
          <RoutingMachine 
            key={`${route.source.join(',')}-${route.destination.join(',')}`} 
            source={route.source} 
            destination={route.destination} 
          />
        )}

        {/* Marker for the user's current position */}
        <Marker position={position} icon={userIcon}>
          <Popup>You are here!</Popup>
        </Marker>
      </MapContainer>
      <button className='relocate-button' onClick={handleLocate} disabled={isLocating}>
        {isLocating ? <span className="spinner"></span> : '📍'} {isLocating ? 'Locating...' : 'Recenter'}
      </button>
    </div>
  );
};

export default Map;