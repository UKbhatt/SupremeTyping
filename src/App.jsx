import Navbar from "./components/Navbar";
import TypingBox from "./components/typingSpace";
import getWords from "./utilities/getWords";
import useTyping from "./hooks/useTyping";
import "./App.css";

const words = getWords(10);

export default function App() {
  const typingState = useTyping(words);

  return (
    <div className="min-h-screen flex flex-col font-mono bg-slate-800 text-yellow-500">
        <Navbar />
      <TypingBox words={words} state={typingState} />
    </div>
  );
}
