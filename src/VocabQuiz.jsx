
import React, { useState } from "react";

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
  { word: "glum", meaning: "sad" },
  { word: "brave", meaning: "ready to face danger" },
  { word: "laugh", meaning: "to smile and make sounds" },
  { word: "garden", meaning: "a land for flowers" },
  { word: "fear", meaning: "to be afraid" },
  { word: "fast", meaning: "moving with speed" },
  { word: "ride", meaning: "to be carried by a car or animal" },
  { word: "goal", meaning: "end that a person wants" }
];

export default function VocabQuiz() {
  const [mode, setMode] = useState("word"); // word | meaning | mixed
  const [currentQ, setCurrentQ] = useState(null);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");

  const generateQuestion = () => {
    const entry = wordBank[Math.floor(Math.random() * wordBank.length)];
    let quizMode = mode;
    if (mode === "mixed") quizMode = Math.random() > 0.5 ? "word" : "meaning";
    setCurrentQ({ ...entry, quizMode });
    setAnswer("");
    setFeedback("");
  };

  const checkAnswer = () => {
    const correct =
      currentQ.quizMode === "word"
        ? currentQ.meaning.toLowerCase()
        : currentQ.word.toLowerCase();
    const user = answer.trim().toLowerCase();
    setFeedback(user === correct ? "✅ Correct!" : `❌ Wrong. Correct: ${correct}`);
  };

  return (
    <div className="container">
      <h1>Vocabulary Quiz</h1>

      <div className="buttons">
        <button onClick={() => setMode("word")}>Word → Meaning</button>
        <button onClick={() => setMode("meaning")}>Meaning → Word</button>
        <button onClick={() => setMode("mixed")}>Mixed</button>
      </div>

      <button onClick={generateQuestion} className="full-width">Next Question</button>

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
    </div>
  );
}
