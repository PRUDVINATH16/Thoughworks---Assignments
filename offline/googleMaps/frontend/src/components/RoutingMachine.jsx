import L from "leaflet";
import "leaflet-routing-machine";
import { createControlComponent } from "@react-leaflet/core";

const sourceIcon = L.divIcon({
  className: 'source-marker-container',
  html: '<div class="source-marker"></div>',
  iconSize: [20, 20],
  iconAnchor: [10, 20]
});

const destinationIcon = L.divIcon({
  className: 'destination-marker-container',
  html: '<div class="destination-marker"></div>',
  iconSize: [20, 20],
  iconAnchor: [10, 20]
});

const createRoutingMachineLayer = ({ source, destination }) => {
  const instance = L.Routing.control({
    waypoints: [
      L.latLng(source[0], source[1]),
      L.latLng(destination[0], destination[1])
    ],
    lineOptions: {
      styles: [{ color: "#007bff", weight: 6}]
    },
    createMarker: (i, waypoint) => {
      const icon = i === 0 ? sourceIcon : destinationIcon;
      return L.marker(waypoint.latLng, {
        draggable: false,
        icon: icon
      });
    },
    addWaypoints: false,
    draggableWaypoints: false,
    fitSelectedRoutes: true,
    show: false
  });

  return instance
}

const RoutingMachine = createControlComponent(createRoutingMachineLayer);

export default RoutingMachine;