// src/App.jsx
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

import Home from "./pages/Home.jsx";
import Pengetahuan from "./pages/Pengetahuan.jsx";
import TesPengetahuan from "./pages/kuis/TesPengetahuan";
import QuizPage from "./pages/kuis/QuizPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import DetailPengetahuan from "./pages/detail/pengetahuan/DetailPengetahuan.jsx";

function AppLayout() {
  const location = useLocation();

  // semua route yang TIDAK mau ada navbar & footer
  const hideChrome = location.pathname.startsWith("/kuis/");
  // artinya: /kuis/ampel, /kuis/kudus, dll → tanpa nav & footer
  // sedangkan /kuis (halaman daftar kuis) masih pakai nav & footer

  return (
    <>
      {!hideChrome && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pengetahuan" element={<Pengetahuan />} />
        <Route path="/kuis" element={<TesPengetahuan />} />
        <Route path="/kuis/:slug" element={<QuizPage />} />
        <Route path="/tentang" element={<AboutPage />} />
        <Route path="/pengetahuan/:slug" element={<DetailPengetahuan />} />
      </Routes>

      {!hideChrome && <Footer />}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;
