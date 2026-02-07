import ActionButton from "./components/ActionButton";
import { confirmSignUp } from 'aws-amplify/auth';
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function EmailVerification(){
    const navigate = useNavigate();
    const [code, setCode] = useState("");
    const email = localStorage.getItem("verify_email");
    
    async function confirmUserSignUp() {
      if (!email){
      return;
    }
    try{
    await confirmSignUp({
    username: email,
    confirmationCode: code,
    })
      navigate("/index");
    }catch(e){
      navigate("/");
      console.log("falsch")
    }
  };


    return (
    <div className="w-full max-w-md bg-slate-200 border border-slate-800 p-8 rounded-2xl shadow-2xl">
      <form className="flex flex-col gap-4">

        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium">Verification Code</span>
          <input
            className="border rounded px-3 py-2"
            type="text"
            onChange={(e) => setCode(e.target.value)}
          />
          <ActionButton onClick={ confirmUserSignUp }>Verify</ActionButton>
        </label>
      </form>
    </div>
  );
}

export default EmailVerification