function Navbar() {
  return (
    <div
      style={{
        height: "65px",
        backgroundColor: "#0f172a",
        color: "white",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        boxShadow: "0 -2px 8px rgba(0,0,0,0.2)",
      }}
    >
      <button style={btnStyle}>Home</button>
      <button style={btnStyle}>Map</button>
      <button style={btnStyle}>Profile</button>
    </div>
  );
}

const btnStyle = {
  background: "none",
  border: "none",
  color: "white",
  fontSize: "14px",
  cursor: "pointer",
};

export default Navbar;