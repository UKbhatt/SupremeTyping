export default function TypingBox({ words, state }) {
  const {
    typedText,
    currentIndex,
    timeRemaining,
    wpm,
    handleKeyDown,
  } = state;

  return (
    <div
      className="flex-grow grid place-items-center"
      tabIndex={0}
      onKeyDown={timeRemaining === 0 ? () => "" : handleKeyDown}
      ref={(el) => el && el.focus()}
    >
      {timeRemaining === 0 ? (
        <div className="text-center">
          <h2 className="text-3xl text-green-400 font-bold">Time’s up!</h2>
          <p className="text-2xl mt-2">Your speed: <span className="text-yellow-300">{wpm} WPM</span></p>
        </div>
      ) : (
        <>
          <div className="text-2xl">{timeRemaining}s</div>
          <div className="text-xl text-center leading-relaxed">
            {words.split("").map((char, i) => {
              let className = "";
              if (i < typedText.length) {
                className = typedText[i] === char ? "text-green-400" : "text-red-400";
              }
              const isCursor = i === currentIndex;
              return (
                <span key={i} className={`${className} ${isCursor ? "underline" : ""}`}>
                  {char}
                </span>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
