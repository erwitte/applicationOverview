import ActionButton from "./components/ActionButton";
import { useNavigate } from 'react-router-dom';
import { signIn } from 'aws-amplify/auth';
import { useEffect, useState } from "react";
import { useAuth } from "./services/AuthContext";

function Login(){
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const { checkUser, user } = useAuth();

    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate("/index");
        }
    }, [user, navigate]);

    const handleLogIn = async () => {
        try {
            const { isSignedIn, nextStep } = await signIn({
                username: email,
                password: password,
            });

            if (isSignedIn) {
                await checkUser();
            } else {
                console.log("Login not complete. Next step:", nextStep);
            }
        } catch (error) {
        console.error("Login failed:", error);
        }
    }

    return (
        <>
            <div className="w-full max-w-md bg-slate-200 border border-slate-800 p-8 rounded-2xl shadow-2xl flex items-center justify-center flex-col">
                <span>E-Mail: </span> <input className="border border-black-200 rounded" type="text" placeholder="E-Mail..."
                onChange={(e) => setEmail(e.target.value)}></input>
                <span>Password: </span> <input className="border border-black-200 rounded" type="password"
                onChange={(e) => setPassword(e.target.value)}></input>
                <div className="flex gap-4 p-4">
                    <ActionButton onClick={() => handleLogIn()}>Login</ActionButton>
                    <ActionButton onClick={() => navigate("/register")}>Register</ActionButton>
                </div>
            </div>
        </>
    )
}

export default Login