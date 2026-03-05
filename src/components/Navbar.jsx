function Navbar() {
  return (
    <div
      style={{
        height: "65px",
        background: "#0f172a",
        color: "white",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        boxShadow: "0 -2px 8px rgba(0,0,0,0.2)",
      }}
    >
      <div>🏠</div>
      <div>🗺️</div>
      <div>👤</div>
    </div>
  );
}

export default Navbar;