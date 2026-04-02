import React, { useContext, useState } from 'react'
import assets from '../assets/assets'
import { AuthContext } from '../../context/AuthContext'

const LoginPage = () => {
  const [currState, setCurrState] = useState("Sign up")
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [bio, setBio] = useState("")
  const [isDataSubmitted, setIsDataSubmitted] = useState(false)

  const { login } = useContext(AuthContext)

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (currState === "Sign up" && !isDataSubmitted) {
      setIsDataSubmitted(true)
      return;
    }

    login(currState === "Sign up" ? 'signup' : 'login', {
      fullName, email, password, bio
    })
  }

  return (
    <div className="min-h-screen w-full bg-black flex items-center justify-center gap-12 max-sm:flex-col relative overflow-hidden px-4">

      {/* Purple Glow */}
      <div className="absolute top-24 left-10 w-[450px] h-[450px] bg-purple-600/40 blur-[150px] rounded-full"></div>

      {/* LEFT SIDE — correct small logo */}
      <div className="z-10 flex flex-col items-center">
        <img src={assets.logo} className="w-28 sm:w-32" alt="" />
        <h1 className="text-white text-4xl font-semibold mt-4">QuickChat</h1>
      </div>

      {/* RIGHT SIDE FORM */}
      <form 
        onSubmit={onSubmitHandler}
        className="z-10 w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl shadow-xl text-white"
      >
        <div className="flex justify-between mb-6">
          <h2 className="text-3xl font-semibold">{currState}</h2>
          {isDataSubmitted && (
            <img 
              src={assets.arrow_icon}
              className="w-5 cursor-pointer"
              onClick={() => setIsDataSubmitted(false)}
            />
          )}
        </div>

        {currState === "Sign up" && !isDataSubmitted && (
          <input 
            type="text"
            value={fullName}
            onChange={(e)=>setFullName(e.target.value)}
            placeholder="Full Name"
            required
            className="w-full p-3 mb-4 bg-white/10 border border-white/30 rounded-lg placeholder-white/60 outline-none"
          />
        )}

        {!isDataSubmitted && (
          <>
            <input 
              type="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              placeholder="Email Address"
              required
              className="w-full p-3 mb-4 bg-white/10 border border-white/30 rounded-lg placeholder-white/60 outline-none"
            />
            <input 
              type="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full p-3 mb-4 bg-white/10 border border-white/30 rounded-lg placeholder-white/60 outline-none"
            />
          </>
        )}

        {currState === "Sign up" && isDataSubmitted && (
          <textarea 
            rows={4}
            value={bio}
            onChange={(e)=>setBio(e.target.value)}
            placeholder="Provide a short bio..."
            required
            className="w-full p-3 mb-4 bg-white/10 border border-white/30 rounded-lg placeholder-white/60 outline-none resize-none"
          ></textarea>
        )}

        <button 
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-purple-500 to-violet-600 rounded-lg font-semibold hover:scale-105 transition"
        >
          {currState === "Sign up" ? "Create Account" : "Login Now"}
        </button>

        <div className="flex gap-2 mt-4 text-white/70 text-sm">
          <input type="checkbox" />
          <p>Agree to the terms of use & privacy and policy.</p>
        </div>

        <div className="mt-3 text-sm text-white/70">
          {currState === "Sign up" ? (
            <p>Already have an account?
              <span 
                onClick={()=>{
                  setCurrState("Login");
                  setIsDataSubmitted(false)
                }} 
                className="text-purple-300 ml-1 cursor-pointer"
              >
                Login here
              </span>
            </p>
          ) : (
            <p>Create an account
              <span 
                onClick={()=>setCurrState("Sign up")} 
                className="text-purple-300 ml-1 cursor-pointer"
              >
                Click here
              </span>
            </p>
          )}
        </div>

      </form>
    </div>
  )
}

export default LoginPage
