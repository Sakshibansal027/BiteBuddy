import React, { useState } from "react";
import { FaPen, FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import serverUrl from "../../config";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setmyShopData } from "../redux/owner.slice";

function OwnerItemCard({ data }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [deleting, setDeleting] = useState(false);
  const isVeg = data.foodType === "veg";

  const handleDeleteItem = async () => {
    // Galti se delete na ho jaye, isliye pehle puchho
    if (!window.confirm(`Delete "${data.name}" from your menu?`)) return;
    setDeleting(true);
    try {
      await axios.delete(`${serverUrl}/api/item/delete/${data._id}`, {
        withCredentials: true,
      });
      const res = await axios.get(`${serverUrl}/api/shop/get-my-shop`, {
        withCredentials: true,
      });
      dispatch(setmyShopData(res.data));
    } catch (error) {
      console.log(error);
      setDeleting(false);
    }
  };

  return (
    <div
      className={`flex w-full max-w-2xl min-h-36 overflow-hidden rounded-2xl border border-orange-300 bg-white shadow-sm transition hover:shadow-md ${
        deleting ? "opacity-50" : ""
      }`}
    >
      
      <div className="relative w-32 sm:w-44 shrink-0 bg-gray-100">
        {data.image && (
          <img
            src={data.image}
            alt={data.name}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
      </div>


      <div className="flex min-w-0 flex-1 flex-col justify-between p-4">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h2 className="truncate text-lg font-semibold text-gray-900">
              {data.name}
            </h2>
           
            <span
              title={isVeg ? "Veg" : "Non-veg"}
              className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-sm border-2 ${
                isVeg ? "border-green-600" : "border-red-600"
              }`}
            >
              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  isVeg ? "bg-green-600" : "bg-red-600"
                }`}
              />
            </span>
          </div>
          <span className="mt-2 inline-block rounded-full bg-[#ff4d2d]/10 px-3 py-0.5 text-xs font-medium text-[#ff4d2d]">
            {data.category}
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <p className="text-xl font-bold text-[#ff4d2d]">₹{data.price}</p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Edit item"
              title="Edit"
              className="rounded-full bg-orange-50 p-2.5 text-[#ff4d2d] transition hover:bg-[#ff4d2d] hover:text-white cursor-pointer"
              onClick={() => navigate(`/edit-item/${data._id}`)}
            >
              <FaPen size={14} />
            </button>
            <button
              type="button"
              aria-label="Delete item"
              title="Delete"
              disabled={deleting}
              className="rounded-full bg-red-50 p-2.5 text-red-500 transition hover:bg-red-500 hover:text-white cursor-pointer disabled:cursor-not-allowed"
              onClick={handleDeleteItem}
            >
              <FaTrashAlt size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OwnerItemCard;