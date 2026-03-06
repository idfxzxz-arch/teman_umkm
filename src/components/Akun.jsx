import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function Akun() {
  const navigate = useNavigate();
  
  const [totalFavorit, setTotalFavorit] = useState(0);
  const [totalTokoSaya, setTotalTokoSaya] = useState(0);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setTotalFavorit(savedFavorites.length);

    const myStores = JSON.parse(localStorage.getItem("umkm")) || [];
    setTotalTokoSaya(myStores.length);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#F8F9FA",
        paddingBottom: "120px",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* HEADER SECTION */}
      <div
        style={{
          background: "linear-gradient(135deg, #30552B 0%, #20B100 100%)",
          padding: "50px 20px 40px",
          color: "white",
          textAlign: "center",
          borderBottomLeftRadius: "40px",
          borderBottomRightRadius: "40px",
          boxShadow: "0 10px 20px rgba(32, 177, 0, 0.2)",
        }}
      >
        <div style={{ position: "relative", display: "inline-block" }}>
          <img
            src="/profile.png"
            alt="profile"
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
        </div>

        <h2 style={{ marginTop: "15px", marginBottom: "5px", fontSize: "22px" }}>
          Nama Pengguna
        </h2>
        <p style={{ opacity: 0.9, fontSize: "14px", fontWeight: "300" }}>
          user@umkm-mail.com
        </p>

        <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginTop: "20px" }}>
          <button style={styles.btnSecondary}>Edit Profil</button>
          <button 
            onClick={() => navigate("/tambah-toko")}
            style={styles.btnPrimary}
          >
            ➕ Tambah Toko
          </button>
        </div>
      </div>

      {/* STATS SECTION */}
      <div style={styles.statsContainer}>
        <div 
          onClick={() => navigate("/favorit")} 
          style={{ ...styles.statBox, cursor: "pointer" }}
        >
          <span style={styles.statNum}>{totalFavorit}</span>
          <span style={styles.statLabel}>Favorit</span>
        </div>
        <div style={{ width: "1px", height: "30px", background: "#EEE" }}></div>
        <div style={styles.statBox}>
          <span style={styles.statNum}>{totalTokoSaya}</span>
          <span style={styles.statLabel}>Toko Saya</span>
        </div>
      </div>

      {/* MENU SECTION */}
      <div style={styles.menuWrapper}>
        <h3 style={styles.menuTitle}>Aktivitas Saya</h3>
        
        {/* FAVORIT */}
        <div onClick={() => navigate("/favorit")} style={styles.menuItem}>
          <div style={{ ...styles.iconCircle, background: "#FFF0F0" }}>
            <img src="/favorite-active.png" style={{ width: "18px" }} alt="fav" />
          </div>
          <span style={{ flex: 1 }}>Daftar Favorit ({totalFavorit})</span>
          <span style={styles.chevron}>›</span>
        </div>

        {/* BANTUAN */}
        <div onClick={() => navigate("/bantuan")} style={styles.menuItem}>
          <div style={{ ...styles.iconCircle, background: "#F0F7FF" }}>
            <img src="/help.png" style={{ width: "18px" }} alt="help" />
          </div>
          <span style={{ flex: 1 }}>Bantuan</span>
          <span style={styles.chevron}>›</span>
        </div>

        {/* TENTANG */}
        <div onClick={() => navigate("/tentang")} style={styles.menuItem}>
          <div style={{ ...styles.iconCircle, background: "#F5F5F5" }}>
            <img src="/about.png" style={{ width: "18px" }} alt="about" />
          </div>
          <span style={{ flex: 1 }}>Tentang Aplikasi</span>
          <span style={styles.chevron}>›</span>
        </div>

        {/* LOGOUT */}
        <div style={{ ...styles.menuItem, borderBottom: "none", color: "#E63946" }}>
          <div style={{ ...styles.iconCircle, background: "#FFEBEB" }}>
            <img src="/logout.png" style={{ width: "18px" }} alt="logout" />
          </div>
          <span style={{ flex: 1, fontWeight: "600" }}>Keluar Akun</span>
        </div>
      </div>

      <Navbar />
    </div>
  );
}

const styles = {
  statusBadge: {
    position: "absolute", bottom: "5px", right: "5px", width: "15px", height: "15px",
    background: "#4CAF50", borderRadius: "50%", border: "2px solid white",
  },
  btnPrimary: {
    padding: "8px 18px", borderRadius: "20px", border: "none", background: "#FFD700",
    color: "#000", fontWeight: "bold", cursor: "pointer", fontSize: "13px",
  },
  btnSecondary: {
    padding: "8px 18px", borderRadius: "20px", border: "1px solid rgba(255, 255, 255, 0.5)",
    background: "rgba(255, 255, 255, 0.2)", color: "white", fontWeight: "bold", cursor: "pointer", fontSize: "13px", backdropFilter: "blur(5px)",
  },
  statsContainer: {
    background: "white", margin: "-25px 30px 0", borderRadius: "20px",
    display: "flex", justifyContent: "space-around", alignItems: "center", padding: "15px", boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
  },
  statBox: { textAlign: "center", display: "flex", flexDirection: "column" },
  statNum: { fontWeight: "bold", fontSize: "18px", color: "#333" },
  statLabel: { fontSize: "12px", color: "#888" },
  menuWrapper: {
    marginTop: "30px", background: "white", borderRadius: "20px", margin: "30px 15px 0", padding: "10px", boxShadow: "0 5px 20px rgba(0,0,0,0.03)",
  },
  menuTitle: { fontSize: "14px", color: "#999", padding: "15px 15px 5px", textTransform: "uppercase", letterSpacing: "1px", fontWeight: "600" },
  menuItem: { padding: "14px 15px", borderBottom: "1px solid #F1F1F1", display: "flex", alignItems: "center", gap: "15px", cursor: "pointer", fontSize: "15px", color: "#444" },
  iconCircle: { width: "35px", height: "35px", borderRadius: "10px", display: "flex", alignItems: "center", justifyView: "center", display: "flex", alignItems: "center", justifyContent: "center" },
  chevron: { fontSize: "20px", color: "#CCC", fontWeight: "300" },
};

export default Akun;