import React from 'react'
import { useSelector } from 'react-redux'
import DeliverBoy from '../components/DeliverBoy'
import OwnerDashboard from '../components/OwnerDashboard'
import UserDashboard from '../components/UserDashboard'


function Home() {
    const { userData } = useSelector(state => state.user)
    console.log("userData:", userData);
console.log("role:", userData?.role);
    return (
        <div className='w-screen min-h-screen flex flex-col items-center bg-[#fff9f6]'>
            {userData?.role === "user" && <UserDashboard />}
            {userData?.role === "owner" && <OwnerDashboard />}
            {userData?.role === "deliveryboy" && <DeliverBoy />}
        </div>
    )
}

export default Home