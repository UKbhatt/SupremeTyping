import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

export default function TypingBox({ words, state, OnRestart }) {
  const {
    typedText,
    currentIndex,
    timeRemaining,
    wpm,
    handleKeyDown,
  } = state;

  const typingBoxRef = useRef(null);

  useEffect(() => {
    if (typingBoxRef.current) {
      typingBoxRef.current.focus();
    }
  }, []);

const handleCtrlEnter = (e) => {
  // console.log("Key Pressed:", e.key, "Ctrl:", e.ctrlKey); 

  if (e.ctrlKey && e.key === "Enter") {
    // console.log("Ctrl+Enter pressed");
    OnRestart();
  } else if (timeRemaining !== 0) {
    handleKeyDown(e);
  }
};

  return (
    <div
      className="flex items-center justify-center h-screen outline-none"
      tabIndex={0}
      onKeyDown={handleCtrlEnter}
      onClick={() => typingBoxRef.current?.focus()}
      ref={typingBoxRef}
    >
      {timeRemaining === 0 ? (
        <motion.div
          className="text-center space-y-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="alert alert-success shadow-lg w-fit mx-auto">
            <span className="text-3xl font-semibold">⏱ Time’s up!</span>
          </div>
          <div className="text-3xl font-bold text-white">
            Your speed: <span className="text-yellow-400">{wpm} WPM</span>
          </div>
          <button
            onClick={OnRestart}
            className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-md font-semibold mt-4"
          >
            Restart (Ctrl + Enter)
          </button>
        </motion.div>
      ) : (
        <motion.div
          className="relative w-full max-w-3xl "
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ color: "#7F8692" }}
        >
          <div className="absolute top-4 left-4">
            <motion.div
              className="badge badge-primary badge-lg text-sm md:text-lg p-3"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Time Remaining: {timeRemaining}s
            </motion.div>
          </div>

          <div className="text-xl md:text-3xl leading-relaxed text-center mt-12 md:mt-20 px-4 font-mono break-words">
            {words.split("").map((char, i) => {
              const isCorrect = typedText[i] === char;
              const isTyped = i < typedText.length;
              const isCursor = i === currentIndex;

              return (
                <span
                  key={i}
                  className={`transition-all duration-75 ${isCursor ? "underline decoration-yellow-400" : ""
                    } ${isTyped
                      ? isCorrect
                        ? "text-green-400"
                        : "text-red-400"
                      : ""
                    }`}
                >
                  {char}
                </span>
              );
            })}
          </div>
        </motion.div>
      )}
    </div>
  );
}
