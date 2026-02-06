import Login from './Login';
import Register from './Register';
import { AuthProvider } from './services/AuthContext';
import ProtectedRoute from './services/ProtectedRoute';
import EmailVerification from "./EmailVerification";
import Index from "./Index";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
    <AuthProvider>
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
                          <Route path="/verification"element={<EmailVerification />} />
                          <Route element={<ProtectedRoute />}>
                          <Route path="/index" element={<Index />} />
                          </Route>

                        </Routes>
      </div>
    </BrowserRouter>
    </AuthProvider>
    </>
  )
}

export default App
