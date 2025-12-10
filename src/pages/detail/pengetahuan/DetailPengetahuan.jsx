// src/pages/detail/pengetahuan/DetailPengetahuan.jsx
import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { pengetahuanWali } from "../../../data/pengetahuanwali.js";

export default function DetailPengetahuan() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const wali = pengetahuanWali.find((w) => w.slug === slug);

  const audioBiografiRef = useRef(null);
  const audioDakwahRef = useRef(null);
  const audioKulturalRef = useRef(null);

  // audio yang lagi aktif (elemennya)
  const [currentAudio, setCurrentAudio] = useState(null);
  // tipe audio aktif: "biografi" | "dakwah" | "kultural" | null
  const [activeType, setActiveType] = useState(null);
  // true = lagi play, false = lagi pause (tapi masih audio yang sama)
  const [isPlaying, setIsPlaying] = useState(false);

  const [showTopBtn, setShowTopBtn] = useState(false);

  // scroll-to-top button
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

  const getAudioByType = (type) => {
    if (type === "biografi") return audioBiografiRef.current;
    if (type === "dakwah") return audioDakwahRef.current;
    if (type === "kultural") return audioKulturalRef.current;
    return null;
  };

  const stopCurrentAudio = () => {
    if (currentAudio && !currentAudio.paused) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }
  };

  // Dengarkan (play dari awal)
  const handlePlayFromStart = (type) => {
    const audio = getAudioByType(type);
    if (!audio) return;

    stopCurrentAudio(); // stop audio lain
    audio.currentTime = 0;
    audio.play();

    setCurrentAudio(audio);
    setActiveType(type);
    setIsPlaying(true);
  };

  // Continue (lanjutkan dari posisi pause)
  const handleContinue = (type) => {
    const audio = getAudioByType(type);
    if (!audio) return;

    // kalau pindah kategori dari pause kategori lain
    if (currentAudio && currentAudio !== audio) {
      currentAudio.pause();
    }

    audio.play();
    setCurrentAudio(audio);
    setActiveType(type);
    setIsPlaying(true);
  };

  // Pause
  const handlePause = (type) => {
    const audio = getAudioByType(type);
    if (!audio) return;

    if (!audio.paused) {
      audio.pause();
    }
    setCurrentAudio(audio);
    setActiveType(type);
    setIsPlaying(false);
  };

  // klik "Tes Pengetahuan Anda"
  const handleGoToQuiz = () => {
    // kalau di data ada quizUrl, pakai itu
    if (wali.quizUrl) {
      navigate(wali.quizUrl);
    } else {
      // fallback: pakai slug yang sama dengan path kuis
      navigate(`/kuis/${slug}`);
    }
  };

  if (!wali) {
    return (
      <div className="container">
        <div className="container-knowledge-sunankudus">
          <h1>Data tidak ditemukan</h1>
          <p>Detail untuk "{slug}" belum tersedia.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* audio tags */}
      <audio ref={audioBiografiRef}>
        <source src={wali.audio.biografi} type="audio/mpeg" />
      </audio>

      <audio ref={audioDakwahRef}>
        <source src={wali.audio.dakwah} type="audio/mpeg" />
      </audio>

      <audio ref={audioKulturalRef}>
        <source src={wali.audio.kultural} type="audio/mpeg" />
      </audio>

      {showTopBtn && (
        <button onClick={scrollTop} id="myBtnTop" title="Go to top">
          <iconify-icon icon="mingcute:arrow-up-line"></iconify-icon>
        </button>
      )}

      <div className="container">
        <div className="container-knowledge-sunankudus">
          <div className="head-content">
            <div className="head-content-left">
              <div className="gallery">
                {wali.gallery.map((src, idx) => (
                  <div className="img" key={idx}>
                    <img src={src} alt={`gambar ${wali.nama}`} />
                  </div>
                ))}
              </div>
            </div>

            <div className="head-content-right">
              <div className="name-wali">
                <p>{wali.nama}</p>
                <div className="line-name"></div>
              </div>
              <div className="born-die">
                <p className="text-born">
                  <b>Lahir</b> : {wali.lahir}
                </p>
                <p className="text-die">
                  <b>Wafat</b> : {wali.wafat}
                </p>
              </div>
              <div className="location">
                <iconify-icon
                  icon="mingcute:location-line"
                  className="icon-location"
                ></iconify-icon>
                <p>{wali.lokasiSingkat}</p>
              </div>
              <p className="address-location">{wali.alamat}</p>
              <a href={wali.mapsUrl} target="_blank" rel="noreferrer">
                <button className="btn-to-location">
                  Arahkan ke Lokasi
                  <iconify-icon
                    icon="uil:location-arrow"
                    className="icon-arrow"
                  ></iconify-icon>
                </button>
              </a>
            </div>
          </div>

          <div className="content-information-wali">
            <div className="title-information">
              <p>Informasi</p>
              <div className="line-bottom"></div>
            </div>

            {/* BIOGRAFI */}
            <div className="container-origin">
              <p className="title-origin">Biografi {wali.nama}</p>
              <div
                className="desc-origin"
                dangerouslySetInnerHTML={{ __html: wali.biografiHtml }}
              ></div>

              <div className="con-btn-audio">
                <button
                  className="btn-music"
                  type="button"
                  onClick={() => handlePlayFromStart("biografi")}
                >
                  Dengarkan
                  <iconify-icon
                    icon="material-symbols:sound-detection-loud-sound-rounded"
                    className="icon-sound"
                  ></iconify-icon>
                </button>

                {/* Continue */}
                <button
                  className="play"
                  type="button"
                  onClick={() => handleContinue("biografi")}
                  style={{
                    display:
                      activeType === "biografi" && !isPlaying ? "flex" : "none",
                  }}
                >
                  <iconify-icon icon="ic:round-play-arrow"></iconify-icon>
                </button>

                {/* Pause */}
                <button
                  className="pause"
                  type="button"
                  onClick={() => handlePause("biografi")}
                  style={{
                    display:
                      activeType === "biografi" && isPlaying ? "flex" : "none",
                  }}
                >
                  <iconify-icon icon="ic:round-pause"></iconify-icon>
                </button>
              </div>
            </div>

            {/* METODE DAKWAH */}
            <div className="container-method">
              <p className="title-method">Metode Berdakwah {wali.nama}</p>
              <div
                className="desc-method"
                dangerouslySetInnerHTML={{ __html: wali.metodeHtml }}
              ></div>

              <div className="con-btn-audio">
                <button
                  className="btn-music"
                  type="button"
                  onClick={() => handlePlayFromStart("dakwah")}
                >
                  Dengarkan
                  <iconify-icon
                    icon="material-symbols:sound-detection-loud-sound-rounded"
                    className="icon-sound"
                  ></iconify-icon>
                </button>

                <button
                  className="play"
                  type="button"
                  onClick={() => handleContinue("dakwah")}
                  style={{
                    display:
                      activeType === "dakwah" && !isPlaying ? "flex" : "none",
                  }}
                >
                  <iconify-icon icon="ic:round-play-arrow"></iconify-icon>
                </button>

                <button
                  className="pause"
                  type="button"
                  onClick={() => handlePause("dakwah")}
                  style={{
                    display:
                      activeType === "dakwah" && isPlaying ? "flex" : "none",
                  }}
                >
                  <iconify-icon icon="ic:round-pause"></iconify-icon>
                </button>
              </div>
            </div>

            {/* PENDEKATAN KULTURAL */}
            <div className="container-culture">
              <p className="title-culture">Pendekatan Kultural {wali.nama}</p>
              <div
                className="desc-culture"
                dangerouslySetInnerHTML={{ __html: wali.kulturalHtml }}
              ></div>

              <div className="con-btn-audio">
                <button
                  className="btn-music"
                  type="button"
                  onClick={() => handlePlayFromStart("kultural")}
                >
                  Dengarkan
                  <iconify-icon
                    icon="material-symbols:sound-detection-loud-sound-rounded"
                    className="icon-sound"
                  ></iconify-icon>
                </button>

                <button
                  className="play"
                  type="button"
                  onClick={() => handleContinue("kultural")}
                  style={{
                    display:
                      activeType === "kultural" && !isPlaying ? "flex" : "none",
                  }}
                >
                  <iconify-icon icon="ic:round-play-arrow"></iconify-icon>
                </button>

                <button
                  className="pause"
                  type="button"
                  onClick={() => handlePause("kultural")}
                  style={{
                    display:
                      activeType === "kultural" && isPlaying ? "flex" : "none",
                  }}
                >
                  <iconify-icon icon="ic:round-pause"></iconify-icon>
                </button>
              </div>
            </div>

            {/* preview ke kuis */}
            <div className="preview-content">
              <p
                className="desc-preview"
                dangerouslySetInnerHTML={{ __html: wali.previewText }}
              ></p>

              <button
                className="btn-test-knowledge"
                type="button"
                onClick={handleGoToQuiz}
              >
                Tes Pengetahuan Anda
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
