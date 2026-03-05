import { useEffect, useState } from "react";

function Favorite() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("favorites");
    if (saved) {
      setFavorites(JSON.parse(saved));
    }
  }, []);

  const removeFavorite = (id) => {
    const updated = favorites.filter((item) => item.id !== id);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f5f5",
        paddingBottom: "120px",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          background: "linear-gradient(145deg,#30552B,#20B100)",
          color: "white",
          padding: "15px",
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "18px",
        }}
      >
        Favorit UMKM
      </div>

      {/* LIST FAVORIT */}
      <div style={{ padding: "15px" }}>
        {favorites.length === 0 && (
          <p style={{ textAlign: "center", color: "#777" }}>
            Belum ada UMKM favorit ❤️
          </p>
        )}

        {favorites.map((item) => (
          <div
            key={item.id}
            style={{
              background: "white",
              borderRadius: "12px",
              padding: "12px",
              marginBottom: "12px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              display: "flex",
              gap: "10px",
              alignItems: "center",
            }}
          >
            <img
              src={item.foto}
              alt={item.nama}
              style={{
                width: "70px",
                height: "70px",
                borderRadius: "8px",
                objectFit: "cover",
              }}
            />

            <div style={{ flex: 1 }}>
              <strong>{item.nama}</strong>

              <div
                style={{
                  fontSize: "13px",
                  color: "#666",
                  marginTop: "3px",
                }}
              >
                {item.deskripsi}
              </div>

              <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
                
                {/* WHATSAPP */}
                <a
                  href={`https://wa.me/${item.wa}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: "#25D366",
                    color: "white",
                    padding: "6px 10px",
                    borderRadius: "6px",
                    fontSize: "13px",
                    textDecoration: "none",
                  }}
                >
                  Chat
                </a>

                {/* HAPUS FAVORIT */}
                <button
                  onClick={() => removeFavorite(item.id)}
                  style={{
                    background: "#ff4d4f",
                    border: "none",
                    color: "white",
                    padding: "6px 10px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontSize: "13px",
                  }}
                >
                  Hapus
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favorite;