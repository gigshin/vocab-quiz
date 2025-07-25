import React, { useState, useEffect } from "react";

const wordBank = [
  { word: "cooperate", meaning: "to work together" },
  { word: "kind", meaning: "being helpful" },
  { word: "pal", meaning: "a friend" },
  { word: "teacher", meaning: "a person who helps others learn" },
  { word: "student", meaning: "a person who studies" },
  { word: "classroom", meaning: "a place in school" },
  { word: "know", meaning: "to understand" },
  { word: "quiet", meaning: "not loud" },
  { word: "write", meaning: "to mark words" },
  { word: "read", meaning: "to take in words" },
  { word: "goal", meaning: "end that a person wants" },
  { word: "ride", meaning: "to be carried by a car or animal" },
  { word: "fast", meaning: "moving with speed" },
  { word: "fear", meaning: "to be afraid" }
];

export default function VocabQuiz() {
  const [mode, setMode] = useState("word");
  const [currentQ, setCurrentQ] = useState(null);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [attempts, setAttempts] = useState([]);
  const [firstTry, setFirstTry] = useState(true);
  const [correctCount, setCorrectCount] = useState(0);

  const generateQuestion = () => {
    const entry = wordBank[Math.floor(Math.random() * wordBank.length)];
    let quizMode = mode;
    if (mode === "mixed") quizMode = Math.random() > 0.5 ? "word" : "meaning";
    setCurrentQ({ ...entry, quizMode });
    setAnswer("");
    setFeedback("");
    setFirstTry(true);
  };

  const checkAnswer = () => {
    const correct =
      currentQ.quizMode === "word"
        ? currentQ.meaning.toLowerCase()
        : currentQ.word.toLowerCase();
    const user = answer.trim().toLowerCase();

    if (user === correct) {
      setFeedback("✅ Correct!");
      setAttempts(prev => [true, ...prev].slice(0, 30));
      setCorrectCount(count => count + 1);
    } else {
      if (firstTry) {
        setFeedback("❗ Think one more time❤");
        setFirstTry(false);
      } else {
        setFeedback(`❌ Wrong. Correct: ${correct}`);
        setAttempts(prev => [false, ...prev].slice(0, 30));
      }
    }
  };

  const calcAccuracy = () => {
    if (attempts.length === 0) return 0;
    const correct = attempts.filter(a => a).length;
    return Math.round((correct / attempts.length) * 100);
  };

  const renderGauge = () => {
    const accuracy = calcAccuracy();
    const thresholds = [10, 24, 38, 52, 66, 80, 100];
    const colors = ["red", "orange", "yellow", "green", "blue", "indigo", "purple"];
    const activeCount = thresholds.filter(t => accuracy >= t).length;

    return (
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <div style={{ display: "flex", gap: "2px" }}>
          {thresholds.map((_, i) => (
            <div
              key={i}
              style={{
                width: "14px",
                height: "14px",
                backgroundColor: i < activeCount ? colors[i] : "#ddd",
                borderRadius: "3px"
              }}
            />
          ))}
        </div>
        <span style={{ fontSize: "14px" }}>{accuracy}%</span>
      </div>
    );
  };

  return (
    <div className="container">
      <h1>❤Luna's Vocabulary Quiz❤</h1>

      <div className="buttons">
        <button
          onClick={() => setMode("word")}
          style={{ backgroundColor: mode === "word" ? "#cce5ff" : "" }}
        >
          Word → Meaning
        </button>
        <button
          onClick={() => setMode("meaning")}
          style={{ backgroundColor: mode === "meaning" ? "#cce5ff" : "" }}
        >
          Meaning → Word
        </button>
        <button
          onClick={() => setMode("mixed")}
          style={{ backgroundColor: mode === "mixed" ? "#cce5ff" : "" }}
        >
          Mixed
        </button>
      </div>

      <button onClick={generateQuestion} className="full-width">
        Next Question
      </button>

      {currentQ && (
        <div className="quiz-box">
          <div className="question">
            {currentQ.quizMode === "word" ? currentQ.word : currentQ.meaning}
          </div>
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Your answer"
          />
          <button onClick={checkAnswer}>Submit</button>
          {feedback && <div className="feedback">{feedback}</div>}
        </div>
      )}

      <div style={{ marginTop: "1rem" }}>
        <strong>최근 30회 정답률:</strong>
        {renderGauge()}
      </div>
    </div>
  );
}
