import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import MapView from "./components/MapView";
import Favorit from "./components/Favorit";
import Akun from "./components/Akun";
import Navbar from "./components/Navbar";
import TambahToko from "./components/TambahToko";

/**
 * Komponen Layout khusus untuk halaman yang butuh Navbar.
 * Outlet adalah tempat di mana MapView, Favorit, dan Akun akan muncul.
 */
const MainLayout = () => {
  return (
    <div style={{ paddingBottom: "70px" }}>
      <Outlet /> 
      <Navbar />
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        {/* --- GRUP 1: Halaman yang PAKAI Navbar --- */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<MapView />} />
          <Route path="/favorit" element={<Favorit />} />
          <Route path="/akun" element={<Akun />} />
        </Route>

        {/* --- GRUP 2: Halaman yang TIDAK PAKAI Navbar --- */}
        <Route path="/tambah-toko" element={<TambahToko />} />
        
        {/* Kamu bisa tambah halaman lain tanpa navbar di sini, misal: */}
        {/* <Route path="/login" element={<Login />} /> */}
      </Routes>
    </Router>
  );
}

export default App;