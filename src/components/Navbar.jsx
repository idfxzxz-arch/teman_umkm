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
          <img 
            src="/home.png"
            alt="Home"
            style={{ width: "20px", height: "20px" }}
          />
      </div>

      <div style={{ textAlign: "center", cursor: "pointer" }}>
          <img 
            src="/favorite.png"
            alt="Favorite"
            style={{ width: "20px", height: "20px" }}
          />
      </div>

      <div style={{ textAlign: "center", cursor: "pointer" }}>
          <img 
            src="/user.png"
            alt="User"
            style={{ width: "20px", height: "20px" }}
          />
      </div>

    </div>
  );
}

export default Navbar;