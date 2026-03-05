import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MapView from "./components/MapView";
import Favorit from "./components/Favorit";
import Akun from "./components/Akun";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>

      <Routes>
        <Route path="/" element={<MapView />} />
        <Route path="/favorit" element={<Favorit />} />
        <Route path="/akun" element={<Akun />} />
      </Routes>

      <Navbar />

    </Router>
  );
}

export default App;