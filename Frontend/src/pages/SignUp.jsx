import React from 'react'
import { useState } from 'react';
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from 'react-router';
import { auth } from '../../firebase.js';
import serverUrl from '../../config.js';
import axios from 'axios';
import { ClipLoader } from "react-spinners"

import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/user.slice.js';
function SignUp() {
    const primaryColor = "#ff4d2d";
    const bgColor = "#ff4c2d14";
    const borderColor = "#ddd";
    const [showPassword, setShowPassword] = useState(false)
    const [role, setRole] = useState("user")
    const navigate = useNavigate()
    const [fullname, setFullname] = useState("")
    const [email, setEmail] = useState("")
    const [mobile, setMobile] = useState("")
    const [password, setPassword] = useState("")
    const [err, setErr] = useState("")
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    const handleSignUp = async () => {
        if (!fullname || !email || !mobile || !password) {
            setErr("All fields are required")
            setLoading(false)
            return
        }
        setLoading(true)
        try {
            const result = await axios.post(`${serverUrl}/api/auth/signup`, {
                fullname, email, password, mobile, role
            }, { withCredentials: true })
            dispatch(setUserData(result.data))
            setErr("")
            navigate("/")
            setLoading(false)
        } catch (error) {
            setErr(error?.response?.data?.message)
            setLoading(false)
        }
    }
    const handleGoogleAuth = async () => {
        if (!mobile) {
            return setErr("Please enter your contact number before signing up with Google.")
        }
        setLoading(true)
        try {
            const provider = new GoogleAuthProvider()
            const result = await signInWithPopup(auth, provider)
            const { data } = await axios.post(`${serverUrl}/api/auth/google-auth`, {
                fullname: result.user.displayName,
                email: result.user.email,
                role,
                mobile
            }, { withCredentials: true })
            dispatch(setUserData(data))
            setErr("")
            navigate("/")
        } catch (error) {
            setErr(error?.response?.data?.message)
            setLoading(false)
        }
    }
    return (
        <div className='min-h-screen w-full flex items-center justify-center p-4 overflow-y-auto' style={{ backgroundColor: bgColor }}>
            <div className={`bg-white rounded-xl shadow-lg w-full max-w-md px-8 py-8 `}
                style={{ border: `1px solid ${borderColor}` }}>
                <h1 className="text-2xl font-bold text-center mb-2" style={{ color: primaryColor }}>BiteBuddy</h1>
                <p className='text-gray-600 mb-8'>Create your account to get started with delicious food deliveries.</p>

                {/*fullName*/}
                <div className='mb-4'>
                    <label htmlFor="fullname" className='block text-gray-700 font-medium mb-1'>Full Name</label>
                    <input type="text" className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500' placeholder='Enter Your Full Name' required value={fullname} onChange={(e) => setFullname(e.target.value)} />
                </div>
                {/*Email*/}
                <div className='mb-4'>
                    <label htmlFor="email" className='block text-gray-700 font-medium mb-1'>Email</label>
                    <input type="email" className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500' placeholder='Enter Your Email' value={email} required onChange={(e) => setEmail(e.target.value)} />
                </div>
                {/*Mobile No.*/}
                <div className='mb-4'>
                    <label htmlFor="mobile" className='block text-gray-700 font-medium mb-1'>Contact No.</label>
                    <input type="tel" className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500' placeholder='Enter Your Contact Number' value={mobile} required onChange={(e) => setMobile(e.target.value)} />
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
                {/*role*/}
                <div className='mb-4'>
                    <label htmlFor="role" className='block text-gray-700 font-medium mb-1'>Role</label>
                    <div className='flex gap-2'>
                        {["user", "owner", "deliveryboy"].map((r) => (
                            <button key={r} className='flex-1 border rounded-lg px-3 py-2 text-center font-medium transition-colors cursor-pointer'
                                onClick={() => setRole(r)}
                                style={
                                    role === r ? { backgroundColor: primaryColor, color: "white" } : { border: `1px solid ${primaryColor}`, color: primaryColor }
                                }>{r}</button>
                        ))}

                    </div>

                </div>

                <button
                    className="w-full mt-8 flex items-center justify-center gap-2 
  border rounded-lg px-4 py-2 cursor-pointer
  bg-[#ff4d2d] hover:bg-[#e64323]
  text-white border-[#ff4d2d]
  transition duration-200"
                    onClick={handleSignUp}
                    disabled={loading}
                >
                    {loading ? <ClipLoader size={20} color="#fff" /> : "Sign Up"}
                </button>
                {err && <p className='text-red-500 text-center my-2.5'>*{err}</p>}


                <span className='flex items-center justify-center'><h1>or</h1></span>
                <button className='w-full flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 border-gray-400 hover:border-gray-300 cursor-pointer' onClick={handleGoogleAuth}><FcGoogle size={20} /><span>Sign up with Google</span></button>
                <p className='text-center mt-6' onClick={() => navigate("/signin")}>Already have an account ?<span className='text-[#ff4d2d] cursor-pointer'> Sign In </span></p>
            </div>

        </div>
    )
}

export default SignUp
