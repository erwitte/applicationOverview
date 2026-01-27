import Login from './Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <>
    <BrowserRouter>
      <div className="min-h-screen 
                      w-full 
                      bg-slate-950 
                      flex 
                      justify-center 
                      items-center">
                        <Routes>
                          <Route path="/" element={<Login />} />
                        </Routes>
      </div>
    </BrowserRouter>
    </>
  )
}

export default App
