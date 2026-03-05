import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Tooltip,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import data from "../data/umkm.json";

// ICON UMKM
const umkmIcon = L.icon({
  iconUrl: "/lok.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

// ICON USER
const userIcon = L.icon({
  iconUrl: "/saya.png",
  iconSize: [50, 50],
  iconAnchor: [25, 50],
  popupAnchor: [0, -45],
});

function LocationMarker({ position }) {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.setView(position, 14);
    }
  }, [position, map]);

  if (!position) return null;

  return (
    <Marker position={position} icon={userIcon}>
      <Popup>Ini lokasi saya</Popup>
    </Marker>
  );
}

function MapView() {
  const [userLocation, setUserLocation] = useState(null);
  const [search, setSearch] = useState("");

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

  const filteredData = data.filter((item) =>
    item.nama.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      
      {/* SEARCH BAR */}
      <div
        style={{
          padding: "12px",
          background: "white",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          zIndex: 1000,
        }}
      >
        <input
          type="text"
          placeholder="Cari produk..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            maxWidth: "400px",
            display: "block",
            margin: "0 auto",
            padding: "10px 16px",
            borderRadius: "25px",
            border: "1px solid #ccc",
            outline: "none",
          }}
        />
      </div>

      {/* MAP */}
      <div style={{ flex: 1 }}>
        <MapContainer
          center={[-6.2, 106.816]}
          zoom={12}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution="© OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <LocationMarker position={userLocation} />

          {filteredData.map((item) => (
            <Marker
              key={item.id}
              position={[Number(item.lat), Number(item.lng)]}
              icon={umkmIcon}
            >
              <Tooltip direction="top" offset={[0, -30]} permanent>
                {item.nama}
              </Tooltip>

              <Popup>
                <div style={{ width: "200px" }}>
                  <img
                    src={item.foto}
                    alt={item.nama}
                    style={{ width: "100%", borderRadius: "8px" }}
                  />
                  <h3>{item.nama}</h3>
                  <p>{item.deskripsi}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}

export default MapView;