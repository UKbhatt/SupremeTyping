import { useState, useEffect } from "react";

export default function useTyping(targetText, duration = 10) {
  const [typedText, setTypedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctChars, setCorrectChars] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);

  const wpm = timeRemaining === 0
    ? Math.round((correctChars / 5) / (duration / 60))
    : 0;

  const handleKeyDown = (e) => {
    if (!isRunning) setIsRunning(true);
    const key = e.key;

    if (key.length === 1 || key === " ") {
      setTypedText((prev) => prev + key);
      setCurrentIndex((i) => i + 1);
      if (key === targetText[currentIndex]) {
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
    const id = setInterval(() => {
      setTimeRemaining((t) => t - 1);
    }, 1000);
    return () => clearInterval(id);
  }, [isRunning, timeRemaining]);

  return {
    typedText,
    currentIndex,
    correctChars,
    timeRemaining,
    isRunning,
    wpm,
    handleKeyDown,
  };
}
