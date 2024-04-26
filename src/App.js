import React, { useState } from 'react';
import './App.css';

function App() {
  const questions = [
    {
      text: "What is the primary purpose of cybersecurity?",
      options: [
        { id: 0, text: "To speed up computer processes", isCorrect: false },
        { id: 1, text: "To protect systems, networks, and data from digital attacks", isCorrect: true },
        { id: 2, text: "To repair hardware", isCorrect: false },
        { id: 3, text: "To enhance software aesthetics", isCorrect: false }
      ]
    },
    {
      text: "Which of the following is considered a social engineering attack?",
      options: [
        { id: 0, text: "SQL injection", isCorrect: false },
        { id: 1, text: "Phishing", isCorrect: true },
        { id: 2, text: "Ransomware", isCorrect: false },
        { id: 3, text: "Denial of Service attack", isCorrect: false }
      ]
    },
    // Add more questions here
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  return (
    <div className="app">
      {showScore ? (
        <div className="score-section">
          You scored {score} out of {questions.length}
        </div>
      ) : (
        <div className="question-section">
          <div className="question-count">
            <span>Question {currentQuestion + 1}</span>/{questions.length}
          </div>
          <div className="question-text">{questions[currentQuestion].text}</div>
          <div className="answer-section">
            {questions[currentQuestion].options.map((option) => (
              <button onClick={() => handleAnswerOptionClick(option.isCorrect)} key={option.id}>
                {option.text}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
