import { useState, useEffect } from "react";

export default function useTyping(initialText, duration) {
    const [text, setText] = useState(initialText);
    const [typedText, setTypedText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [correctChars, setCorrectChars] = useState(0);
    const [timeRemaining, setTimeRemaining] = useState(duration);
    const [isRunning, setIsRunning] = useState(false);

    const updateTimer = (newTime) => {
        if (newTime >= 0) setTimeRemaining(newTime);
    };

    const handleKeyDown = (e) => {
        const key = e.key;
        if (timeRemaining === 0) return; 

        if (!isRunning) setIsRunning(true);

        if (key.length === 1 || key === " ") {
            setTypedText((prev) => prev + key);
            setCurrentIndex((i) => i + 1);

            if (key === text[currentIndex]) {
                setCorrectChars((count) => count + 1);
            }
        } else if (key === "Backspace") {
            setTypedText((prev) => prev.slice(0, -1));
            setCurrentIndex((i) => Math.max(i - 1, 0));
        }

        e.preventDefault();
    };

    useEffect(() => {
        if (!isRunning || timeRemaining === 0) return;
        const timerId = setInterval(() => {
            setTimeRemaining((t) => {
                if (t <= 1) {
                    setIsRunning(false);
                    return 0;
                }
                return t - 1;
            });
        }, 1000);
        return () => clearInterval(timerId);
    }, [isRunning, timeRemaining]);

    const reset = (newText) => {
        setText(newText);
        setTypedText("");
        setCurrentIndex(0);
        setCorrectChars(0);
        setTimeRemaining(duration);
        setIsRunning(false);
    };

    const wpm = timeRemaining === 0
        ? Math.round((correctChars / 5) / (duration / 60))
        : 0;

    return {
        typedText,
        currentIndex,
        timeRemaining,
        isRunning,
        correctChars,
        text,
        wpm,
        handleKeyDown,
        reset,
        updateTimer,
    };
}
