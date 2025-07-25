import Setupbar from "./components/setupbar";
import Navbar from "./components/navbar";
import "./App.css";


export default function App() {
  return (
    <div className="h-screen font-mono  text-yellow-500" style={{ backgroundColor: "#161A23" }}>
      <Navbar />
      <Setupbar className="top-20" />
    </div>

  );
}
