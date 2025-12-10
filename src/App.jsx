// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

import Home from "./pages/Home.jsx";
import Pengetahuan from "./pages/Pengetahuan.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import DetailPengetahuan from "./pages/detail/pengetahuan/DetailPengetahuan.jsx";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pengetahuan" element={<Pengetahuan />} />
        <Route path="/tentang" element={<AboutPage />} />
        {/* detail dinamis */}
        <Route path="/pengetahuan/:slug" element={<DetailPengetahuan />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
