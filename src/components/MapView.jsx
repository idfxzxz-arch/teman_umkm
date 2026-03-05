import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Tooltip, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import data from "../data/umkm.json";

function LocationMarker({ position }) {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.setView(position, 14); // otomatis fokus ke lokasi user
    }
  }, [position, map]);

  if (!position) return null;

  return (
    <Marker position={position}>
      <Popup>Lokasi Anda</Popup>
    </Marker>
  );
}

function MapView() {
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation([
          position.coords.latitude,
          position.coords.longitude,
        ]);
      },
      () => console.log("User menolak lokasi.")
    );
  }, []);

  const customIcon = L.icon({
    iconUrl: "/lok.png",
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  });

  return (
    <MapContainer
      center={[-6.2, 106.816]}
      zoom={12}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution="© OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Marker lokasi user */}
      <LocationMarker position={userLocation} />

      {/* Marker UMKM */}
      {data.map((item) => (
        <Marker
          key={item.id}
          position={[item.lat, item.lng]}
          icon={customIcon}
        >
          <Tooltip direction="top" offset={[0, -30]} permanent>
            {item.nama}
          </Tooltip>

          <Popup>
            <h3>{item.nama}</h3>
            <p>{item.deskripsi}</p>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default MapView;