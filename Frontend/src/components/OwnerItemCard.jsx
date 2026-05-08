import React from "react";
import { FaPen, FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router";
import serverUrl from "../../config";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setmyShopData } from "../redux/owner.slice";
function OwnerItemCard({ data }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleDeleteItem = async () => {
    try {
      await axios.delete(`${serverUrl}/api/item/delete/${data._id}`, { withCredentials: true })
      console.log(`${serverUrl}/api/item/delete/${data._id}`)
      const res = await axios.get(`${serverUrl}/api/shop/get-my-shop`, {
        withCredentials: true,
      });
      console.log(res.data)
      dispatch(setmyShopData(res.data))
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="flex bg-white rounded-lg shadow-md mt-4 overflow-hidden border border-[#ff4d2d] w-full max-w-2xl">
      <div className="w-50 h-full shrink-0 bg-gray-50 ">
        <img src={data.image} alt="" className="w-full object-cover" />
      </div>
      <div className="flex flex-col justify-between p-3 flex-1">
        <div>
          <h2 className="text-base font-semibold text-[#ff4d2d]">
            {data.name}
          </h2>
          <p className="font-medium ">Category:{data.category}</p>
          <p ><span className="font-medium text-gray-70">Food Type:{data.foodType}</span></p>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-[#ff4d2d] font-bold">{data.price}</div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-full hover:bg-[#ff4d2d]/10 text-[#ff4d2d] cursor-pointer" onClick={() => navigate(`/edit-item/${data._id}`)}>
              <FaPen size={16} />
            </div>

            <div className="p-2 rounded-full hover:bg-[#ff4d2d]/10 text-[#ff4d2d] cursor-pointer" onClick={handleDeleteItem}>
              <FaTrashAlt size={16} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OwnerItemCard;