// src/pages/kuis/QuizPage.jsx
import React, { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import quizData from "../../data/quizData";

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

const waliNames = {
  "sunan-ampel": "Sunan Ampel",
  "sunan-bonang": "Sunan Bonang",
  "sunan-drajat": "Sunan Drajat",
  "sunan-giri": "Sunan Giri",
  "sunan-gresik": "Sunan Gresik",
  "sunan-gunung-jati": "Sunan Gunung Jati",
  "sunan-kalijaga": "Sunan Kalijaga",
  "sunan-kudus": "Sunan Kudus",
  "sunan-muria": "Sunan Muria",
};

export default function QuizPage() {
  const { slug } = useParams(); // ex: "sunan-ampel"
  const navigate = useNavigate();

  const displayName = useMemo(() => waliNames[slug] || "Wali Songo", [slug]);

  const [questions, setQuestions] = useState([]);
  const [phase, setPhase] = useState("intro"); // "intro" | "quiz" | "result"
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isLocked, setIsLocked] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [selectedCorrect, setSelectedCorrect] = useState(null);
  const [timeoutHappened, setTimeoutHappened] = useState(false);

  // Ambil data soal & acak sekali saat slug berubah
  useEffect(() => {
    const data = quizData[slug] || [];
    const shuffled = shuffle(data);
    setQuestions(shuffled);
    setCurrentIndex(0);
    setScore(0);
    setWrong(0);
    setTimeLeft(30);
    setIsLocked(false);
    setSelectedIndex(null);
    setSelectedCorrect(null);
    setTimeoutHappened(false);
    setPhase("intro");
  }, [slug]);

  // Timer intro 15 detik -> masuk ke quiz (mirip setTimeout di JS lama)
  useEffect(() => {
    if (phase !== "intro") return;
    const id = setTimeout(() => {
      setPhase("quiz");
      setTimeLeft(30);
    }, 15000);
    return () => clearTimeout(id);
  }, [phase]);

  // Timer soal 30 detik
  useEffect(() => {
    if (phase !== "quiz") return;
    if (!questions.length) return;
    if (isLocked) return;

    if (timeLeft <= 0) {
      handleTimeout();
      return;
    }

    const id = setTimeout(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, phase, currentIndex, isLocked, questions.length]);

  // Reset state tiap pindah soal
  useEffect(() => {
    if (phase !== "quiz") return;
    setTimeLeft(30);
    setIsLocked(false);
    setSelectedIndex(null);
    setSelectedCorrect(null);
    setTimeoutHappened(false);
  }, [currentIndex, phase]);

  if (!quizData[slug]) {
    return (
      <div className="body-kuis">
        <div className="card-1" style={{ display: "flex" }}>
          <p>
            Data kuis untuk slug: <b>{slug}</b> tidak ditemukan.
          </p>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  function handleTimeout() {
    if (isLocked) return;
    setIsLocked(true);
    setTimeoutHappened(true);
    setWrong((w) => w + 1);

    setTimeout(() => {
      goNextQuestion();
    }, 1500);
  }

  function handleSelect(isCorrect, idx) {
    if (isLocked) return;
    setIsLocked(true);
    setSelectedIndex(idx);
    setSelectedCorrect(isCorrect);
    setTimeoutHappened(false);

    if (isCorrect) {
      setScore((s) => s + 1);
    } else {
      setWrong((w) => w + 1);
    }

    setTimeout(() => {
      goNextQuestion();
    }, 1500);
  }

  function goNextQuestion() {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((i) => i + 1);
    } else {
      setPhase("result");
    }
  }

  function getButtonClass(i, correctIndex) {
    let cls = "btn";
    if (!isLocked) return cls;

    if (timeoutHappened) {
      // Waktu habis, highlight jawaban benar saja (overtime)
      if (i === correctIndex) cls += " overtime";
      return cls;
    }

    // Sudah menjawab
    if (i === correctIndex) {
      cls += " correct";
    }
    if (selectedIndex === i && selectedCorrect === false) {
      cls += " incorrect";
    }
    return cls;
  }

  // Format waktu: hh:mm:ss seperti versi lama
  const hours = "00";
  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");

  return (
    <div className="body-kuis">
      {/* Audio sama seperti native */}
      <audio controls autoPlay loop>
        <source
          src="/Assets/Audio/Epic Arabian Music _ Golden Age.mp3"
          type="audio/mpeg"
        />
      </audio>

      {/* Tombol close balik ke Tes Pengetahuan */}
      <div
        className="btn-close-kuis"
        onClick={() => navigate("/kuis")}
        style={{ cursor: "pointer" }}
      >
        <iconify-icon icon="line-md:chevron-small-left"></iconify-icon>
      </div>

      {/* CARD 1 - INTRO (display:flex override CSS) */}
      {phase === "intro" && (
        <div className="card-1" id="card-1" style={{ display: "flex" }}>
          <div className="introduction" id="alert-text">
            <p>
              Total soal di level ini = <span>10</span> Soal
            </p>
            <p>
              Durasi mengerjakan = <span>30 detik/soal</span>
            </p>
            <p>
              Ayo uji pengetahuanmu tentang seberapa jauh kamu memperlajari
              materi <b>{displayName}</b> dengan mengerjakan mini kuis berikut
              ini.
            </p>
            <p style={{ color: "red" }}>
              Hindari salah menekan jawaban, karena tidak dapat di ulang!!
            </p>
          </div>
        </div>
      )}

      {/* CARD 2 - QUIZ (display:flex override CSS .card-2 {display:none}) */}
      {phase === "quiz" && currentQuestion && (
        <div className="card-2" id="card-2" style={{ display: "flex" }}>
          <div className="quiz" id="question-area">
            <div className="header-kuis">
              <p className="numberOfQuestions" id="index-question">
                Soal {currentIndex + 1} / {questions.length}
              </p>
              <p className="time" id="timer">
                {hours}:{minutes}:{seconds}
              </p>
            </div>

            <div className="question">
              <div className="text-question">
                <p className="title">Jawablah Pertanyaan Dibawah!</p>
                <p id="question">{currentQuestion.question}</p>
              </div>
            </div>

            <div className="con-btn-answer" id="answers">
              {currentQuestion.answers &&
                currentQuestion.answers.map((ans, i) => {
                  const correctIndex = currentQuestion.answers.findIndex(
                    (a) => a.correct
                  );
                  const answerLetters = ["A", "B", "C", "D"];
                  return (
                    <button
                      key={i}
                      className={getButtonClass(i, correctIndex)}
                      onClick={() => handleSelect(ans.correct, i)}
                      disabled={isLocked}
                    >
                      <span>{answerLetters[i]}</span>
                      <span>{ans.option}</span>
                    </button>
                  );
                })}
            </div>
          </div>
        </div>
      )}

      {/* CARD 3 - RESULT (display:flex override CSS .card-3 {display:none}) */}
      {phase === "result" && (
        <div className="card-3" id="card-3" style={{ display: "flex" }}>
          <div className="result" id="popup-result">
            <div className="header-result">Hasil</div>
            <div className="box">
              <div className="img">
                <img
                  src={
                    score >= 6
                      ? "/Assets/pengetahuan/success.svg"
                      : "/Assets/pengetahuan/failedToNextLevel.svg"
                  }
                  alt={score >= 6 ? "Berhasil" : "Gagal"}
                  id="resultImage"
                />
              </div>
              <div className="text-result">
                <p>
                  {score >= 6
                    ? `HEBATT!! kamu sudah cukup memahami tentang Pengetahuan ${displayName}`
                    : `Wah kamu belum cukup memahami tentang Pengetahuan ${displayName}`}
                </p>
                <div className="jumlah-jawaban">
                  <p>
                    Jawaban Benar :{" "}
                    <span className="jumlah-benar" id="score">
                      {score}
                    </span>
                  </p>
                  <p>
                    Jawaban Salah :{" "}
                    <span className="jumlah-salah" id="wrongAnswers">
                      {wrong}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="con-btn-result">
              <button onClick={() => navigate("/kuis")}>
                Kembali ke halaman utama
              </button>
              <button onClick={() => window.location.reload()}>Ulangi</button>
            </div>
            <div className="con-btn-result2" />
          </div>
        </div>
      )}
    </div>
  );
}
