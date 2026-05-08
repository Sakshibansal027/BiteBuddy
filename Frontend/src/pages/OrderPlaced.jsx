import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function OrderPlaced() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center">
        
        {/* Success Icon */}
        <FaCheckCircle className="text-green-500 text-6xl mx-auto mb-4" />

        {/* Heading */}
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Order Placed Successfully 🎉
        </h1>

        {/* Subtext */}
        <p className="text-gray-500 mb-6">
          Your food is being prepared and will be delivered shortly.
        </p>

        {/* Order Info */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Order ID:</span> #123456
          </p>
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Estimated Time:</span> 30-40 mins
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => navigate("/orders")}
            className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition"
          >
            Track Order
          </button>

          <button
            onClick={() => navigate("my-orders")}
            className="flex-1 border border-gray-300 hover:bg-gray-100 py-2 rounded-lg transition"
          >
           Back to my orders
          </button>
        </div>
      </div>

    </div>
  );
}

export default OrderPlaced;
