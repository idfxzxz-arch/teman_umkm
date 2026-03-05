import MapView from "./components/MapView";
import Navbar from "./components/Navbar";



export default function App() {
  return (
    <div style={{ height: "100vh", width: "100vw", position: "relative" }}>
      <MapView />
      <Navbar />
    </div>
  );
}