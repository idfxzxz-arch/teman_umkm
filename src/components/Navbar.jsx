function Navbar() {
  return (
    <div
      style={{
        position: "fixed",
        bottom: "30px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "90%",
        maxWidth: "420px",
        background: "white",
        borderRadius: "20px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
        display: "flex",
        justifyContent: "space-around",
        padding: "12px 0",
        zIndex: 9999,
      }}
    >
      <div style={{ textAlign: "center", cursor: "pointer" }}>
        <div style={{ fontSize: "20px" }}>🗺️</div>
        <div style={{ fontSize: "12px" }}>Map</div>
      </div>

      <div style={{ textAlign: "center", cursor: "pointer" }}>
        <div style={{ fontSize: "20px" }}>⭐</div>
        <div style={{ fontSize: "12px" }}>Favorit</div>
      </div>

      <div style={{ textAlign: "center", cursor: "pointer" }}>
        <div style={{ fontSize: "20px" }}>👤</div>
        <div style={{ fontSize: "12px" }}>Profil</div>
      </div>
    </div>
  );
}

export default Navbar;