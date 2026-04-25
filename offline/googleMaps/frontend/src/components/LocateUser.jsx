import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

const LocateUser = ({ setPosition }) => {
  const map = useMap();

  useEffect(() => {
    map.locate().on("locationfound", (e) => {
      setPosition(e.latlng); // Update state with user's coordinates
      map.flyTo(e.latlng, map.getZoom()); // Smoothly move map to user
    });
  }, [map]);

  return null;
};

export default LocateUser;