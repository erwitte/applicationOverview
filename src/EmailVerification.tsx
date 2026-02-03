import ActionButton from "./components/ActionButton";
import { confirmSignUp } from 'aws-amplify/auth';
import { useState } from "react";

function EmailVerification(){
    const [code, setCode] = useState("");
    const email = localStorage.getItem("verify_email");
    
    async function confirmUserSignUp() {
      if (!email){
      return;
    }
    const { nextStep } = await confirmSignUp({
    username: email,
    confirmationCode: code,
  });

  return nextStep;
}

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