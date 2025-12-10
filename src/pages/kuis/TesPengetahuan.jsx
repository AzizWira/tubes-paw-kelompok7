import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const quizList = [
  {
    slug: "sunan-kudus",
    name: "Sunan Kudus",
    img: "/Assets/pengetahuan/profil-sunankudus.jpg",
    to: "/kuis/sunan-kudus",
  },
  {
    slug: "sunan-muria",
    name: "Sunan Muria",
    img: "/Assets/pengetahuan/profil-sunanmuria.jpg",
    to: "/kuis/sunan-muria",
  },
  {
    slug: "sunan-kalijaga",
    name: "Sunan Kalijaga",
    img: "/Assets/pengetahuan/profil-sunankalijaga.jpg",
    to: "/kuis/sunan-kalijaga",
  },
  {
    slug: "sunan-gresik",
    name: "Sunan Gresik",
    img: "/Assets/pengetahuan/profil-sunangresik.jpg",
    to: "/kuis/sunan-gresik",
  },
  {
    slug: "sunan-gunung-jati",
    name: "Sunan Gunung Jati",
    img: "/Assets/pengetahuan/sunan-gunungjati.jpg",
    to: "/kuis/sunan-gunung-jati",
  },
  {
    slug: "sunan-drajat",
    name: "Sunan Drajat",
    img: "/Assets/pengetahuan/profil-drajat.jpg",
    to: "/kuis/sunan-drajat",
  },
  {
    slug: "sunan-giri",
    name: "Sunan Giri",
    img: "/Assets/pengetahuan/profil-sunangiri.jpg",
    to: "/kuis/sunan-giri",
  },
  {
    slug: "sunan-bonang",
    name: "Sunan Bonang",
    img: "/Assets/pengetahuan/profil-sunanbonang.jpg",
    to: "/kuis/sunan-bonang",
  },
  {
    slug: "sunan-ampel",
    name: "Sunan Ampel",
    img: "/Assets/pengetahuan/profil-sunanampel.jpg",
    to: "/kuis/sunan-ampel",
  },
];

export default function TesPengetahuan() {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
      ) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };

    window.addEventListener("scroll", onScroll);
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  return (
    <>
      {showTopBtn && (
        <button onClick={scrollTop} id="myBtnTop" title="Go to top">
          <iconify-icon icon="mingcute:arrow-up-line"></iconify-icon>
        </button>
      )}

      <div className="container">
        <div className="head-content">
          <div className="h-content-left">
            <img
              src="/Assets/Kuis/header-kuis.svg"
              alt="gambar vektor header kuis"
            />
          </div>
          <div className="h-content-right">
            <h1>Setelah mempelajari dan mengenal kesembilan Wali Allah</h1>
            <p>
              Mari uji materi yang sudah anda pelajari, dengan mengerjakan mini
              kuis di bawah ini !!!
            </p>
          </div>
        </div>

        <div className="title-section">
          <h1>Tes Pengetahuan</h1>
          <p>
            Tes Pengetahuanmu seputar Wali Songo dengan mengerjakan kuis berikut
            ini
          </p>
        </div>

        <div className="content-quiz">
          {quizList.map((item) => (
            <div className="card-profile" key={item.slug}>
              <div className="one">
                <div className="img">
                  <img src={item.img} alt={`gambar ${item.name}`} />
                </div>
                <p className="name-wali">{item.name}</p>
              </div>
              <div className="two">
                <Link to={item.to}>
                  <button className="btn-knowledge">Tes Pengetahuan</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
