import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { useState } from "react";
import Map from "./components/Map"
import Searching from "./components/Searching";

function App() {

  const [routeData, setRouteData] = useState(null);

  const handleSearch = (sCoords, dCoords) => {
    setRouteData({ source: sCoords, destination: dCoords });
  }

  return (
    <main>
      <Searching onSearch={handleSearch} />
      <Map route={routeData} />
    </main>
  )
}

export default App
