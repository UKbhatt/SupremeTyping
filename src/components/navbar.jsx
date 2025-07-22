import { PiCrown } from "react-icons/pi";
import { CiMail } from "react-icons/ci";
import { useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";

export default function Navbar() {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="w-full px-6 h-20 flex items-center justify-between bg-slate-800 text-white">
      <div className="flex items-center text-xl gap-2">
        <PiCrown className="text-yellow-300 text-4xl transition-transform duration-200 hover:scale-125" />
        <p>Supreme Typing</p>
      </div>

      <button
        onClick={handleClick}
        disabled={loading}
        className={`btn btn-sm text-white bg-gradient-to-r from-[#333] to-[#555] 
          hover:from-[#444] hover:to-[#666] transition duration-200 ${loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
      >
        {loading ? (
          <>
            <AiOutlineLoading className="animate-spin w-4 h-4" />
            Please wait
          </>
        ) : (
          <>
            <CiMail className="text-lg" />
            Sign In
          </>
        )}
      </button>
    </div>
  );
}
