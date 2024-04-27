import React, { useState } from 'react';

function Configuration({ onStartQuiz }) {
  const [numQuestions, setNumQuestions] = useState(10);
  const [countdownTime, setCountdownTime] = useState(10);

  return (
    <div className="configuration">
      <h1>Setup Your Quiz</h1>
      <label>
        Number of Questions:
        <input type="number" value={numQuestions} onChange={(e) => setNumQuestions(parseInt(e.target.value, 10))} />
      </label>
      <br />
      <label>
        Countdown Time (seconds):
        <input type="number" value={countdownTime} onChange={(e) => setCountdownTime(parseInt(e.target.value, 10))} />
      </label>
      <br />
      <button onClick={() => onStartQuiz(numQuestions, countdownTime)}>Start Quiz</button>
    </div>
  );
}

export default Configuration;
