import React, { useState, useEffect } from "react";

const wordBank = [
  { lesson: 1, number: 1, word: "cooperate", meaning: "to work together" },
  { lesson: 1, number: 2, word: "kind", meaning: "being helpful" },
  { lesson: 11, number: 10, word: "dinner", meaning: "a meal at night" }
];

function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function VocabQuiz() {
  const [selectedLessons, setSelectedLessons] = useState(Array.from({ length: 11 }, (_, i) => i + 1));
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const filtered = wordBank.filter(w => selectedLessons.includes(w.lesson));
    setQuestions(shuffle(filtered));
  }, [selectedLessons]);

  return (
    <div>
      <h1>❤Luna's Vocabulary Quiz❤</h1>
      <p>총 단어 수: {questions.length}</p>
    </div>
  );
}