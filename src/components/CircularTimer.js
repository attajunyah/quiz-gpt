import React, { useEffect, useState } from 'react';

const CircularTimer = ({ duration, onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [timeLeft, setTimeLeft] = useState(duration); // Track the remaining time in seconds

    useEffect(() => {
        const startTime = Date.now();
        const interval = setInterval(() => {
            const elapsedTime = Date.now() - startTime;
            const elapsedSeconds = Math.floor(elapsedTime / 1000);
            const updatedProgress = (elapsedTime / (duration * 1000)) * 100;
            setTimeLeft(duration - elapsedSeconds); // Update remaining time

            if (updatedProgress >= 100) {
                clearInterval(interval);
                onComplete();
            } else {
                setProgress(updatedProgress);
            }
        }, 50);

        return () => clearInterval(interval);
    }, [duration, onComplete]);

    const radius = 20;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;

    return (
        <svg width="50" height="50" className="circular-timer">
            <circle
                stroke="deepskyblue"
                fill="transparent"
                strokeWidth="5"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                r={radius}
                cx="25"
                cy="25"
            />
            <text
                x="50%" // Center the text horizontally
                y="50%" // Center the text vertically
                dominantBaseline="middle" // Align the text by its middle
                textAnchor="middle" // Ensure the text is centered horizontally
                fill="#333" // Text color
                fontSize="15" // Text size
            >
                {timeLeft}s
            </text>
        </svg>
    );
};

export default CircularTimer;
