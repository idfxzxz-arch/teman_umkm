import { useNavigate, useLocation } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();
  const location = useLocation();

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

      {/* HOME */}
      <div
        onClick={() => navigate("/")}
        style={{ textAlign: "center", cursor: "pointer" }}
      >
        <img
          src={location.pathname === "/" ? "/home-active.png" : "/home.png"}
          alt="Home"
          style={{ width: "24px", height: "24px" }}
        />
      </div>

      {/* FAVORITE */}
      <div
        onClick={() => navigate("/favorit")}
        style={{ textAlign: "center", cursor: "pointer" }}
      >
        <img
          src={location.pathname === "/favorit" ? "/favorite-active.png" : "/favorite.png"}
          alt="Favorite"
          style={{ width: "24px", height: "24px" }}
        />
      </div>

      {/* USER */}
      <div
        onClick={() => navigate("/akun")}
        style={{ textAlign: "center", cursor: "pointer" }}
      >
        <img
          src={location.pathname === "/akun" ? "/user-active.png" : "/user.png"}
          alt="User"
          style={{ width: "24px", height: "24px" }}
        />
      </div>

    </div>
  );
}

export default Navbar;