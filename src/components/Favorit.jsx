import { useEffect, useState } from "react";

/* ================= FUNGSI HITUNG JARAK ================= */
function getDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
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

function Favorite() {
  const [favorites, setFavorites] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  
  // State untuk Modal Konfirmasi
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation([position.coords.latitude, position.coords.longitude]);
      },
      () => console.log("Akses lokasi ditolak.")
    );
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("favorites");
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  // Membuka Modal
  const confirmDelete = (id) => {
    setSelectedId(id);
    setShowModal(true);
  };

  // Eksekusi Hapus
  const handleRemove = () => {
    const updated = favorites.filter((item) => item.id !== selectedId);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
    setShowModal(false);
    setSelectedId(null);
  };

  return (
    <div style={styles.page}>
      {/* HEADER */}
      <div style={styles.header}>
        <h2 style={styles.headerTitle}>Favorit Saya</h2>
        <p style={styles.headerSubtitle}>{favorites.length} UMKM Tersimpan</p>
      </div>

      <div style={styles.container}>
        {favorites.length === 0 && (
          <div style={styles.emptyState}>
            <div style={{ fontSize: "60px", marginBottom: "15px" }}>🏪</div>
            <h3 style={{ color: "#333", margin: "0" }}>Belum Ada Data</h3>
            <p style={{ color: "#888", fontSize: "14px" }}>Toko yang disukai muncul di sini.</p>
          </div>
        )}

        {favorites.map((item) => {
          const distance = userLocation && getDistance(userLocation[0], userLocation[1], Number(item.lat), Number(item.lng));
          const formattedDistance = distance && (distance < 1 ? `${Math.round(distance * 1000)} m` : `${distance.toFixed(1)} km`);

          return (
            <div key={item.id} style={styles.card}>
              <div style={styles.imageSection}>
                <img src={item.foto} alt={item.nama} style={styles.image} />
                {formattedDistance && <div style={styles.distanceBadge}>📍 {formattedDistance}</div>}
              </div>

              <div style={styles.infoSection}>
                <div>
                  <h4 style={styles.namaToko}>{item.nama}</h4>
                  <p style={styles.deskripsiToko}>{item.deskripsi}</p>
                </div>

                <div style={styles.actionRow}>
                  <a href={`https://wa.me/${item.wa}`} target="_blank" rel="noopener noreferrer" style={styles.chatButton}>
                    💬 Chat
                  </a>
                  <button onClick={() => confirmDelete(item.id)} style={styles.deleteButton}>
                    🗑️ Hapus
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* CUSTOM MODAL POPUP */}
      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <div style={{ fontSize: "40px", marginBottom: "10px" }}>⚠️</div>
            <h3 style={{ margin: "0 0 10px 0", color: "#333" }}>Hapus Favorit?</h3>
            <p style={{ margin: "0 0 20px 0", color: "#666", fontSize: "14px" }}>
              Apakah Anda yakin ingin menghapus toko ini dari daftar favorit?
            </p>
            <div style={styles.modalActionRow}>
              <button onClick={() => setShowModal(false)} style={styles.cancelBtn}>Batal</button>
              <button onClick={handleRemove} style={styles.confirmBtn}>Ya, Hapus</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ================= STYLING ================= */
const styles = {
  page: { minHeight: "100vh", backgroundColor: "#F3F4F6", paddingBottom: "100px" },
  header: { background: "linear-gradient(135deg, #30552B 0%, #20B100 100%)", padding: "40px 20px 30px 20px", color: "white", textAlign: "center", borderRadius: "0 0 30px 30px" },
  headerTitle: { margin: 0, fontSize: "24px", fontWeight: "bold" },
  headerSubtitle: { margin: "5px 0 0 0", fontSize: "14px", opacity: 0.9 },
  container: { padding: "20px 16px" },
  emptyState: { textAlign: "center", marginTop: "80px" },
  card: { background: "white", borderRadius: "18px", display: "flex", padding: "12px", marginBottom: "16px", boxShadow: "0 4px 15px rgba(0,0,0,0.05)", alignItems: "center" },
  imageSection: { position: "relative" },
  image: { width: "85px", height: "85px", borderRadius: "14px", objectFit: "cover" },
  distanceBadge: { position: "absolute", bottom: "-6px", left: "50%", transform: "translateX(-50%)", background: "white", padding: "2px 8px", borderRadius: "20px", fontSize: "10px", fontWeight: "bold", color: "#30552B", boxShadow: "0 2px 6px rgba(0,0,0,0.1)", whiteSpace: "nowrap" },
  infoSection: { flex: 1, marginLeft: "15px", display: "flex", flexDirection: "column", gap: "8px" },
  namaToko: { margin: "0", fontSize: "16px", fontWeight: "700", color: "#1F2937" },
  deskripsiToko: { margin: "2px 0 0 0", fontSize: "13px", color: "#6B7280", lineHeight: "1.4", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" },
  actionRow: { display: "flex", gap: "10px", marginTop: "4px" },
  chatButton: { flex: 1, backgroundColor: "#25D366", color: "white", textDecoration: "none", textAlign: "center", padding: "8px 0", borderRadius: "10px", fontSize: "13px", fontWeight: "600", display: "flex", alignItems: "center", justifyContent: "center", gap: "5px" },
  deleteButton: { flex: 1, backgroundColor: "#FEE2E2", color: "#EF4444", border: "none", padding: "8px 0", borderRadius: "10px", fontSize: "13px", fontWeight: "600", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "5px" },
  
  // MODAL STYLES
  modalOverlay: { position: "fixed", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000, padding: "20px" },
  modalContent: { background: "white", padding: "25px", borderRadius: "20px", width: "100%", maxWidth: "320px", textAlign: "center", boxShadow: "0 10px 25px rgba(0,0,0,0.2)" },
  modalActionRow: { display: "flex", gap: "10px" },
  cancelBtn: { flex: 1, padding: "10px", border: "1px solid #ddd", borderRadius: "10px", backgroundColor: "#f9f9f9", cursor: "pointer", fontWeight: "600" },
  confirmBtn: { flex: 1, padding: "10px", border: "none", borderRadius: "10px", backgroundColor: "#EF4444", color: "white", cursor: "pointer", fontWeight: "600" }
};

export default Favorite;