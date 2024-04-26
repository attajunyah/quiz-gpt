import React, { useState, useEffect } from 'react';
import './App.css';
import CircularTimer from './components/CircularTimer'; // Ensure you import the timer component

function shuffleArray(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
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
        shuffleArray(data);  // Shuffle the questions before setting them to state
        setQuestions(data);
      })
      .catch(error => {
        console.error('Error fetching questions:', error);
      });
  }, []);

  const handleNextQuestion = () => {
    setSelectedOption(null); // Reset the selected option
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
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
