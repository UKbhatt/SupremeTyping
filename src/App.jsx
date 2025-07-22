import Navbar from './components/Navbar'
import { faker } from '@faker-js/faker' 
import './App.css'
function App() {

  const words = faker.random.words(10) ; 
  return (
    <>
      <Navbar />
      <div className="min-h-screen grid place-items-center font-mono tracking-wider bg-slate-800 text-yellow-500">
      {words}
      </div>
    </>
  )
}

export default App
