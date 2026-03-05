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

/* ================= MAP CONTROLLER ================= */
function ChangeView({ center }) {
  const map = useMap();

  useEffect(() => {
    if (center) {
      map.setView(center, 15);
    }
  }, [center, map]);

  return null;
}

/* ================= MAP VIEW ================= */
function MapView() {
  const [userLocation, setUserLocation] = useState(null);
  const [search, setSearch] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

  /* ===== FAVORIT STATE ===== */
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  const toggleFavorite = (item) => {
    let updated;

    if (favorites.find((fav) => fav.id === item.id)) {
      updated = favorites.filter((fav) => fav.id !== item.id);
    } else {
      updated = [...favorites, item];
    }

    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

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

  const filteredData = data.filter((item) => {
    const keyword = search.toLowerCase();
    return (
      item.nama.toLowerCase().includes(keyword) ||
      item.deskripsi.toLowerCase().includes(keyword)
    );
  });

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ================= TITLE ================= */}
      <header
        style={{
          background: "linear-gradient(145deg, #30552B, #20B100)",
          color: "white",
          padding: "10px",
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        Marketplace UMKM Berbasis Map
      </header>

      {/* ================= MAP AREA ================= */}
      <div style={{ flex: 1, position: "relative" }}>
        
        {/* SEARCH BAR */}
        <div
          style={{
            position: "absolute",
            top: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "90%",
            maxWidth: "420px",
            zIndex: 2000,
          }}
        >
          <div style={{ position: "relative" }}>
            <span
              style={{
                position: "absolute",
                left: "15px",
                top: "50%",
                transform: "translateY(-50%)",
              }}
            >
              <img
                src="/search.png"
                alt="search"
                style={{ width: "16px", height: "16px", opacity: 0.6 }}
              />
            </span>

            <input
              type="text"
              placeholder="Cari UMKM atau produk..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setShowResults(true);
              }}
              onFocus={() => setShowResults(true)}
              style={{
                width: "100%",
                padding: "12px 18px 12px 40px",
                borderRadius: "30px",
                border: "none",
                fontSize: "14px",
                boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
                outline: "none",
              }}
            />
          </div>

          {showResults && search && (
            <div
              style={{
                background: "white",
                borderRadius: "16px",
                marginTop: "8px",
                boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                maxHeight: "260px",
                overflowY: "auto",
              }}
            >
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
                  <div
                    key={item.id}
                    onClick={() => {
                      setSelectedLocation([
                        Number(item.lat),
                        Number(item.lng),
                      ]);
                      setSearch("");
                      setShowResults(false);
                    }}
                    style={{
                      padding: "12px 16px",
                      cursor: "pointer",
                      borderBottom: "1px solid #f3f4f6",
                    }}
                  >
                    <strong>{item.nama}</strong>

                    <div style={{ fontSize: "12px", color: "#666" }}>
                      {item.deskripsi}
                    </div>

                    {formattedDistance && (
                      <div
                        style={{
                          fontSize: "12px",
                          color: "#999",
                          marginTop: "3px",
                        }}
                      >
                        📍 {formattedDistance} dari lokasi Anda
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* MAP */}
        <MapContainer
          center={[-7.56951016052474, 110.8301877678262]}
          zoom={12}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution="© OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {userLocation && (
            <Marker position={userLocation} icon={userIcon}>
              <Popup>Ini lokasi saya</Popup>
            </Marker>
          )}

          {selectedLocation && <ChangeView center={selectedLocation} />}

          {data.map((item) => (
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

                  <h3>{item.nama}</h3>
                  <p>{item.deskripsi}</p>

                  <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>

                    {/* FAVORIT */}
                    <button
                      onClick={() => toggleFavorite(item)}
                      style={{
                        flex: 1,
                        border: "1px solid #eee",
                        background: "white",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontSize: "18px"
                      }}
                    >
                      {favorites.find((fav) => fav.id === item.id) ? "❤️" : "🤍"}
                    </button>

                    {/* WHATSAPP */}
                    <a
                      href={`https://wa.me/${item.wa}?text=Halo%20saya%20tertarik%20dengan%20produk%20di%20${item.nama}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        flex: 4,
                        background: "#25D366",
                        color: "white",
                        textAlign: "center",
                        padding: "8px",
                        borderRadius: "8px",
                        textDecoration: "none",
                        fontWeight: "bold"
                      }}
                    >
                      💬 Chat Via WhatsApp
                    </a>

                  </div>
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