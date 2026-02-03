import { useState } from "react";
import ActionButton from "./components/ActionButton";
import { registerUser } from "./services/signUp";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [email, setEmail] = useState("");

  const register = async () => {
    if (password !== confirmedPassword) {
      setPasswordError("Passwords don't match");
      return;
    }
    navigate("/verification");
    await registerUser({email,password});
    
    setPasswordError("");
  };

  return (
    <div className="w-full max-w-md bg-slate-200 border border-slate-800 p-8 rounded-2xl shadow-2xl">
      <form className="flex flex-col gap-4">
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium">Username</span>
          <input
            className="border rounded px-3 py-2"
            type="text"
            placeholder="username..."
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium">Password</span>
          <input
            className="border rounded px-3 py-2"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium">Repeat Password</span>
          <input
            className="border rounded px-3 py-2"
            type="password"
            value={confirmedPassword}
            onChange={(e) => setConfirmedPassword(e.target.value)}
          />
        </label>

        {passwordError && (
          <p className="text-red-600 text-sm">{passwordError}</p>
        )}

        <ActionButton onClick={register}>Register</ActionButton>
      </form>
    </div>
  );
}

export default Register;
