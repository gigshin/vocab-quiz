import React, { useState, useEffect, useRef } from "react";

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
  { word: "worried", meaning: "feeling uneasy" },
  { word: "glum", meaning: "sad" },
  { word: "brave", meaning: "ready to face danger" },
  { word: "laugh", meaning: "to smile and make sounds" },
  { word: "new", meaning: "not old" },
  { word: "best", meaning: "better than all others" },
  { word: "funny", meaning: "causing laughter" },
  { word: "play", meaning: "to be in  activities" },
  { word: "care", meaning: "to watch over" },
  { word: "share", meaning: "to give out" },
  { word: "tiny", meaning: "very small" },
  { word: "great", meaning: "very important" },
  { word: "gigantic", meaning: "huge" },
  { word: "garden", meaning: "a land for flowers" },
  { word: "grass", meaning: "a short green plant" },
  { word: "Earth", meaning: "a planet people live" },
  { word: "tree", meaning: "a plant with a long trunk" },
  { word: "vegetable", meaning: "a plant for food" },
  { word: "pond", meaning: "a small body of water" },
  { word: "insect", meaning: "a bug" },
  { word: "wise", meaning: "smart" },
  { word: "select", meaning: "to choose" },
  { word: "celebrate", meaning: "to do something special" },
  { word: "clap", meaning: "to hit your hands together" },
  { word: "call", meaning: "to say in a loud voice" },
  { word: "bang", meaning: "to hit loudly" },
  { word: "meow", meaning: "to make sound of a cat" },
  { word: "tell", meaning: "to give info" },
  { word: "say", meaning: "to express in words" },
  { word: "hear", meaning: "to receive sounds" },
  { word: "problem", meaning: "something that is difficult" },
  { word: "young", meaning: "an animal that was just born" },
  { word: "frightended", meaning: "very afraid" },
  { word: "dark", meaning: "having no light" },
  { word: "scare", meaning: "to frighten" },
  { word: "follow", meaning: "to go after" },
  { word: "behind", meaning: "at the back of" },
  { word: "appear", meaning: "to come into sight" },
  { word: "copy", meaning: "something that looks the same" },
  { word: "own", meaning: "belonging to oneself" },
  { word: "annoy", meaning: "to cause someone to feel angry" },
  { word: "tidy", meaning: "clean" },
  { word: "gather", meaning: "to come together" },
  { word: "give", meaning: "to hand something to somebody" },
  { word: "together", meaning: "in one group" },
  { word: "push", meaning: "to move" },
  { word: "join", meaning: "to bring together" },
  { word: "group", meaning: "things together" },
  { word: "help", meaning: "to do work for someone" },
  { word: "everyone", meaning: "every person" },
  { word: "adore", meaning: "to love very much" },
  { word: "bright", meaning: "smart" },
  { word: "confident", meaning: "believing you can do something well" },
  { word: "try", meaning: "to do something" },
  { word: "wish", meaning: "a hope for something" },
  { word: "reach", meaning: "to touch" },
  { word: "wait", meaning: "to stay in one place" },
  { word: "keep", meaning: "to save" },
  { word: "can", meaning: "to be able to" },
  { word: "goal", meaning: "end that a person wants" },
  { word: "sprint", meaning: "to run very fast" },
  { word: "fear", meaning: "to be afraid" },
  { word: "deliver", meaning: "to take something to a person" },
  { word: "bring", meaning: "to take" },
  { word: "fast", meaning: "moving with speed" },
  { word: "find", meaning: "to discover" },
  { word: "lift", meaning: "to raise" },
  { word: "pick", meaning: "to choose" },
  { word: "ride", meaning: "to be carried by a car or aninmal" },
  { word: "take", meaning: "to carry" },
  { word: "curious", meaning: "eager to understand more" },
  { word: "wonder", meaning: "to think about" },
  { word: "describe", meaning: "to tell about something" },
  { word: "cold", meaning: "not hot" },
  { word: "cool", meaning: "a little cold" },
  { word: "warm", meaning: "a little hot" },
  { word: "wet", meaning: "having water" },
  { word: "dry", meaning: "not wet" },
  { word: "soft", meaning: "not hard" },
  { word: "hard", meaning: "firm" },
  { word: "peaceful", meaning: "quiet and calm" },
  { word: "confused", meaning: "unable to understand" },
  { word: "frosty", meaning: "very cold" },
  { word: "sled", meaning: "a now vehicle" },
  { word: "snow", meaning: "the frozen water" },
  { word: "winter", meaning: "season after autumn" },
  { word: "lazy", meaning: "not wanting to work" },
  { word: "fireplace", meaning: "an open space for fire" },
  { word: "scarf", meaning: "cloth for the neck" },
  { word: "mittens", meaning: "gloves with two parts" },
  { word: "fair", meaning: "not favoring someone" },
  { word: "amazing", meaning: "surprising and wonderful" },
  { word: "greedy", meaning: "wanting more" },
  { word: "wake", meaning: "to stop sleeping" },
  { word: "morning", meaning: "the earliest part of the day" },
  { word: "eat", meaning: "to put food in your body" },
  { word: "drink", meaning: "to put drinks in your body" },
  { word: "afternoon", meaning: "12PM~5PM" },
  { word: "wash", meaning: "to clean" },
  { word: "dinner", meaning: "a meal at night" }
  { word: "설아를 세상에서 제일 사랑하는 아빠 이름은?", meaing: "신민승" }
];

export default function VocabQuiz() {
  const [mode, setMode] = useState("word");
  const [currentQ, setCurrentQ] = useState(null);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [attempts, setAttempts] = useState([]);
  const [firstTry, setFirstTry] = useState(true);
  const [correctCount, setCorrectCount] = useState(0);
  const [lastResult, setLastResult] = useState(null);
  const [highlightNext, setHighlightNext] = useState(false);
  const nextBtnRef = useRef(null);

  const generateQuestion = () => {
    const entry = wordBank[Math.floor(Math.random() * wordBank.length)];
    let quizMode = mode;
    if (mode === "mixed") quizMode = Math.random() > 0.5 ? "word" : "meaning";
    setCurrentQ({ ...entry, quizMode });
    setAnswer("");
    setFeedback("");
    setFirstTry(true);
    setLastResult(null);
    setHighlightNext(true);
    setTimeout(() => setHighlightNext(false), 500);
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
      setLastResult("correct");
      setTimeout(() => generateQuestion(), 1200);
    } else {
      if (firstTry) {
        setFeedback("❗ Think one more time❤");
        setFirstTry(false);
      } else {
        setFeedback(`❌ Wrong. Correct: ${correct}`);
        setAttempts(prev => [false, ...prev].slice(0, 30));
        setLastResult("wrong");
        setTimeout(() => generateQuestion(), 1200);
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

  const renderImage = () => {
    if (!currentQ) return null;
    if (lastResult === "correct") {
      return <img src="/IMG_0332.jpeg" alt="Correct" width="120" />;
    } else if (lastResult === "wrong") {
      return <img src="/IMG_0355.jpeg" alt="Wrong" width="120" />;
    } else {
      return <img src="/IMG_9955.jpeg" alt="Quiz" width="120" />;
    }
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

      <button
        ref={nextBtnRef}
        onClick={generateQuestion}
        className="full-width"
        style={{ backgroundColor: highlightNext ? "#ffeb3b" : "" }}
      >
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

      <div style={{ marginTop: "1rem" }}>{renderImage()}</div>
    </div>
  );
}


export default VocabQuiz;
