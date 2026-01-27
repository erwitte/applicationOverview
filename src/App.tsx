import Login from './Login';
import Register from './Register';
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
                          <Route path="/register" element={<Register />} />
                        </Routes>
      </div>
    </BrowserRouter>
    </>
  )
}

export default App
