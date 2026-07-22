import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
} from "react-leaflet";

import L from "leaflet";

import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({

    iconRetinaUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",

    iconUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",

    shadowUrl:
        "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",

});

function EmergencyMap({ emergency }) {

    if (
        !emergency?.location?.coordinates
    ) {

        return null;

    }

    const lat =
        emergency.location.coordinates[1];

    const lng =
        emergency.location.coordinates[0];

    return (

        <div className="overflow-hidden rounded-3xl shadow">

            <MapContainer

                center={[lat, lng]}

                zoom={15}

                style={{

                    height: "400px",

                    width: "100%",

                }}

            >

                <TileLayer

                    attribution='&copy; OpenStreetMap'

                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

                />

                <Marker position={[lat, lng]}>

                    <Popup>

                        🚨 Emergency Location

                    </Popup>

                </Marker>

            </MapContainer>

        </div>

    );

}

export default EmergencyMap;