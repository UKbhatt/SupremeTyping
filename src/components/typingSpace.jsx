import { motion } from "framer-motion";

export default function TypingBox({ words, state, OnRestart }) {
    const {
        typedText,
        currentIndex,
        timeRemaining,
        wpm,
        handleKeyDown,
    } = state;

    const handleCtrlEnter = (e) => {
        if (e.ctrlKey && e.key == "Enter") {
            OnRestart();
        }
        else if (timeRemaining !== 0) {
            handleKeyDown(e);
        }
    }

    return (
        <div
            className="flex-grow flex items-center justify-center px-4"
            tabIndex={0}
            onKeyDown={handleCtrlEnter}
            ref={(el) => el && el.focus()}
        >
            {timeRemaining === 0 ? (
                <motion.div
                    className="text-center space-y-4"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="alert alert-success shadow-lg w-fit mx-auto">
                        <span className="text-2xl font-semibold">⏱ Time’s up!</span>
                    </div>
                    <div className="text-2xl font-semibold">
                        Your speed: <span className="text-yellow-400">{wpm} WPM</span>
                    </div>
                </motion.div>
            ) : (
                <motion.div
                    className="card p-4 w-full max-w-3xl relative"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="absolute top-2 left-2">
                        <motion.div
                            className="badge badge-primary badge-md md:badge-lg"
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            Time Remaining: {timeRemaining}s
                        </motion.div>
                    </div>

                    <div className="text-base md:text-xl text-center leading-relaxed mt-6 md:mt-10 break-words px-7">
                        {words.split("").map((char, i) => {
                            let className = "";
                            if (i < typedText.length) {
                                className = typedText[i] === char ? "text-green-400" : "text-red-400";
                            }
                            const isCursor = i === currentIndex;
                            return (
                                <span
                                    key={i}
                                    className={`${className} ${isCursor ? "underline decoration-yellow-400" : ""}`}>
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
