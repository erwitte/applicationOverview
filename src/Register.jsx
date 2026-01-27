import ActionButton from "./components/ActionButton"
import { useState } from "react";

function Register(){
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPasswort] = useState("");

    const register = () => {
        console.log(password === confirmedPassword);
    }

    return (
        <>
            <div className="w-full max-w-md bg-slate-200 border border-slate-800 p-8 rounded-2xl shadow-2xl flex items-center justify-center flex-col">
                <span>Username: </span> <input className="border border-black-200 rounded" type="text" placeholder="username..."></input>
                <span>Password: </span> <input 
                                        className="border border-black-200 rounded" 
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}></input>
                <span>repeat Password: </span> <input 
                                                className="border border-black-200 rounded" 
                                                type="password"
                                                value={confirmedPassword}
                                                onChange={(e) => setConfirmedPasswort(e.target.value)}></input>
                <div className="flex gap-4 p-4">
                    <ActionButton onClick={() => {register()}}>Register</ActionButton>
                </div>
            </div>
        </>
    )
}

export default Register