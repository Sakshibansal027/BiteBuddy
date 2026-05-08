import React from "react";

function ShopCard({ shop }) {
  return (
    <div className="min-w-55 bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300 cursor-pointer">

      {/* IMAGE */}
      <div className="w-full h-50 overflow-hidden rounded-t-xl">
        <img
          src={shop.image}
          alt={shop.name}
          className="w-full h-full object-cover hover:scale-105 transition duration-300"
        />
      </div>

      {/* CONTENT */}
      <div className="p-3 flex flex-col gap-1">

        {/* NAME */}
        <h2 className="text-gray-800 font-semibold text-md truncate">
          {shop.name}
        </h2>

        {/* RATING */}
        <div className="flex items-center gap-1 text-sm text-gray-600">
          ⭐ 4.2
          <span className="text-gray-400 text-xs">(100+)</span>
        </div>

        {/* CITY */}
        <p className="text-gray-500 text-sm">
          📍 {shop.city}
        </p>

        {/* ITEMS */}
        <p className="text-gray-400 text-xs">
          {shop.items?.length} items available
        </p>

      </div>
    </div>
  );
}

export default ShopCard;