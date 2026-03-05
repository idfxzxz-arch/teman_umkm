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

/* ================= FUNGSI HITUNG JARAK ================= */
function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius Bumi dalam km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/* ================= KONFIGURASI ICON ================= */
const umkmIcon = L.divIcon({
  className: "umkm-marker",
  html: `<div class="marker-pin"><span>🏪</span></div>`,
  iconSize: [40, 50],
  iconAnchor: [20, 45],
});

const userIcon = L.divIcon({
  className: "custom-user-location",
  html: `<div class="blue-dot"></div>`,
  iconSize: [20, 20],
  iconAnchor: [10, 10],
});

/* ================= PENGATUR SUDUT PANDANG MAP ================= */
function ChangeView({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, 15);
    }
  }, [center, map]);
  return null;
}

/* ================= KOMPONEN UTAMA ================= */
function MapView() {
  const [userLocation, setUserLocation] = useState(null);
  const [search, setSearch] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [data, setData] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  // Sinkronisasi Data UMKM
  useEffect(() => {
  fetch("http://https://volt-folding-sparc-allowed.trycloudflare.com/api/get-toko.php")
    .then((res) => res.json())
    .then((result) => {
      setData(result);
    })
    .catch((err) => console.log(err));
}, []);

  // Ambil Lokasi Pengguna
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation([position.coords.latitude, position.coords.longitude]);
      },
      () => console.log("Akses lokasi ditolak pengguna.")
    );
  }, []);

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

  const filteredData = data.filter((item) => {
    const keyword = search.toLowerCase();
    return (
      item.nama.toLowerCase().includes(keyword) ||
      item.deskripsi.toLowerCase().includes(keyword)
    );
  });

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", fontFamily: "'Inter', sans-serif" }}>
      
      {/* HEADER */}
      <header style={{ background: "linear-gradient(145deg, #30552B, #20B100)", color: "white", padding: "12px", textAlign: "center", fontWeight: "bold", zIndex: 10, fontSize: "16px" }}>
        Marketplace UMKM Berbasis Map
      </header>

      <div style={{ flex: 1, position: "relative" }}>
        
        {/* SEARCH BAR DENGAN JARAK */}
        <div style={{ position: "absolute", top: "20px", left: "50%", transform: "translateX(-50%)", width: "92%", maxWidth: "420px", zIndex: 2000 }}>
          <div style={{ position: "relative" }}>
            <input
              type="text"
              placeholder="Cari Martabak, Pecel, atau Toko..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setShowResults(true); }}
              onFocus={() => setShowResults(true)}
              style={{ width: "100%", padding: "14px 20px 14px 45px", borderRadius: "30px", border: "none", boxShadow: "0 8px 25px rgba(0,0,0,0.2)", outline: "none", boxSizing: "border-box", fontSize: "14px" }}
            />
            <img src="/search.png" alt="search" style={{ position: "absolute", left: "18px", top: "50%", transform: "translateY(-50%)", width: "18px", opacity: 0.5 }} />
          </div>

          {showResults && search && (
            <div style={{ background: "white", borderRadius: "18px", marginTop: "10px", boxShadow: "0 10px 30px rgba(0,0,0,0.2)", maxHeight: "280px", overflowY: "auto" }}>
              {filteredData.map((item) => {
                const dist = userLocation ? getDistance(userLocation[0], userLocation[1], Number(item.lat), Number(item.lng)) : null;
                const fmtDist = dist ? (dist < 1 ? `${Math.round(dist * 1000)} m` : `${dist.toFixed(1)} km`) : "";

                return (
                  <div
                    key={item.id}
                    onClick={() => { setSelectedLocation([Number(item.lat), Number(item.lng)]); setSearch(""); setShowResults(false); }}
                    style={{ padding: "14px 18px", cursor: "pointer", borderBottom: "1px solid #f1f1f1", display: "flex", justifyContent: "space-between", alignItems: "center" }}
                  >
                    <div style={{ flex: 1 }}>
                      <strong style={{ display: "block", fontSize: "14px", color: "#333" }}>{item.nama}</strong>
                      <span style={{ fontSize: "12px", color: "#777" }}>{item.deskripsi.substring(0, 40)}...</span>
                    </div>
                    {fmtDist && (
                      <span style={{ fontSize: "11px", color: "#20B100", fontWeight: "bold", background: "#E8F5E9", padding: "4px 8px", borderRadius: "10px", marginLeft: "10px", whiteSpace: "nowrap" }}>
                        📍 {fmtDist}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* MAP */}
        <MapContainer center={[-7.5695, 110.8301]} zoom={12} style={{ height: "100%", width: "100%" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {userLocation && (
            <Marker position={userLocation} icon={userIcon}>
              <Popup>Anda di sini</Popup>
            </Marker>
          )}

          {selectedLocation && <ChangeView center={selectedLocation} />}

          {data.map((item) => {
            const dist = userLocation ? getDistance(userLocation[0], userLocation[1], Number(item.lat), Number(item.lng)) : null;
            const fmtDist = dist ? (dist < 1 ? `${Math.round(dist * 1000)} m` : `${dist.toFixed(1)} km`) : "Menghitung...";

            return (
              <Marker key={item.id} position={[Number(item.lat), Number(item.lng)]} icon={umkmIcon}>
                <Tooltip direction="top" offset={[0, -30]} permanent>{item.nama}</Tooltip>
                
                <Popup>
                  <div style={{ width: "240px" }}>
                    <img src={item.foto} alt={item.nama} style={{ width: "100%", borderRadius: "12px", height: "135px", objectFit: "cover" }} />
                    <h3 style={{ margin: "12px 0 4px 0", fontSize: "18px", color: "#333" }}>{item.nama}</h3>
                    <p style={{ fontSize: "13px", color: "#666", marginBottom: "8px", lineHeight: "1.4" }}>{item.deskripsi}</p>
                    
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "12px", color: "#20B100", fontWeight: "700", fontSize: "13px" }}>
                      <span>📍 {fmtDist} dari lokasi Anda</span>
                    </div>

                    <div style={{ display: "flex", gap: "10px" }}>
                      <button
                        onClick={() => toggleFavorite(item)}
                        style={{ flex: 1, height: "45px", border: "1px solid #eee", background: "white", borderRadius: "12px", cursor: "pointer", fontSize: "20px" }}
                      >
                        {favorites.find((f) => f.id === item.id) ? "❤️" : "🤍"}
                      </button>
                      <a
                        href={`https://wa.me/${item.wa}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ flex: 3, height: "45px", background: "#25D366", color: "white", textDecoration: "none", borderRadius: "12px", fontWeight: "bold", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", fontSize: "14px" }}
                      >
                        💬 Chat WhatsApp
                      </a>
                    </div>
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