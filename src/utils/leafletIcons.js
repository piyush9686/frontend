// src/utils/leafletIcons.js
import L from "leaflet";

// User (Blue)
export const userIcon = L.icon({
  iconUrl: "/src/assets/icons/user-marker.png",
  iconSize: [35, 35],
});

// Emergency (Red)
export const emergencyIcon = L.icon({
  iconUrl: "/src/assets/icons/emergency-marker.png",
  iconSize: [40, 40],
});

// Event (Green)
export const eventIcon = L.icon({
  iconUrl: "/src/assets/icons/event-marker.png",
  iconSize: [35, 35],
});

// Business (Orange)
export const businessIcon = L.icon({
  iconUrl: "/src/assets/icons/business-marker.png",
  iconSize: [35, 35],
});