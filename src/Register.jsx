import ActionButton from "./components/ActionButton"

function Register(){
    return (
        <>
            <div className="w-full max-w-md bg-slate-200 border border-slate-800 p-8 rounded-2xl shadow-2xl flex items-center justify-center flex-col">
                <span>Username: </span> <input className="border border-black-200 rounded" type="text" placeholder="username..."></input>
                <span>Password: </span> <input className="border border-black-200 rounded" type="password"></input>
                <div className="flex gap-4 p-4">
                    <ActionButton>oihejsfäokjafraoksf</ActionButton>
                    <ActionButton>Register</ActionButton>
                </div>
            </div>
        </>
    )
}

export default Register