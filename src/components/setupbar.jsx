import { useState } from "react";
import TypingBox from "./typingSpace";
import useTyping from "../hooks/useTyping";
import getWords from "../utilities/getWords";

export default function Setupbar() {
    const [wordCount, setWordCount] = useState(30); 
    const [words, setWords] = useState(getWords(wordCount));
    const [showDivWord, setShowDivWord] = useState(false);
    const [showDivTime, setShowDivTime] = useState(false);
    const [timer, setTimer] = useState(10);

    const typingState = useTyping(words, timer);

    const handleRestart = (newCount) => {
        const count = newCount || wordCount;
        const newWords = getWords(count);
        setWords(newWords);
        typingState.reset(newWords);
        setWordCount(count); 
    };

    const handleTimeChange = (newTime) => {
        typingState.reset(words);
        setTimer(newTime);
        typingState.updateTimer(newTime);
    };

    return (
        <>
            <div className="flex justify-center items-start">
                <div className="flex gap-5 fixed text-white text-sm h-10 px-6 py-4 rounded-xl items-center shadow-lg top-20 bg-slate-500 w-auto">
                    <p
                        onClick={() => setShowDivWord(!showDivWord)}
                        className="cursor-pointer hover:text-yellow-400 transition duration-200">
                        Text
                    </p>
                    <p
                        onClick={() => setShowDivTime(!showDivTime)}
                        className="cursor-pointer hover:text-yellow-400 transition duration-200">
                        Time
                    </p>

                    {showDivWord && (
                        <div className="flex flex-row gap-5">
                            <div className="bg-slate-400 w-1 h-5"></div>
                            <p onClick={() => handleRestart(40)}
                                className="cursor-pointer hover:text-yellow-400 transition duration-200">40</p>
                            <p onClick={() => handleRestart(45)}
                                className="cursor-pointer hover:text-yellow-400 transition duration-200">45</p>
                            <p onClick={() => handleRestart(50)}
                                className="cursor-pointer hover:text-yellow-400 transition duration-200">50</p>
                        </div>
                    )}

                    {showDivTime && (
                        <div className="flex flex-row gap-5">
                            <div className="bg-slate-400 w-1 h-5"></div>
                            <p onClick={() => handleTimeChange(20)}
                                className="cursor-pointer hover:text-yellow-400 transition duration-200">20s</p>
                            <p onClick={() => handleTimeChange(25)}
                                className="cursor-pointer hover:text-yellow-400 transition duration-200">25s</p>
                            <p onClick={() => handleTimeChange(30)}
                                className="cursor-pointer hover:text-yellow-400 transition duration-200">30s</p>
                        </div>
                    )}
                </div>
            </div>

            <TypingBox words={words} state={typingState} OnRestart={handleRestart} />
        </>
    );
}