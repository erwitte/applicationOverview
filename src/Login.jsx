function Login(){
    return (
        <>
            <div className="w-full max-w-md bg-slate-200 border border-slate-800 p-8 rounded-2xl shadow-2xl flex items-center justify-center flex-col">
                <span>Username: </span> <input className="border border-black-200 rounded" type="text" placeholder="username..."></input>
                <span>Password: </span> <input className="border border-black-200 rounded" type="password"></input>
                <button className="border border-black-200 cursor-pointer rounded mt-5 p-1 bg-slate-400">Login</button>
            </div>
        </>
    )
}

export default Login