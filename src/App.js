import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);  // New state to track selected option
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetch('questions.json')
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data);
      })
      .catch((error) => {
        console.error('Error fetching questions:', error);
      });
  }, []);

  const handleAnswerOptionClick = (option) => {
    setSelectedOption(option); // Set the selected option
    if (option.isCorrect) {
      setScore(score + 1);
    }

    setTimeout(() => { // Delay to show color before moving to next question
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);
        setSelectedOption(null); // Reset for next question
      } else {
        setShowScore(true);
      }
    }, 1000);
  };

  return (
    <div className="app">
      {questions.length > 0 ? (
        showScore ? (
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
                <button 
                  key={option.id}
                  onClick={() => handleAnswerOptionClick(option)}
                  style={{
                    backgroundColor: selectedOption === option ? (option.isCorrect ? 'green' : 'red') : '#007BFF',
                    color: 'white'
                  }}
                >
                  {option.text}
                </button>
              ))}
            </div>
          </div>
        )
      ) : (
        <p>Loading questions...</p>
      )}
    </div>
  );
}

export default App;
