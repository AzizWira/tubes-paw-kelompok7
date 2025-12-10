// src/pages/Pengetahuan.jsx
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { pengetahuanList } from "../data/pengetahuanList";
import "../Style/Pengetahuan.css";
export default function Pengetahuan() {
  const [showTopBtn, setShowTopBtn] = useState(false);

  // tombol scroll-top
  useEffect(() => {
    const onScroll = () => {
      const scrollTop =
        document.body.scrollTop > 20 || document.documentElement.scrollTop > 20;

      setShowTopBtn(scrollTop);
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTop = () => {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  return (
    <>
      {showTopBtn && (
        <button onClick={scrollTop} id="myBtnTop" title="Go to top">
          <iconify-icon icon="mingcute:arrow-up-line"></iconify-icon>
        </button>
      )}

      <div className="container">
        <div className="title-section">
          <h1>Pengetahuan</h1>
          <p>Mari memahami kearifan spiritual Wali Songo</p>
        </div>

        <div className="content-knowledge">
          {pengetahuanList.map((wali) => (
            <div className="card-profile" key={wali.slug}>
              <div className="one">
                <div className="img">
                  <img src={wali.img} alt={wali.nama} />
                </div>

                <p className="name-wali">{wali.nama}</p>
                <p className="desc-wali">{wali.deskripsi}</p>
              </div>

              <div className="two">
                <Link to={`/pengetahuan/${wali.slug}`}>
                  <button className="btn-knowledge">Lihat Biografi</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
