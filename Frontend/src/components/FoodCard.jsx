import React, { useState } from "react";
import { FaStar, FaPlus, FaMinus, FaShoppingCart } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/user.slice";
import { updateQuantity } from "../redux/user.slice";
function FoodCard({ item }) {
  if (!item) return null;

  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.user);
  const existingItem = cartItems.find((i) => i.id === item._id);
  const quantity = existingItem ? existingItem.quantity : 0;
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= rating ? (
          <FaStar key={i} className="text-yellow-500 text-sm" />
        ) : (
          <FaRegStar key={i} className="text-yellow-500 text-sm" />
        ),
      );
    }
    return stars;
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
      {/* Image */}
      <div className="relative w-full h-40 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover hover:scale-110 transition-all duration-300"
        />

        {/* Veg / Non-Veg */}
        <span
          className={`absolute top-2 left-2 text-xs px-2 py-1 rounded-full text-white
          ${item.foodType === "veg" ? "bg-green-500" : "bg-red-500"}`}
        >
          {item.foodType?.toUpperCase()}
        </span>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-2">
        {/* Name + Price */}
        <div className="flex justify-between items-center">
          <h2 className="text-md font-semibold text-gray-800 capitalize">
            {item.name}
          </h2>
          <span className="text-orange-500 font-bold">₹{item.price}</span>
        </div>

        {/* Category */}
        <p className="text-xs text-gray-400">{item.category}</p>

        {/* Bottom */}
        <div className="flex gap-2 items-center mt-2">
          {/* Rating */}
          <div className="flex items-center gap-1 bg-green-100 px-2 py-1 rounded-full">
            {renderStars(item.rating?.average || 0)}
          </div>
          <span className="text-xs text-gray-500">
            {item.rating?.count || 0}
          </span>
        </div>
        {/* Quantity Controls */}
        <div className="flex justify-end">
          {quantity === 0 ? (
            <button
              onClick={() =>
                dispatch(
                  addToCart({
                    id: item._id,
                    name: item.name,
                    price: item.price,
                    image: item.image,
                    shop: item.shop,
                    foodType: item.foodType,
                  }),
                )
              }
              className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-3 py-1 rounded-lg flex items-center gap-1"
            >
              <FaShoppingCart /> Add
            </button>
          ) : (
            <div className="flex items-center gap-2 bg-gray-100 px-2 py-1 rounded-lg">
              <button
                onClick={() =>
                  dispatch(
                    updateQuantity({
                      id: item._id,
                      quantity: quantity - 1,
                    }),
                  )
                }
                className="text-orange-500 hover:scale-110"
              >
                <FaMinus />
              </button>

              <span className="font-semibold text-sm">{quantity}</span>

              <button
                onClick={() =>
                  dispatch(
                    addToCart({
                      id: item._id,
                      name: item.name,
                      price: item.price,
                      image: item.image,
                      shop: item.shop,
                      foodType: item.foodType,
                    }),
                  )
                }
                className="text-orange-500 hover:scale-110"
              >
                <FaPlus />
              </button>

              <button
                className={`${cartItems.some((i) => i.id == item._id) ? "text-gray-800" : "text-[#ff4d2d]"}`}
              >
                <FaShoppingCart className="ml-1" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FoodCard;
