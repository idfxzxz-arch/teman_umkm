import MapView from "./components/MapView";

function App() {
  return (
    <div style={{ height: "100vh", margin: 0 }}>
      <header style={{
        padding: "10px",
        background: "#1f2937",
        color: "white",
        textAlign: "center"
      }}>
        Marketplace UMKM Berbasis Map
      </header>

      <div style={{ height: "calc(100% - 50px)" }}>
        <MapView />
      </div>
    </div>
  );
}

export default App;