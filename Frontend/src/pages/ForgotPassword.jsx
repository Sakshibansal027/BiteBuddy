import React from 'react'
import { useState } from 'react'
import serverUrl  from '../../config.js';
import axios from 'axios'
import { IoIosArrowRoundBack } from "react-icons/io";
import { ClipLoader } from 'react-spinners';
import { useNavigate } from 'react-router';
function ForgotPassword() {
    const [step, setStep] = useState(1)
    const [otp, setOtp] = useState("")
    const [email, setEmail] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const[err,setErr]=useState("")
    const[loading,setLoading]=useState(false)
    const navigate = useNavigate();
   const handleSendOtp = async () => {
    setLoading(true)
    try {
        console.log("EMAIL:", email)

        const result = await axios.post(
            `${serverUrl}/api/auth/send-otp`,
            { email },
            { withCredentials: true }
            
        )
        console.log(result)
        setErr("")
        setLoading(false)
        setStep(2)
    } catch (error) {
        setErr(error?.response?.data?.message)
        setLoading(false)
    }
}

    const handleVerifyOtp = async () => {
        setLoading(true)
        try {
            const result = await axios.post(`${serverUrl}/api/auth/verify-otp`, { email, otp }, { withCredentials: true })
            console.log(result)
            setErr("")
            setLoading(false)
            setStep(3)
        } catch (error) {
setErr(error?.response?.data?.message)
                setLoading(false)
        }
    }

    const handleResetPassword = async () => {
        setLoading(true)
        if (newPassword != confirmPassword) { return null; }
        try {
            const result = await axios.post(`${serverUrl}/api/auth/reset-password`, { email, newPassword }, { withCredentials: true })
            console.log(result)
            setErr("")
            navigate("/signin")
                setLoading(false)
        } catch (error) {
            setErr(error?.response?.data?.message)
                setLoading(false)
        }
    }

    return (
        <div className='flex w-full items-center justify-center min-h-screen p-4 bg-[#ff4c2d14]'>
            <div className='bg-white rounded-xl shadow-lg w-full max-w-md p-8'>
                <div className='flex items-center gap-4 mb-4'>
                    <IoIosArrowRoundBack size={30} className='text-[#ff4d2d] cursor-pointer' onClick={() => navigate("/signin")} />
                    <h1 className='text-2xl text-center font-bold text-[#ff4d2d]'>
                        Forgot Password
                    </h1>
                </div>
                {step == 1
                    &&
                    <div>
                        <div className='mb-4'>
                            <label htmlFor="email" className='block text-gray-700 font-medium mb-1'>Email</label>
                            <input type="email" className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500' placeholder='Enter Your Email' value={email} required  onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <button
                            className="w-full mt-5 flex items-center justify-center gap-2 
             border rounded-lg px-4 py-2 cursor-pointer
             bg-[#ff4d2d] hover:bg-[#e64323]
             text-white border-[#ff4d2d]
             transition duration-200"
                            onClick={handleSendOtp} disabled={loading} >
                            {loading ? <ClipLoader size={20} color="#fff" /> : "Send OTP"}
                        </button>
                        {err && <p className='text-red-500 text-center my-2.5'>*{err}</p>}
                    </div>
                }


                {step == 2
                    &&
                    <div>
                        <div className='mb-4'>
                            <label htmlFor="otp" className='block text-gray-700 font-medium mb-1'>OTP</label>
                            <input type="text" className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500' placeholder='Enter OTP' value={otp} required onChange={(e) => setOtp(e.target.value.trim())} />
                        </div>
                        <button
                            className="w-full mt-5 flex items-center justify-center gap-2 
                                    border rounded-lg px-4 py-2 cursor-pointer
                                    bg-[#ff4d2d] hover:bg-[#e64323]
                                    text-white border-[#ff4d2d]
                                    transition duration-200"
                            onClick={handleVerifyOtp} disabled={loading} >
                            {loading ? <ClipLoader size={20} color="#fff" /> : "Verify"}
                        </button>
                        {err && <p className='text-red-500 text-center my-2.5'>*{err}</p>}
                    </div>
                }




                {step == 3
                    &&
                    <div>
                        <div className='mb-4'>
                            <label htmlFor="password" className='block text-gray-700 font-medium mb-1'>New Password</label>
                            <input type="password" className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500' placeholder='Enter New Password' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                        </div>
                        <div className='mb-4'>
                            <label htmlFor="confirmPassword" className='block text-gray-700 font-medium mb-1'>Confirm Password</label>
                            <input type="password" className='w-full border rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500' placeholder='Enter Confirm Password' value={confirmPassword} required onChange={(e) => setConfirmPassword(e.target.value)} />
                        </div>
                        <button
                            className="w-full mt-5 flex items-center justify-center gap-2 
                                    border rounded-lg px-4 py-2 cursor-pointer
                                    bg-[#ff4d2d] hover:bg-[#e64323]
                                    text-white border-[#ff4d2d]
                                    transition duration-200"
                            onClick={handleResetPassword} disabled={loading}>
                            {loading ? <ClipLoader size={20} color="#fff" /> : "Reset Password"}
                           
                        </button>
                        {err && <p className='text-red-500 text-center my-2.5'>*{err}</p>}
                    </div>
                }
            </div>
        </div >
    )
}

export default ForgotPassword
