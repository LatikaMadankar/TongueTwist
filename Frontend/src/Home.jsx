import { useState } from "react";
import { getTTByLanguage } from "./TTService";
import Practice from "./Practice";

function Home() {
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [tongueTwister, setTongueTwister] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleStart = async () => { //getRandomTongueTwister
    try {
      setLoading(true);

      const data = await getTTByLanguage(selectedLanguage, selectedDifficulty);

      if (data.length === 0) {
        alert("No tongue twisters found for this language.");
        return;
      }

      let randomIndex = Math.floor(Math.random() * data.length);

      // Prevent selecting the same tongue twister
      // when Try Another is clicked
      if (tongueTwister && data.length > 1) {
        while (data[randomIndex]._id === tongueTwister._id) {
          randomIndex = Math.floor(Math.random() * data.length);
        }
      }

      setTongueTwister(data[randomIndex]);
    } catch (error) {
      console.error("Error fetching tongue twister:", error);

      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const goHome = () => {
    setTongueTwister(null);
    setSelectedLanguage("");
    setSelectedDifficulty("");
  };

  if (tongueTwister) {
    return (
      <Practice
        tongueTwister={tongueTwister}
        onTryAnother={handleStart}
        onGoHome={goHome}
      />
    );
  }

  return (
    <div className="app-container">
      <div className="home-card">
        <div className="brand-icon">🗣️</div>

        <p className="brand-name">TongueTwist</p>

        <h1>
          Speak it.
          <br />
          <span>Nail it.</span>
        </h1>

        <p className="subtitle">
          Challenge your pronunciation with tricky tongue twisters.
        </p>

        {/* LANGUAGE */}

        <div className="selection-section">
          <h3>Choose your language</h3>

          <div className="option-grid">
            <button
              className={`option-btn ${
                selectedLanguage === "English" ? "selected" : ""
              }`}
              onClick={() => setSelectedLanguage("English")}
            >
              🇬🇧
              <span>English</span>
            </button>

            <button
              className={`option-btn ${
                selectedLanguage === "Hindi" ? "selected" : ""
              }`}
              onClick={() => setSelectedLanguage("Hindi")}
            >
              🇮🇳
              <span>Hindi</span>
            </button>

            <button
              className={`option-btn ${
                selectedLanguage === "Marathi" ? "selected" : ""
              }`}
              onClick={() => setSelectedLanguage("Marathi")}
            >
              🇮🇳
              <span>Marathi</span>
            </button>
          </div>
        </div>

        {/* DIFFICULTY */}

        <div className="selection-section">
          <h3>Choose difficulty</h3>

          <div className="difficulty-grid">
            <button
              className={`difficulty-btn easy ${
                selectedDifficulty === "Easy" ? "selected" : ""
              }`}
              onClick={() => setSelectedDifficulty("Easy")}
            >
              <strong>Easy</strong>
              <small>Warm up</small>
            </button>

            <button
              className={`difficulty-btn medium ${
                selectedDifficulty === "Medium" ? "selected" : ""
              }`}
              onClick={() => setSelectedDifficulty("Medium")}
            >
              <strong>Medium</strong>
              <small>Challenge</small>
            </button>

            <button
              className={`difficulty-btn hard ${
                selectedDifficulty === "Hard" ? "selected" : ""
              }`}
              onClick={() => setSelectedDifficulty("Hard")}
            >
              <strong>Hard</strong>
              <small>Expert</small>
            </button>
          </div>
        </div>

        <button
          className="start-btn"
          onClick={handleStart}
          disabled={!selectedLanguage || !selectedDifficulty || loading}
        >
          {loading ? "Preparing Challenge..." : "Start Challenge →"}
        </button>

        <p className="home-note">🎙️ You'll need microphone access</p>
      </div>
    </div>
  );
}

export default Home;
