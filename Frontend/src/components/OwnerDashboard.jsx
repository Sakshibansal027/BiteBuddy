import React from "react";
import Nav from "./Nav.jsx";
import { useSelector } from "react-redux";
import { FaUtensils } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FaPen } from "react-icons/fa";
import OwnerItemCard from "./OwnerItemCard.jsx";
function OwnerDashboard() {
  const { myShopData } = useSelector((state) => state.owner);
  const navigate = useNavigate();
  return (
    <>
      <div className="w-full min-h-screen bg-[#fff9f6] flex flex-col items-center">
        <Nav />
        {!myShopData && (
          <div className="flex justify-center items-center min-h-[70vh] px-4">
            <div className="w-full max-w-md bg-white shadow-md rounded-2xl p-8 border border-gray-100 hover:shadow-xl transition duration-300">
              <div className="flex flex-col items-center text-center space-y-4">
                <FaUtensils className="text-[#ff4d2d] w-16 h-16 sm:w-20 sm:h-20" />

                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                  Add Your Restaurant
                </h2>

                <p className="text-gray-500 text-sm sm:text-base">
                  Start by adding your restaurant and showcase your menu to
                  customers.
                </p>

                <button
                  className="mt-3 bg-[#ff4d2d] text-white px-5 py-2 rounded-full hover:bg-[#e84324] transition"
                  onClick={() => navigate("/create-edit-shop")}
                >
                  Add Now
                </button>
              </div>
            </div>
          </div>
        )}

        {myShopData && (
          <div className="w-full flex flex-col items-center px-4 sm:px-6 mt-20 ">
            {/* Card */}
            <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl overflow-hidden border border-orange-100 relative">
              <div
                className="absolute top-4 right-4 bg-[#ff4d2d] text-white p-2 rounded-full shadow-md hover:bg-orange-600 transition-colors cursor-pointer"
                onClick={() => navigate("/create-edit-shop")}
              >
                <FaPen />
              </div>

              {/* Image */}
              {myShopData.image && (
                <div className="mt-4">
                  {" "}
                  <img
                    src={myShopData.image}
                    alt="shop"
                    className="w-full h-56 object-cover object-[center_6%] rounded-2xl"
                  />
                </div>
              )}

              {/* Content */}
              <div className="p-6 flex flex-col gap-3">
                {/* Title */}
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-3">
                  <FaUtensils className="text-[#ff4d2d] w-8 h-8" />
                  {myShopData.name}
                </h1>

                {/* Location */}
                <p className="text-gray-600 text-sm sm:text-base">
                  📍 {myShopData.address}, {myShopData.city}, {myShopData.state}
                </p>

                {/* Divider */}
                <div className="border-t my-2"></div>

                {/* Extra Info */}
                <p className="text-gray-500 text-sm">
                  Manage your shop, add items and grow your business 🚀
                </p>
              </div>
            </div>
          </div>
        )}

        {myShopData?.items?.length == 0 && (
          <div className="flex justify-center items-center min-h-[70vh] px-4">
            <div className="w-full max-w-md bg-white shadow-md rounded-2xl p-8 border border-gray-100 hover:shadow-xl transition duration-300">
              <div className="flex flex-col items-center text-center space-y-4">
                <FaUtensils className="text-[#ff4d2d] w-16 h-16 sm:w-20 sm:h-20" />

                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                  Add Your Food Item
                </h2>

                <p className="text-gray-500 text-sm sm:text-base">
                  Share Your delicious creations with our customers by adding
                  them to the menu.
                </p>

                <button
                  className="mt-3 bg-[#ff4d2d] text-white px-5 py-2 rounded-full hover:bg-[#e84324] transition"
                  onClick={() => navigate("/add-item")}
                >
                  Add Food
                </button>
              </div>
            </div>
          </div>
        )}

        {myShopData?.items?.length > 0 && (
          <div className="flex flex-col items-center gap-4 w-full max-w-3xl">
            {myShopData.items.map((item, index) => (
              <OwnerItemCard data={item} key={item._id} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default OwnerDashboard;
