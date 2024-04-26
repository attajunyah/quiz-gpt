import React, { useState, useEffect } from 'react';
import './App.css';
import CircularTimer from './components/CircularTimer';

function shuffleArray(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
}

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetch('questions.json')
      .then(res => res.json())
      .then(data => {
        shuffleArray(data);
        setQuestions(data);
      })
      .catch(error => console.error('Error fetching questions:', error));
  }, []);

  const handleNextQuestion = () => {
    setSelectedOption(null);
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const generateShapes = () => {
    const shapes = ["circle", "square", "triangle"];
    return [...Array(10)].map((_, idx) => ({
      id: idx,
      type: shapes[Math.floor(Math.random() * shapes.length)],
      size: `${Math.random() * (50 - 20) + 20}px`, // Random size between 20px and 50px
      opacity: Math.random(), // Random opacity between 0 and 1
      delay: `${Math.random() * 5}s`, // Random delay between 0s and 5s
      xEnd: `${Math.random() > 0.5 ? '' : '-'}${100 + Math.random() * 100}vw`, // Random end position on X axis
      yEnd: `${Math.random() > 0.5 ? '' : '-'}${100 + Math.random() * 100}vh` // Random end position on Y axis
    }));
  };

  return (
    <div className="app">
      {generateShapes().map(shape => (
        <div
          key={shape.id}
          className="shape"
          style={{
            '--size': shape.size,
            '--opacity': shape.opacity,
            '--animation-delay': shape.delay,
            '--x-end': shape.xEnd,
            '--y-end': shape.yEnd,
            '--border-radius': shape.type === "circle" ? "50%" : (shape.type === "square" ? "0%" : "50%"),
            'clip-path': shape.type === "triangle" ? "polygon(50% 0%, 0% 100%, 100% 100%)" : "none"
          }}
        ></div>
      ))}
      {questions.length > 0 ? (
        showScore ? (
          <div className="score-section">
            You scored {score} out of {questions.length}
          </div>
        ) : (
          <div className="question-section">
            <CircularTimer duration={5} onComplete={handleNextQuestion} />
            <div className="question-count">
              <span>Question {currentQuestion + 1}</span>/{questions.length}
            </div>
            <div className="question-text">{questions[currentQuestion].text}</div>
            <div className="answer-section">
              {questions[currentQuestion].options.map(option => (
                <button
                  key={option.id}
                  onClick={() => {
                    setSelectedOption(option);
                    if (option.isCorrect) setScore(score + 1);
                    setTimeout(handleNextQuestion, 1000);
                  }}
                  style={{
                    backgroundColor: selectedOption === option ? (option.isCorrect ? 'green' : 'red') : '#007BFF',
                    color: 'white',
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
