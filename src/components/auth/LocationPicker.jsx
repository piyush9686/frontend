import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useState } from "react";

import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default marker icons
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",

    iconUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",

    shadowUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// =====================================
// Click Handler
// =====================================

function LocationMarker({ position, setPosition }) {

    useMapEvents({

        click(e) {

            const { lat, lng } = e.latlng;

            setPosition({
                lat,
                lng,
            });

        },

    });

    return position ? (

        <Marker
            position={[
                position.lat,
                position.lng,
            ]}
        />

    ) : null;
}

// =====================================
// Main Component
// =====================================

function LocationPicker({ onSelect }) {

    const [position, setPosition] =
        useState(null);

    const handleSelect = (location) => {

        setPosition(location);

        onSelect(location);

    };

    return (

        <MapContainer
            center={[21.4669, 83.9812]} // Sambalpur
            zoom={10}
            className="h-72 w-full rounded-2xl"
        >

            <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <LocationMarker
                position={position}
                setPosition={handleSelect}
            />

        </MapContainer>

    );

}

export default LocationPicker;