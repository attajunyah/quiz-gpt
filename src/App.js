<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import './App.css';
import Configuration from './components/Configuration';
import Quiz from './components/Quiz';

function App() {
  const [setup, setSetup] = useState({ start: false, numQuestions: 0, countdownTime: 0 });
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch('questions.json')
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
=======
import React, { useState} from 'react';
import './App.css';
import CircularTimer from './components/CircularTimer';

function App() {
    const [topic, setTopic] = useState('');
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);

    const generateQuiz = async () => {
        const response = await fetch('http://localhost:3000/generate-quiz', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ topic }),
        });
        const data = await response.json();
        if (data.questions) {
            setQuestions(data.questions);
            setCurrentQuestion(0);
            setShowScore(false);
            setScore(0);
        }
    };

    const handleNextQuestion = () => {
        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setShowScore(true);
        }
    };

    const handleAnswerOptionClick = (isCorrect) => {
        if (isCorrect) {
            setScore(score + 1);
        }
        setTimeout(handleNextQuestion, 1000); // Move to next question after a delay
    };

    return (
        <div className="app">
            <input
                type="text"
                placeholder="Enter a topic for your quiz"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
            />
            <button onClick={generateQuiz}>Generate Quiz</button>
            {showScore ? (
                <div className="score-section">You scored {score} out of {questions.length}</div>
            ) : (
                questions.length > 0 && (
                    <div className="question-section">
                        <CircularTimer duration={30} onComplete={handleNextQuestion} />
                        <div className="question-count">
                            <span>Question {currentQuestion + 1}</span>/{questions.length}
                        </div>
                        <div className="question-text">{questions[currentQuestion].text}</div>
                        <div className="answer-section">
                            {questions[currentQuestion].options.map((option, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleAnswerOptionClick(option.isCorrect)}
                                    style={{
                                        backgroundColor: option.isCorrect ? 'lightgreen' : 'lightcoral'
                                    }}
                                >
                                    {option.text}
                                </button>
                            ))}
                        </div>
                    </div>
                )
            )}
        </div>
    );
>>>>>>> 2a7b26c (Add new milestone presentation assets)
}

export default App;
