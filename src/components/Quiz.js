import React, { useState, useEffect } from 'react';
import CircularTimer from './CircularTimer';

function Quiz({ questions, numQuestions, countdownTime, onRestartQuiz }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);

  const handleNextQuestion = () => {
    setSelectedOption(null);
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  return (
    <div className="quiz">
      {showScore ? (
        <div className="score-section">
          <h1>You scored {score} out of {numQuestions}</h1>
          <button onClick={onRestartQuiz}>Restart Quiz</button>
        </div>
      ) : (
        <div className="question-section">
          <CircularTimer duration={countdownTime} onComplete={handleNextQuestion} />
          <div className="question-count">
            <span>Question {currentQuestion + 1}</span>/{numQuestions}
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
      )}
    </div>
  );
}

export default Quiz;
