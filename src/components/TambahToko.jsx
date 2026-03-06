import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Konfigurasi Icon Marker agar muncul dengan benar
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

function TambahToko() {
  const navigate = useNavigate();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);
  
  const [form, setForm] = useState({
    nama: "",
    deskripsi: "",
    lat: -7.123,
    lng: 110.123,
    wa: "",
    foto: ""
  });

  // Komponen Helper untuk menangkap klik lokasi di peta
  function LocationMarker() {
    useMapEvents({
      click(e) {
        setForm({ ...form, lat: e.latlng.lat, lng: e.latlng.lng });
      },
    });
    return <Marker position={[form.lat, form.lng]}></Marker>;
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setForm({ ...form, foto: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const handleSaveData = () => {
    const existing = JSON.parse(localStorage.getItem("umkm")) || [];
    const newData = { id: Date.now(), ...form };
    localStorage.setItem("umkm", JSON.stringify([...existing, newData]));
    setShowConfirmModal(false);
    navigate("/"); 
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Tambah Toko</h2>
        <p style={styles.subtitle}>Isi detail informasi UMKM Anda</p>

        <form onSubmit={(e) => { e.preventDefault(); setShowConfirmModal(true); }}>
          <input style={styles.input} name="nama" placeholder="Nama Toko" onChange={handleChange} required />
          
          <textarea 
            style={styles.textarea} 
            name="deskripsi" 
            placeholder="Deskripsi Toko..." 
            onChange={handleChange} 
            required 
          />
          
          {/* BAGIAN PEMILIH LOKASI (RINGKAS) */}
          <div style={styles.locationSection}>
            <button type="button" onClick={() => setShowMapModal(true)} style={styles.mapTriggerBtn}>
              📍 {form.lat !== -7.123 ? "Ubah Lokasi Peta" : "Pilih Lokasi di Peta"}
            </button>
            <p style={styles.coordLabel}>
              Koordinat: {form.lat.toFixed(5)}, {form.lng.toFixed(5)}
            </p>
          </div>

          <input style={styles.input} name="wa" placeholder="Nomor WhatsApp (628...)" onChange={handleChange} required />
          
          <label style={styles.label}>Foto Toko:</label>
          <input style={styles.input} type="file" accept="image/*" onChange={handleFileChange} required />
          {form.foto && <img src={form.foto} alt="Preview" style={styles.preview} />}

          <button style={styles.button} type="submit">Simpan Toko</button>
          
          {/* TOMBOL BATAL YANG LEBIH TERLIHAT */}
          <button style={styles.buttonBack} type="button" onClick={() => navigate("/")}>
            Batal & Kembali
          </button>
        </form>
      </div>

      {/* POPUP PETA (MAP MODAL) */}
      {showMapModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.mapModalContent}>
            <h3 style={{ marginBottom: "10px" }}>Pilih Lokasi</h3>
            <div style={styles.mapWrapperPopup}>
              <MapContainer center={[form.lat, form.lng]} zoom={13} style={{ height: "100%", width: "100%" }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <LocationMarker />
              </MapContainer>
            </div>
            <button onClick={() => setShowMapModal(false)} style={styles.modalBtnConfirm}>
              Konfirmasi Lokasi
            </button>
          </div>
        </div>
      )}

      {/* MODAL KONFIRMASI SIMPAN */}
      {showConfirmModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <div style={{ fontSize: "40px" }}>❓</div>
            <h3 style={{ margin: "10px 0" }}>Simpan Data?</h3>
            <p style={{ color: "#666", fontSize: "14px", marginBottom: "20px" }}>
              Yakin ingin menyimpan toko <strong>{form.nama}</strong>?
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <button onClick={handleSaveData} style={styles.modalBtnConfirm}>Ya, Simpan</button>
              <button onClick={() => setShowConfirmModal(false)} style={styles.modalBtnCancel}>Batal</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f2f5",
    backgroundImage: `url('./background.png')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    overflow: "hidden"
  },
  card: {
    width: "100%",
    maxWidth: "360px",
    padding: "20px 25px",
    background: "rgba(255, 255, 255, 0.96)",
    borderRadius: "20px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
    boxSizing: "border-box"
  },
  title: { margin: "0", color: "#30552B", fontSize: "22px", fontWeight: "bold" },
  subtitle: { margin: "0 0 15px 0", color: "#666", fontSize: "13px" },
  input: {
    width: "100%", padding: "10px", marginBottom: "10px",
    borderRadius: "8px", border: "1px solid #ddd", fontSize: "13px", boxSizing: "border-box", outline: "none"
  },
  textarea: {
    width: "100%", padding: "10px", marginBottom: "10px",
    borderRadius: "8px", border: "1px solid #ddd", fontSize: "13px",
    boxSizing: "border-box", outline: "none", resize: "none", height: "60px", overflowY: "auto"
  },
  locationSection: {
    backgroundColor: "#f9f9f9",
    padding: "10px",
    borderRadius: "10px",
    marginBottom: "10px",
    border: "1px dashed #ccc",
    textAlign: "center"
  },
  mapTriggerBtn: {
    width: "100%", padding: "8px", borderRadius: "6px", border: "1px solid #30552B",
    backgroundColor: "white", color: "#30552B", fontWeight: "bold", cursor: "pointer", fontSize: "12px"
  },
  coordLabel: { fontSize: "11px", color: "#777", marginTop: "5px", fontFamily: "monospace" },
  label: { display: "block", marginBottom: "5px", fontSize: "12px", fontWeight: "600", color: "#444" },
  preview: { width: "100%", height: "80px", objectFit: "cover", borderRadius: "8px", marginBottom: "10px", border: "1px solid #eee" },
  button: {
    width: "100%", padding: "12px", border: "none", borderRadius: "10px",
    background: "linear-gradient(145deg, #30552B, #20B100)", color: "white", fontWeight: "bold", cursor: "pointer", fontSize: "15px"
  },
  buttonBack: { 
    width: "100%", padding: "11px", marginTop: "8px", background: "transparent", 
    border: "2px solid #dc3545", color: "#dc3545", borderRadius: "10px", 
    fontWeight: "bold", cursor: "pointer", fontSize: "14px", boxSizing: "border-box"
  },
  
  // MODAL STYLES
  modalOverlay: {
    position: "fixed", inset: 0, backgroundColor: "rgba(0, 0, 0, 0.7)",
    backdropFilter: "blur(4px)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 9999
  },
  mapModalContent: {
    width: "90%", maxWidth: "500px", background: "white", padding: "20px", borderRadius: "25px", textAlign: "center"
  },
  mapWrapperPopup: { height: "300px", width: "100%", borderRadius: "15px", overflow: "hidden", marginBottom: "15px", border: "1px solid #ddd" },
  modalContent: { width: "300px", padding: "30px", background: "white", borderRadius: "25px", textAlign: "center", boxShadow: "0 15px 35px rgba(0,0,0,0.2)" },
  modalBtnConfirm: {
    width: "100%", padding: "12px", border: "none", borderRadius: "12px",
    backgroundColor: "#20B100", color: "white", fontWeight: "bold", cursor: "pointer", fontSize: "15px"
  },
  modalBtnCancel: { 
    width: "100%", padding: "10px", border: "1px solid #ddd", borderRadius: "12px", 
    color: "#666", cursor: "pointer", fontWeight: "600", backgroundColor: "#f8f9fa" 
  }
};

export default TambahToko;