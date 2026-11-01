import { useEffect, useState } from "react";
import useSpeechRecognition from "./SpeechRecognition";
import { calculateSimilarity, compareWords } from "./textSimilarity";

function Practice({ tongueTwister, onTryAnother, onGoHome }) {
  const [count, setCount] = useState(0);

  const [similarity, setSimilarity] = useState(null);

  const [feedback, setFeedback] = useState("");

  const [isCorrect, setIsCorrect] = useState(null);

  const [wordComparison, setWordComparison] = useState([]);

  const [scores, setScores] = useState([]);

  const { isListening, transcript, error, startListening, resetSpeech } =
    useSpeechRecognition(tongueTwister.language);

  //RESET WHEN NEW TONGUE TWISTER ARRIVES

  useEffect(() => {
    resetSpeech();

    setCount(0);
    setSimilarity(null);
    setFeedback("");
    setIsCorrect(null);
    
    setWordComparison([]);
    setScores([]);
  }, [tongueTwister]);

  //CHECK SPEECH

  useEffect(() => {
    if (!transcript) {
      return;
    }

    const score = calculateSimilarity(tongueTwister.text, transcript);

    const comparison = compareWords(tongueTwister.text, transcript);

    setSimilarity(score);

    setWordComparison(comparison);

    if (score >= 80) {
      setIsCorrect(true);

      setFeedback(score >= 95 ? "Perfect! 🔥" : "Correct! 🎉");

      setScores((previousScores) => [...previousScores, score]);

      setCount((previousCount) => Math.min(previousCount + 1, 5));
    } else {
      setIsCorrect(false);

      setFeedback(
        score >= 60 ? "Almost there! Try again." : "Not quite. Try again! 💪",
      );
    }
  }, [transcript, tongueTwister]);

  //STATS

  const averageScore =
    scores.length > 0
      ? Math.round(
          scores.reduce((sum, score) => sum + score, 0) / scores.length,
        )
      : 0;

  const bestScore = scores.length > 0 ? Math.max(...scores) : 0;

  const progress = (count / 5) * 100;

  //TRY ANOTHER

  const handleTryAnother = () => {
    resetSpeech();

    setCount(0);
    setSimilarity(null);
    setFeedback("");
    setIsCorrect(null);
    setWordComparison([]);
    setScores([]);

    onTryAnother();
  };

  //COMPLETION

  if (count >= 5) {
    return (
      <div className="app-container">
        <div className="practice-card">
          <div className="completion">
            <div className="success-icon">🎉</div>

            <p className="completion-label">CHALLENGE COMPLETE</p>

            <h1>You nailed it!</h1>

            <p className="completion-text">
              You successfully completed all 5 attempts.
            </p>

            {/* STATS */}

            <div className="stats-grid">
              <div className="stat-card">
                <span>Attempts</span>

                <strong>5 / 5</strong>
              </div>

              <div className="stat-card">
                <span>Average</span>

                <strong>{averageScore}%</strong>
              </div>

              <div className="stat-card">
                <span>Best</span>

                <strong>{bestScore}%</strong>
              </div>
            </div>

            <div className="completion-meta">
              <span>{tongueTwister.language}</span>

              <span>{tongueTwister.difficulty}</span>
            </div>

            <div className="completion-buttons">
              <button className="said-btn" onClick={handleTryAnother}>
                Try Another →
              </button>

              <button className="secondary-btn" onClick={onGoHome}>
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="practice-card">
        {/* HEADER */}

        <div className="practice-top">
          <button className="back-btn" onClick={onGoHome}>
            ← Home
          </button>

          <div className="challenge-tags">
            <span className="language-tag">{tongueTwister.language}</span>

            <span
              className={`difficulty-tag ${tongueTwister.difficulty.toLowerCase()}`}
            >
              {tongueTwister.difficulty}
            </span>
          </div>
        </div>

        {/* ATTEMPT */}

        <div className="attempt-header">
          <div>
            <p className="practice-label">CURRENT ATTEMPT</p>

            <h2>
              {count + 1}
              <span>/5</span>
            </h2>
          </div>

          <div className="attempt-text">Keep going!</div>
        </div>

        {/* PROGRESS */}

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${progress}%`,
            }}
          />
        </div>

        {/* TARGET */}

        <p className="practice-label target-label">SAY THIS</p>

        <div className="twister-box">
          <h1>"{tongueTwister.text}"</h1>
        </div>

        {/* BUTTON */}

        <button
          className="said-btn microphone-btn"
          onClick={startListening}
          disabled={isListening}
        >
          {isListening ? "🎙️ Listening..." : "🎙️ Start Speaking"}
        </button>

        {/* TRANSCRIPT */}

        {transcript && (
          <div className="speech-result">
            <p>YOU SAID</p>

            <strong>"{transcript}"</strong>
          </div>
        )}

        {/* SCORE */}

        {similarity !== null && (
          <div className="score-section">
            <div className="score-circle">
              <strong>{similarity}%</strong>

              <span>accuracy</span>
            </div>

            <div className="score-info">
              <h3>{feedback}</h3>

              <p>
                {similarity >= 80
                  ? "Great pronunciation!"
                  : "Check the highlighted words and try again."}
              </p>
            </div>
          </div>
        )}

        {/* WORD COMPARISON */}

        {wordComparison.length > 0 && (
          <div className="word-comparison">
            <p className="comparison-title">WORD CHECK</p>

            <div className="word-list">
              {wordComparison.map((word, index) => (
                <div
                  key={index}
                  className={
                    word.correct ? "word correct-word" : "word wrong-word"
                  }
                >
                  <span>{word.spoken || "missing"}</span>

                  {!word.correct && word.target && (
                    <small>target: {word.target}</small>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ERROR */}

        {error && <p className="speech-error">{error}</p>}
      </div>
    </div>
  );
}

export default Practice;