import Navbar from "./components/Navbar";
import TypingBox from "./components/typingSpace";
import getWords from "./utilities/getWords";
import useTyping from "./hooks/useTyping";
import { useState } from "react";
import "./App.css";

const words = getWords(10);

export default function App() {
  const [words, setWords] = useState(getWords(10));
  const typingState = useTyping(words);

  const handleRestart = () => {
    const newWords = getWords(10);
    setWords(newWords);
    typingState.reset(newWords);
  };

  return (
    <div className="min-h-screen h-20 flex flex-col font-mono bg-slate-800 text-yellow-500">
      <div className="h-20">

        <Navbar />
      </div>
      <TypingBox words={words} state={typingState} OnRestart={handleRestart} />
    </div>
  );
}
