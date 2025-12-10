import React, { useEffect, useState } from "react";

const faqList = [
  {
    q: "Ada apa saja pada website Songo Wali?",
    a: "Pada website Songo Wali terdapat 3 menu utama, yaitu menu pengetahuan, menu tes pengetahuan, dan menu ziarah. Pada menu pengetahuan terdapat informasi-informasi tentang Wali Songo dan tempat-tempat yang terkait dengan Wali Songo. Pada menu tes pengetahuan terdapat kuis yang dapat menguji pengetahuan anda tentang Wali Songo. Pada menu ziarah terdapat paket-paket travel yang dapat anda pilih untuk melakukan perjalanan ziarah ke tempat yang terkait dengan Wali Songo.",
  },
  {
    q: "Apakah jika saya mengerjakan Tes Pengetahuan dan saya benar semua akan mendapatkan voucher diskon untuk paket travel?",
    a: "Sayang sekali untuk saat ini tidak, karena memang tujuan awal kami membuat Tes Pengetahuan ini adalah untuk menguji pengetahuan anda tentang Wali Songo setelah membaca artikel/materi yang sudah kami berikan.",
  },
  {
    q: "Apakah ada cara efektif untuk saya yang malas membaca materi yang sangat panjang?",
    a: "Tentu, disini kami memberikan fitur tambahan yaitu fitur audio yang dapat membantu anda untuk mendengarkan materi. Dan juga materi disini benar benar valid berasal dari sumber yang terpercaya seperti Wikipedia dan lainnya.",
  },
];

const AboutPage = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);

  // 👉 FAQ mengikuti sistem Home: array boolean
  const [openFaq, setOpenFaq] = useState(Array(faqList.length).fill(false));

  const toggleFaq = (index) => {
    setOpenFaq((prev) => prev.map((v, i) => (i === index ? !v : v)));
  };

  // scroll button
  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(
        document.body.scrollTop > 20 || document.documentElement.scrollTop > 20
      );
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {showTopBtn && (
        <button id="myBtnTop" title="Go to top" onClick={scrollToTop}>
          <iconify-icon icon="mingcute:arrow-up-line"></iconify-icon>
        </button>
      )}

      {/* =====================
          ABOUT SECTION
      ===================== */}
      <div className="about-page">
        <p className="title-about">Tentang Songo Wali</p>
        <p className="desc-about">
          Songo wali adalah sebuah platform yang mengundang Anda untuk
          menelusuri dan memahami lebih dalam tentang warisan spiritual dan
          nilai-nilai keagamaan yang ditinggalkan oleh Wali Songo. Kami tidak
          hanya menyediakan layanan argo pariwisata religi yang memukau, tetapi
          juga menawarkan peluang edukasi yang memperkaya pengetahuan Anda
          tentang perjalanan keagamaan di Indonesia. Melalui informasi yang kami
          sajikan, Anda dapat menjelajahi destinasi wisata yang sarat sejarah,
          menemukan kecantikan tempat-tempat bersejarah yang menjadi saksi
          perjuangan Wali Songo, dan meresapi nilai-nilai luhur yang mereka
          anut.
        </p>

        <div className="social-media">
          <iconify-icon
            icon="ri:instagram-fill"
            onClick={() => window.open("https://instagram.com", "_blank")}
            class="icon-sosmed"
          ></iconify-icon>

          <iconify-icon
            icon="mingcute:whatsapp-fill"
            onClick={() =>
              window.open(
                "https://wa.me/6289650484363?text=Halo%20saya%20tertarik%20dengan%20website%20Songo%20Wali!",
                "_blank"
              )
            }
            class="icon-sosmed"
          ></iconify-icon>

          <iconify-icon
            icon="dashicons:email-alt"
            onClick={() => window.open("https://gmail.com", "_blank")}
            class="icon-sosmed"
          ></iconify-icon>
        </div>
      </div>

      {/* =====================
          CONTAINER
      ===================== */}
      <div className="container">
        {/* =====================
            FAQ SECTION
        ===================== */}
        <div className="sub-subjek">
          <h2 className="title-faq-quiz">Pertanyaan Umum</h2>
          <p>Berikut pertanyaan umum yang sering ditanyakan pengguna</p>
        </div>

        <div className="general-question">
          {faqList.map((item, index) => (
            <div
              key={index}
              className="card-faq"
              onClick={() => toggleFaq(index)}
            >
              <div className="question">
                {item.q}
                <span className="icon-faq">
                  <iconify-icon
                    icon="line-md:chevron-small-down"
                    width="30"
                    class={openFaq[index] ? "rotate180" : ""}
                  ></iconify-icon>
                </span>
              </div>

              <div
                className="text-faq"
                style={{ display: openFaq[index] ? "block" : "none" }}
              >
                <p>{item.a}</p>
              </div>
            </div>
          ))}
        </div>

        {/* =====================
            GALERI SECTION
        ===================== */}
        <div className="sub-subjek">
          <h2 className="title-faq-quiz">Galeri</h2>
          <p>Berikut beberapa foto lokasi wisata religi wali songo</p>
        </div>

        <div className="image-galery">
          <div className="galery1">
            <div className="con-image">
              <img
                src="/Assets/makam-sunankudus.jpg"
                alt="Menara Kudus"
                className="image"
              />
              <div className="overlay">
                <div className="text-hover">Menara Kudus</div>
              </div>
            </div>

            <div className="con-image">
              <img
                src="/Assets/makam-sunanmuria.jpg"
                alt="Makam Sunan Muria"
                className="image"
              />
              <div className="overlay">
                <div className="text-hover">Makam Sunan Muria</div>
              </div>
            </div>
          </div>

          <div className="galery2">
            <div className="con-image">
              <img
                src="/Assets/makam-sunanampel.jpg"
                alt="Makam Sunan Ampel"
                className="image"
              />
              <div className="overlay">
                <div className="text-hover">Makam Sunan Ampel</div>
              </div>
            </div>

            <div className="con-image">
              <img
                src="/Assets/makam-sunankalijaga.jpg"
                alt="Makam Sunan Kalijaga"
                className="image"
              />
              <div className="overlay">
                <div className="text-hover">Makam Sunan Kalijaga</div>
              </div>
            </div>

            <div className="con-image">
              <img
                src="/Assets/makam-sunandrajat.jpg"
                alt="Makam Sunan Drajat"
                className="image"
              />
              <div className="overlay">
                <div className="text-hover">Makam Sunan Drajat</div>
              </div>
            </div>
          </div>

          <div className="galery3">
            <div className="con-image">
              <img
                src="/Assets/makam-sunangunungjati.jpg"
                alt="Makam Sunan Gunung Jati"
                className="image"
              />
              <div className="overlay">
                <div className="text-hover">Makam Sunan Gunung Jati</div>
              </div>
            </div>

            <div className="con-image">
              <img
                src="/Assets/makam-sunanbonang.jpg"
                alt="Makam Sunan Bonang"
                className="image"
              />
              <div className="overlay">
                <div className="text-hover">Makam Sunan Bonang</div>
              </div>
            </div>
          </div>

          <div className="galery2">
            <div className="con-image">
              <img
                src="/Assets/makam-sunangresik.jpg"
                alt="Makam Sunan Gresik"
                className="image"
              />
              <div className="overlay">
                <div className="text-hover">Makam Sunan Gresik</div>
              </div>
            </div>

            <div className="con-image">
              <img
                src="/Assets/makam-sunangiri.jpg"
                alt="Makam Sunan Giri"
                className="image"
              />
              <div className="overlay">
                <div className="text-hover">Makam Sunan Giri</div>
              </div>
            </div>

            <div className="con-image">
              <img
                src="/Assets/makam-sunankudus1.jpg"
                alt="Komplek Makam Sunan Kudus"
                className="image"
              />
              <div className="overlay">
                <div className="text-hover">Komplek Makam Sunan Kudus</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
