import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
} from "react-leaflet";

// Custom icons
import {
  userIcon,
  eventIcon,
  businessIcon,
  emergencyIcon,
} from "../../utils/leafletIcons";

function CommunityMap({
  userLocation,
  radius = 50,
  events = [],
  businesses = [],
  emergencies = [],
}) {
  // No location available
  if (!userLocation?.coordinates) {
    return (
      <div className="flex h-[500px] items-center justify-center rounded-2xl border bg-white text-lg text-slate-500 shadow-sm">
        📍 Location unavailable
      </div>
    );
  }

  // Leaflet expects [latitude, longitude]
  const center = [
    userLocation.coordinates[1],
    userLocation.coordinates[0],
  ];

  return (
    <MapContainer
      center={center}
      zoom={11}
      maxZoom={18}
      scrollWheelZoom={true}
      className="h-[500px] w-full rounded-2xl md:h-[700px]"
    >
      {/* ================= BASE MAP ================= */}
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* ================= USER ================= */}
      <Marker position={center} icon={userIcon}>
        <Popup>
          <div className="space-y-1">
            <h3 className="font-bold text-violet-600">
              📍 Your Location
            </h3>

            <p className="text-sm text-slate-600">
              Community radius: {radius} km
            </p>
          </div>
        </Popup>
      </Marker>

      {/* ================= COMMUNITY RADIUS ================= */}
      <Circle
        center={center}
        radius={radius * 1000}
        pathOptions={{
          color: "#7c3aed",
          fillColor: "#a78bfa",
          fillOpacity: 0.15,
        }}
      />

      {/* ================= EVENTS ================= */}
      {events?.map((event) => {
        if (!event?.location?.coordinates) return null;

        return (
          <Marker
            key={event._id}
            position={[
              event.location.coordinates[1],
              event.location.coordinates[0],
            ]}
            icon={eventIcon}
          >
            <Popup>
              <div className="space-y-2">
                <h3 className="font-bold">
                  🏸 {event.title}
                </h3>

                <p className="text-sm">
                  {event.description}
                </p>
              </div>
            </Popup>
          </Marker>
        );
      })}

      {/* ================= BUSINESSES ================= */}
      {businesses?.map((business) => {
        if (!business?.location?.coordinates) return null;

        return (
          <Marker
            key={business._id}
            position={[
              business.location.coordinates[1],
              business.location.coordinates[0],
            ]}
            icon={businessIcon}
          >
            <Popup>
              <div className="space-y-2">
                <h3 className="font-bold">
                  🏪 {business.name}
                </h3>

                <p className="text-sm">
                  {business.description}
                </p>
              </div>
            </Popup>
          </Marker>
        );
      })}

      {/* ================= EMERGENCIES ================= */}
      {emergencies?.map((emergency) => {
        if (!emergency?.location?.coordinates) return null;

        return (
          <Marker
            key={emergency._id}
            position={[
              emergency.location.coordinates[1],
              emergency.location.coordinates[0],
            ]}
            icon={emergencyIcon}
          >
            <Popup>
              <div className="space-y-2">
                <h3 className="font-bold text-red-600">
                  🚨 {emergency.title}
                </h3>

                <p className="text-sm">
                  {emergency.description}
                </p>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}

export default CommunityMap;