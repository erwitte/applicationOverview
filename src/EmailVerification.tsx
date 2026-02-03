import ActionButton from "./components/ActionButton";

function EmailVerification(){
    return (
    <div className="w-full max-w-md bg-slate-200 border border-slate-800 p-8 rounded-2xl shadow-2xl">
      <form className="flex flex-col gap-4">

        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium">Verification Code</span>
          <input
            className="border rounded px-3 py-2"
            type="text"
          />
          <ActionButton>Verify</ActionButton>
        </label>
      </form>
    </div>
  );
}

export default EmailVerification