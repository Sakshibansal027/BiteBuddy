import React from 'react'
import { useState } from 'react';
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { setUserData } from "../redux/user.slice.js";
import serverUrl from '../../config.js';
import axios from 'axios';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../firebase.js';
import { ClipLoader } from 'react-spinners';
import { useDispatch } from 'react-redux';
function SignIn() {
    const primaryColor = "#ff4d2d";
    const bgColor = "#ff4c2d14";
    const borderColor = "#ddd";
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [err, setErr] = useState("")
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    const handleSignIn = async () => {
        setLoading(true)
        try {
            const result = await axios.post(`${serverUrl}/api/auth/signin`, {
                email, password
            }, { withCredentials: true });
            console.log(result);
            console.log(result.data);
            console.log(serverUrl)
            dispatch(setUserData(result.data))
            setErr("")
            setLoading(false)
            navigate("/")
        } catch (error) {
            setErr(error?.response?.data?.message)
            setLoading(false)
        }
    }
    const handleGoogleAuth = async () => {
        try {
            const provider = new GoogleAuthProvider()
            const result = await signInWithPopup(auth, provider)
            const { data } = await axios.post(`${serverUrl}/api/auth/google-auth`, {
                email: result.user.email,
            }, { withCredentials: true })
            dispatch(setUserData(data))
            setErr("")
            navigate("/")
        } catch (error) {
            setErr(error?.response?.data?.message)
        }
    }
    return (
        <div className='min-h-screen w-full flex items-center justify-center p-4 overflow-y-auto' style={{ backgroundColor: bgColor }}>
            <div className={`bg-white rounded-xl shadow-lg w-full max-w-md px-8 py-8`}
                style={{ border: `1px solid ${borderColor}` }}>
                <h1 className="text-2xl font-bold text-center mb-2" style={{ color: primaryColor }}>BiteBuddy</h1>
                <p className='text-gray-600 mb-8'>Sign In to your account to get started with delicious food deliveries.</p>



                {/*Email*/}
                <div className='mb-4'>
                    <label htmlFor="email" className='block text-gray-700 font-medium mb-1'>Email</label>
                    <input type="email" className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500' placeholder='Enter Your Email' value={email} required onChange={(e) => setEmail(e.target.value)} />
                </div>



                {/*Password*/}
                <div className='mb-4'>
                    <label htmlFor="password" className='block text-gray-700 font-medium mb-1'>Password</label>
                    <div className='relative'>
                        <input type={showPassword ? "text" : "password"} className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500' placeholder='Enter Your Password' value={password} required onChange={(e) => setPassword(e.target.value)} />
                        <button
                            type="button" className='absolute right-3 top-3 text-gray cursor-pointer' onClick={() => setShowPassword(prev => !prev)}>{showPassword ? <FaRegEyeSlash /> : <FaRegEye />} </button>
                    </div>

                </div>
                <div className='text-right text-sm text-gray-600 mt-2 mb-1 cursor-pointer' onClick={() => navigate("/forgot-password")}>Forgot Password ?</div>


                <button
                    className="w-full mt-5 flex items-center justify-center gap-2 
  border rounded-lg px-4 py-2 cursor-pointer
  bg-[#ff4d2d] hover:bg-[#e64323]
  text-white border-[#ff4d2d]
  transition duration-200"
                    onClick={handleSignIn}
                    disabled={loading}
                >
                    {loading ? <ClipLoader size={20} color="#fff" /> : "Sign In"}
                </button>

                {err && <p className='text-red-500 text-center my-2.5'>*{err}</p>}
                <span className='flex items-center justify-center'><h1>or</h1></span>
                <button className='w-full flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 border-gray-400 hover:border-gray-300 cursor-pointer' onClick={handleGoogleAuth}><FcGoogle size={20} /> <span>Sign in with Google</span></button>
                <p className='text-center mt-6' onClick={() => navigate("/signup")}>Want to create a new account ?<span className='text-[#ff4d2d] cursor-pointer'> Sign Up </span></p>
            </div>

        </div>
    )
}

export default SignIn