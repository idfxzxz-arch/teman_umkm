import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import data from "../data/umkm.json";

function MapView() {
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation([
          position.coords.latitude,
          position.coords.longitude
        ]);
      },
      () => {
        console.log("User menolak lokasi.");
      }
    );
  }, []);

  function hitungJarak(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) *
      Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (R * c).toFixed(2);
  }

  return (
    <MapContainer
      center={[-6.2, 106.816]}
      zoom={12}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution="© OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {data.map((item) => {
        const jarak = userLocation
          ? hitungJarak(
              userLocation[0],
              userLocation[1],
              item.lat,
              item.lng
            )
          : null;

        return (
          <Marker key={item.id} position={[item.lat, item.lng]}>
            <Popup>
              <div style={{ width: "200px" }}>
                <img
                  src={item.foto}
                  alt={item.nama}
                  style={{ width: "100%", borderRadius: "8px" }}
                />
                <h3>{item.nama}</h3>
                <p style={{ fontSize: "14px" }}>{item.deskripsi}</p>

                {jarak && (
                  <p style={{ fontSize: "12px" }}>
                    Jarak: {jarak} km
                  </p>
                )}

                <a
                  href={`https://wa.me/${item.whatsapp}?text=Halo%20saya%20tertarik%20dengan%20produk%20Anda`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "block",
                    marginTop: "8px",
                    padding: "6px",
                    background: "green",
                    color: "white",
                    textAlign: "center",
                    borderRadius: "6px",
                    textDecoration: "none"
                  }}
                >
                  Pesan via WhatsApp
                </a>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}

export default MapView;