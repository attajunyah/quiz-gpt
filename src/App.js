import React, { useState, useEffect } from 'react';
import './App.css';
import Configuration from './components/Configuration';
import Quiz from './components/Quiz';

function App() {
  const [setup, setSetup] = useState({ start: false, numQuestions: 0, countdownTime: 0 });
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch('questions1.json')
      .then(res => res.json())
      .then(data => {
        setQuestions(data);
      })
      .catch(error => console.error('Error fetching questions:', error));
  }, []);

  const handleStartQuiz = (numQuestions, countdownTime) => {
    setSetup({ start: true, numQuestions, countdownTime });
  };

  const handleRestartQuiz = () => {
    setSetup({ start: false, numQuestions: 0, countdownTime: 0 });
  };

  return (
    <div className="app">
      {!setup.start ? (
        <Configuration onStartQuiz={handleStartQuiz} />
      ) : (
        <Quiz
          questions={questions.slice(0, setup.numQuestions)}
          numQuestions={setup.numQuestions}
          countdownTime={setup.countdownTime}
          onRestartQuiz={handleRestartQuiz}
        />
      )}
    </div>
  );
}

export default App;
