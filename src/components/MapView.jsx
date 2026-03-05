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

/* ================= HITUNG JARAK ================= */
function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) *
      Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/* ================= ICON UMKM ================= */
const umkmIcon = L.divIcon({
  className: "umkm-marker",
  html: `<div class="marker-pin"><span>🏪</span></div>`,
  iconSize: [40, 50],
  iconAnchor: [20, 45],
});

/* ================= ICON USER ================= */
const userIcon = L.divIcon({
  className: "custom-user-location",
  html: `<div class="blue-dot"></div>`,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

/* ================= MARKER LOKASI USER ================= */
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

/* ================= MAP VIEW ================= */
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

          {filteredData.map((item) => {
            const distance =
              userLocation &&
              getDistance(
                userLocation[0],
                userLocation[1],
                Number(item.lat),
                Number(item.lng)
              );

            const formattedDistance =
              distance && distance < 1
                ? `${Math.round(distance * 1000)} m`
                : distance
                ? `${distance.toFixed(1)} km`
                : null;

            return (
              <Marker
                key={item.id}
                position={[Number(item.lat), Number(item.lng)]}
                icon={umkmIcon}
              >
                <Tooltip direction="top" offset={[0, -30]} permanent>
                  {item.nama}
                </Tooltip>

                <Popup>
                  <div style={{ width: "220px" }}>
                    <img
                      src={item.foto}
                      alt={item.nama}
                      style={{ width: "100%", borderRadius: "8px" }}
                    />

                    <h3 style={{ margin: "8px 0 4px" }}>{item.nama}</h3>

                    <p style={{ margin: "0 0 6px", fontSize: "14px" }}>
                      {item.deskripsi}
                    </p>

                    {formattedDistance && (
                      <p
                        style={{
                          fontSize: "13px",
                          fontWeight: "600",
                          color: "#6b7280",
                          marginBottom: "8px",
                        }}
                      >
                        📍 {formattedDistance} dari lokasi Anda
                      </p>
                    )}

                    {item.wa && (
                      <a
                        href={`https://wa.me/${item.wa.replace(
                          /\D/g,
                          ""
                        )}?text=Halo%20saya%20tertarik%20dengan%20${encodeURIComponent(
                          item.nama
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: "block",
                          padding: "10px",
                          backgroundColor: "#25D366",
                          color: "white",
                          textAlign: "center",
                          borderRadius: "8px",
                          textDecoration: "none",
                          fontSize: "14px",
                          fontWeight: "bold",
                        }}
                      >
                        Chat via WhatsApp
                      </a>
                    )}
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </div>
  );
}

export default MapView;