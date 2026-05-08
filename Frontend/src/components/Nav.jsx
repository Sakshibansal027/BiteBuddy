import React, { useState } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { IoSearch } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RxCross2 } from "react-icons/rx";
import serverUrl from "../../config";
import { setUserData } from "../redux/user.slice";
import axios from "axios";
import { FaPlus } from "react-icons/fa";
import { FaReceipt } from "react-icons/fa";
import { useNavigate } from "react-router";
function Nav() {
  const { userData, currentCity, cartItems } = useSelector((state) => state.user);
  const { myShopData } = useSelector((state) => state.owner);
  const [showInfo, setShowInfo] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogOut = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/auth/signout`, {
        withCredentials: true,
      });
      dispatch(setUserData(null));

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-20  flex items-center justify-between md:justify-center gap-8 px-5 fixed top-0 z-50 bg-[#fff9f6] overflow-visible">
      {showSearch && userData.role === "user" && (
        <div className="w-[90%] h-17.5 bg-white shadow-xl rounded-lg flex items-center gap-5 fixed top-20 left-[5%] md:hidden">
          <div className="flex items-center w-[30%] overflow-hidden gap-2.5 p-2.5 border-r-2 border-gray-400">
            <FaLocationDot size={25} className="text-[#ff4d2d]" />
            <div className="w-[80%] truncate text-gray-600">{currentCity}</div>
          </div>

          <div className="w-[80%] flex items-center gap-2.5">
            <IoSearch size={25} className="text-[#ff4d2d]" />
            <input
              type="text"
              placeholder="search delicious food..."
              className="px-2.5 text-gray-700 outline-0 w-full"
            ></input>
          </div>
        </div>
      )}
      <h1 className="text-3xl font-bold text-[#ff4d2d]">BiteBuddy</h1>
      {userData.role === "user" && (
        <div className="md:w-[60%] lg:w-[40%] h-17.5 bg-white shadow-xl rounded-lg hidden md:flex items-center gap-5 px-4">
          <div className="flex items-center w-[30%] overflow-hidden gap-2.5 p-2.5 border-r-2 border-gray-400">
            <FaLocationDot size={25} className="text-[#ff4d2d]" />
            <div className="w-[80%] truncate text-gray-600">{currentCity}</div>
          </div>

          <div className="w-[80%] flex items-center gap-2.5">
            <IoSearch size={25} className="text-[#ff4d2d]" />
            <input
              type="text"
              placeholder="search delicious food..."
              className="px-2.5 text-gray-700 outline-0 w-full"
            ></input>
          </div>
        </div>
      )}

      <div className="flex items-center gap-4">
        {userData.role === "user" &&
          (showSearch ? (
            <RxCross2
              size={25}
              className="text-[#ff4d2d] md:hidden"
              onClick={() => setShowSearch(false)}
            />
          ) : (
            <IoSearch
              size={25}
              className="text-[#ff4d2d] md:hidden"
              onClick={() => setShowSearch(true)}
            />
          ))}

        {userData.role === "owner" ? (
          <>
            {myShopData && (
              <>
                <button className="hidden md:flex items-center gap-1 p-2 cursor-pointer  rounded-full bg-[#ff4d2d]/10 text-[#ff4d2d]" onClick={() => navigate("/add-item")}>
                  <FaPlus size={20} />
                  <span>Add Food Items</span>
                </button>
                <button className="flex md:hidden items-center gap-1 p-2 cursor-pointer rounded-full bg-[#ff4d2d]/10 text-[#ff4d2d]" onClick={() => navigate("/add-item")}>
                  <FaPlus size={20} />
                </button>
              </>
            )}

            <div className="md:flex hidden items-center gap-2 cursor-pointer relative px-3 py-1 rounded-lg bg-[#ff4d2d]/10 text-[#ff4d2d] font-medium" onClick={() => navigate("/my-orders")}>
              <FaReceipt size={20} />
              <span>Orders</span>
              <span className="absolute -right-2 -top-2 text-xs  text-white bg-[#ff4d2d] rounded-full px-1.5 py-px">
                0
              </span>
            </div>

            <div className="flex md:hidden items-center gap-2 cursor-pointer relative px-3 py-1 rounded-lg bg-[#ff4d2d]/10 text-[#ff4d2d] font-medium" onClick={() => navigate("/my-orders")}>
              <FaReceipt size={20} />
              <span className="absolute -right-2 -top-2 text-xs  text-white bg-[#ff4d2d] rounded-full px-1.5 py-px">
                0
              </span>
            </div>
          </>
        ) : (
          <>
            <div className="relative cursor-pointer" onClick={() => navigate("/cart")}>
              <FaShoppingCart size={25} className="text-[#ff4d2d]" />
              <span className="absolute -right-2.25 -top-3 text-[#ff4d2d]">
                {cartItems?.length || 0}
              </span>
            </div>
          </>
        )}
        {userData.role === "user" && (
          <button className="md:hidden text-[#ff2d4d] font-semibold cursor-pointer" onClick={() => navigate("/my-orders")}>
            My Orders
          </button>
        )}
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center bg-[#ff4d2d] text-white text-[20px] shadow-xl font-semibold cursor-pointer"
          onClick={() => setShowInfo((prev) => !prev)}
        >
          {userData?.fullname?.toUpperCase().slice(0, 1)}
        </div>
        {showInfo && (
          <div className="fixed top-20 right-2.5 md:right-[10%] lg:right-[25%] w-45 bg-white shadow-2xl rounded-xl p-5 flex flex-col gap-2.5 z-999">
            <div className="text-[17px] font-semibold">{userData.fullname}</div>
            {userData.role === "user" && (
              <div className="text-[#ff2d4d] font-semibold cursor-pointer" onClick={() => navigate("/my-orders")}>
                My Orders
              </div>
            )}
            <div
              className="text-[#ff4d2d] font-semibold cursor-pointer"
              onClick={handleLogOut}
            >
              Log Out
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Nav;
