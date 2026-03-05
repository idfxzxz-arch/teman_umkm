import MapView from "./components/MapView";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div style={{ 
      height: "100vh", 
      display: "flex", 
      flexDirection: "column" 
    }}>
      
      <header style={{
        padding: "10px",
        background: "#1f2937",
        color: "white",
        textAlign: "center"
      }}>
        Marketplace UMKM Berbasis Map
      </header>

      <div style={{ flex: 1 }}>
        <MapView />
      </div>

      <Navbar />
    </div>
  );
}

export default App;