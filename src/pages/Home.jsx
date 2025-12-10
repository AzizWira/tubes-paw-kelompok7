import { useEffect, useState } from "react";
import "../Style/index.css";
const faqs = [
  {
    q: "Ada apa saja pada website Songo Wali?",
    a: `Pada website Songo Wali terdapat 3 menu utama, yaitu menu pengetahuan, menu tes pengetahuan, dan menu ziarah. Pada menu pengetahuan terdapat informasi-informasi tentang Wali Songo dan tempat-tempat yang terkait dengan Wali Songo. Pada menu tes pengetahuan terdapat kuis yang dapat menguji pengetahuan anda tentang Wali Songo. Pada menu ziarah terdapat paket-paket travel yang dapat anda pilih untuk melakukan perjalanan ziarah ke tempat yang terkait dengan Wali Songo.`,
  },
  {
    q: "Apakah jika saya mengerjakan Tes Pengetahuan dan saya benar semua akan mendapatkan voucher diskon untuk paket travel?",
    a: `Sayang sekali untuk saat ini tidak, karena memang tujuan awal kami membuat Tes Pengetahuan ini adalah untuk menguji pengetahuan anda tentang Wali Songo setelah membaca artikel/materi yang sudah kami berikan.`,
  },
  {
    q: "Apakah ada cara efektif untuk saya yang malas membaca materi yang sangat panjang?",
    a: `Tentu, disini kami memberikan fitur tambahan yaitu fitur audio yang dapat membantu anda untuk mendengarkan materi yang sudah kami berikan. Dan juga materi disini benar benar valid berasal dari sumber yang terpercaya seperti Wikipedia dan lainnya.`,
  },
  {
    q: "Apakah harga di atas termasuk tiket masuk ke tempat wisata?",
    a: `Ya harga di atas sudah termasuk tiket masuk ke tempat wisata, driver, BBM, TOL, akomodasi supir dll`,
  },
  {
    q: "Apakah jika saya memesan paket travel innova dan saya tidak mengisi dengan jumlah penumpang maksimal, apakah saya tetap membayar harga yang sama?",
    a: `Ya disini kami menggunakan sistem Private, yang dimana 1 kendaraan hanya akan diisi oleh orang yang client inginkan. Kami tidak akan mencampur antara rombongan 1 dengan yang lainnya.`,
  },
  {
    q: "Apakah saya di perbolehkan meminta berhenti sejenak ke rest aren untuk sholat/buang air kecil?",
    a: `Tentu sangat boleh, jika ingin berhenti sejenak untuk sholat atau buang air kecil, kami akan berhenti di rest area terdekat. Tinggal bilang saja kepada driver.`,
  },
  {
    q: "Apakah saya di perbolehkan meminta kepada driver untuk menuju ke destinasi yang tidak tercantum di paket travel?",
    a: `Kami memperbolehkan anda untuk meminta kepada driver untuk menuju ke destinasi yang tidak tercantum di paket travel, namun dengan catatan anda harus membayar tambahan biaya dan tidak akan melewati batas maksimal waktu yang sudah ditentukan.`,
  },
];

const Home = () => {
  const [showTopBtn, setShowTopBtn] = useState(false);
  const [openFaq, setOpenFaq] = useState(Array(faqs.length).fill(false));

  // tombol scroll to top
  useEffect(() => {
    const onScroll = () => {
      setShowTopBtn(
        document.body.scrollTop > 20 || document.documentElement.scrollTop > 20
      );
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleTopClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // inisialisasi slider jQuery + ubah background header
  useEffect(() => {
    if (!window.$ || !window.$.fn || !window.$.fn.slick) return;

    const $slider = window.$(".customer-logos");

    $slider.slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2500,
      arrows: false,
      dots: false,
      pauseOnHover: false,
      responsive: [
        {
          breakpoint: 1000,
          settings: { slidesToShow: 2 },
        },
        {
          breakpoint: 700,
          settings: { slidesToShow: 3 },
        },
      ],
    });

    const imageUrls = [
      "/Assets/galery/bg-makamsunanampel.jpg",
      "/Assets/galery/bg-makamsunandrajat.jpg",
      "/Assets/galery/bg-makamsunangunungjati.jpg",
      "/Assets/galery/bg-makamsunankalijaga.jpg",
      "/Assets/galery/bg-makamsunanmuria.jpg",
      "/Assets/galery/bg-makamSunanGiri.jpg",
      "/Assets/galery/bg-makamsunanbonang.jpg",
      "/Assets/galery/bg-makamSunanGresik.jpg",
      "/Assets/galery/bg-menarakudus.jpg",
    ];

    const handler = (event, slick, currentSlide) => {
      const idx = currentSlide % imageUrls.length;
      const header = document.getElementById("headerBackground");
      if (header) {
        header.style.backgroundImage =
          "linear-gradient(0deg, rgba(0,0,0,0.50) 0%, rgba(0,0,0,0.50) 100%), url(" +
          imageUrls[idx] +
          ")";
      }
    };

    $slider.on("afterChange", handler);

    return () => {
      // bersihkan kalau perlu
      try {
        $slider.off("afterChange", handler);
        $slider.slick("unslick");
      } catch (e) {
        // ignore
      }
    };
  }, []);

  // submit form → WhatsApp
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const nama = form.nama.value;
    const nomorHp = form.nomorHp.value;
    const email = form.email.value;
    const pesan = form.pesan.value;

    const whatsappMessage = `Halo nama saya "${nama}" | Nomor hp: "${nomorHp}" | Email: "${email}" | Pesan: "${pesan}"`;
    const whatsappLink = `https://api.whatsapp.com/send?phone=6289650484363&text=${encodeURIComponent(
      whatsappMessage
    )}`;
    window.open(whatsappLink, "_blank");
  };

  const toggleFaqIdx = (index) => {
    setOpenFaq((prev) => prev.map((v, i) => (i === index ? !v : v)));
  };

  return (
    <>
      {showTopBtn && (
        <button onClick={handleTopClick} id="myBtnTop" title="Go to top">
          <iconify-icon icon="mingcute:arrow-up-line"></iconify-icon>
        </button>
      )}

      <div
        className="header"
        id="headerBackground"
        style={{
          backgroundImage:
            "linear-gradient(0deg, rgba(0,0,0,0.693) 0%, rgba(0,0,0,0.5) 100%), url(/Assets/menaraKudus.jpg)",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="left">
          <h1>Mengungkap Kearifan Spiritual Wali Songo di Pulau Jawa</h1>
        </div>
        <div className="right">
          <div className="con-card-information customer-logos slider">
            {[
              "menaraKudus.jpg",
              "MakamSunanAmpel.jpg",
              "MakamSunanDrajat.jpg",
              "MakamSunanGunungJati.jpg",
              "MakamSunanKalijaga.jpg",
              "MakamSunanMuria.jpg",
              "makamSunanGiri.jpg",
              "makamSunanBonang.jpg",
              "makamSunanGresik.jpg",
            ].map((img) => (
              <div className="card-information" key={img}>
                <div className="img-information">
                  <img src={`/Assets/galery/${img}`} alt="" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="information">
        <a href="Page/pengetahuan.html">
          <div className="card">
            <iconify-icon
              icon="streamline:quality-education"
              class="icon"
            ></iconify-icon>
            <p>Pengetahuan Tentang Wali Songo</p>
          </div>
        </a>
        <a href="Page/Kuis/tes-pengetahuan.html">
          <div className="card">
            <iconify-icon icon="jam:task-list" class="icon"></iconify-icon>
            <p>Tes Pengetahuan Tentang Wali Songo</p>
          </div>
        </a>
        <a href="Page/ziarah.html">
          <div className="card">
            <iconify-icon icon="cil:bus-alt" class="icon"></iconify-icon>
            <p>Paket Travel Ziarah Wali Songo</p>
          </div>
        </a>
      </div>

      <div className="about-home">
        <div className="img">
          <img src="/Assets/imgAbout.png" alt="" />
        </div>
        <div className="text">
          <h1>Singkat Tentang Situs Kami</h1>
          <p>
            Portal kami adalah sebuah website yang mengedukasi tentang Wali
            Songo dengan metode yang menyenangkan dan interaktif dengan metode
            kuis. Selain itu, kami juga merupakan penyedia layanan travel untuk
            berziarah. Jelajahi perjalanan dakwah spiritual para Wali Songo di
            Pulau Jawa melalui kisah inspiratif, ajaran-ajaran luhur, dan jejak
            langkah spiritual.
          </p>
        </div>
      </div>

      <div className="container-home">
        <div className="sub-subjek">
          <h2 className="title-faq-quiz">Pertanyaan Umum</h2>
          <p>Berikut pertanyaan umum yang sering ditanyakan pengguna</p>
        </div>

        <div className="general-question">
          {faqs.map((item, index) => (
            <div
              className="card-faq"
              key={index}
              onClick={() => toggleFaqIdx(index)}
            >
              <div className="question">
                {item.q}
                <span className="icon-faq">
                  <iconify-icon
                    icon="line-md:chevron-small-down"
                    style={{ color: "#797979" }}
                    width="30"
                    class={openFaq[index] ? "rotate180" : ""}
                  ></iconify-icon>
                </span>
              </div>
              <div
                className="text-faq"
                style={{ display: openFaq[index] ? "block" : "none" }}
              >
                <p dangerouslySetInnerHTML={{ __html: item.a }} />
              </div>
            </div>
          ))}
        </div>

        <div className="sub-subjek">
          <h2 className="title-faq-quiz">Kontak Kami</h2>
          <p>Silahkan hubungi kami jika ada saran maupun kesulitan</p>
        </div>

        <form className="contact-us" onSubmit={handleSubmit}>
          <div className="left">
            <p>Nama</p>
            <input type="text" name="nama" placeholder="Nama" required />
            <p>Nomor Telp</p>
            <input
              type="text"
              name="nomorHp"
              placeholder="Nomor Hp/Telephone"
              required
            />
            <p>Email</p>
            <input type="text" name="email" placeholder="Email" required />
          </div>
          <div className="right">
            <p>Pesan</p>
            <textarea name="pesan" placeholder="Pesan" required></textarea>
            <button type="submit">Kirim</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Home;
