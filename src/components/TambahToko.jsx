import { useState } from "react";
import { useNavigate } from "react-router-dom";

function TambahToko() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nama: "",
    deskripsi: "",
    lat: "",
    lng: "",
    wa: "",
    foto: ""
  });

  // State untuk Modal Popup
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Ambil data yang sudah ada di localStorage
    const existing = JSON.parse(localStorage.getItem("umkm")) || [];

    const newData = {
      id: Date.now(),
      nama: form.nama,
      deskripsi: form.deskripsi,
      lat: parseFloat(form.lat), 
      lng: parseFloat(form.lng),
      wa: form.wa,
      foto: form.foto
    };

    const updated = [...existing, newData];

    // Simpan ke localStorage
    localStorage.setItem("umkm", JSON.stringify(updated));

    // Munculkan Modal Popup, bukan Alert
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate("/"); // Arahkan ke beranda setelah popup ditutup
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Tambah Toko</h2>
        <p style={styles.subtitle}>Tambahkan UMKM baru ke dalam peta</p>

        <form onSubmit={handleSubmit}>
          <input style={styles.input} name="nama" placeholder="Nama Toko" onChange={handleChange} required />
          <input style={styles.input} name="deskripsi" placeholder="Deskripsi" onChange={handleChange} required />
          <input style={styles.input} name="lat" type="number" step="any" placeholder="Latitude (Contoh: -7.123)" onChange={handleChange} required />
          <input style={styles.input} name="lng" type="number" step="any" placeholder="Longitude (Contoh: 110.123)" onChange={handleChange} required />
          <input style={styles.input} name="wa" placeholder="Nomor WhatsApp (628...)" onChange={handleChange} required />
          <input style={styles.input} name="foto" placeholder="URL Foto" onChange={handleChange} required />

          <button style={styles.button} type="submit">Simpan Toko</button>
          <button style={styles.buttonBack} type="button" onClick={handleBack}>Kembali ke Beranda</button>
        </form>
      </div>

      {/* CUSTOM MODAL POPUP */}
      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <div style={{ fontSize: "50px", marginBottom: "10px" }}>✅</div>
            <h3 style={{ margin: "10px 0", color: "#333" }}>Berhasil!</h3>
            <p style={{ color: "#666", fontSize: "14px", marginBottom: "20px" }}>
              Toko <strong>{form.nama}</strong> telah berhasil ditambahkan ke dalam peta.
            </p>
            <button onClick={handleCloseModal} style={styles.modalBtn}>
              Oke, Mengerti
            </button>
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
    backgroundColor: "#f0f2f5", // Warna netral jika background.png tidak ada
    backgroundImage: `url('./background.png')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    overflow: "hidden"
  },
  card: {
    background: "rgba(255,255,255,0.95)",
    padding: "30px",
    borderRadius: "15px",
    width: "350px",
    maxHeight: "90vh",
    overflowY: "auto",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
  },
  title: { marginBottom: "5px", color: "#30552B" },
  subtitle: { marginBottom: "20px", color: "#666", fontSize: "14px" },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "12px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box"
  },
  button: {
    width: "100%",
    padding: "12px",
    border: "none",
    borderRadius: "8px",
    background: "linear-gradient(145deg, #30552B, #20B100)",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "10px",
    fontSize: "15px"
  },
  buttonBack: {
    width: "100%",
    padding: "12px",
    border: "1px solid #30552B",
    borderRadius: "8px",
    background: "transparent",
    color: "#30552B",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "10px",
    fontSize: "15px"
  },
  
  // MODAL STYLES
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 3000,
    padding: "20px"
  },
  modalContent: {
    background: "white",
    padding: "30px",
    borderRadius: "20px",
    width: "100%",
    maxWidth: "320px",
    textAlign: "center",
    boxShadow: "0 15px 35px rgba(0,0,0,0.3)",
    animation: "fadeIn 0.3s ease"
  },
  modalBtn: {
    width: "100%",
    padding: "12px",
    border: "none",
    borderRadius: "10px",
    backgroundColor: "#20B100",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "14px"
  }
};

export default TambahToko;