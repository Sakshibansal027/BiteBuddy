import React from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CartItemCard from "../components/CartItemCard";

function CartPage() {
  const navigate = useNavigate();
  const { cartItems,totalAmount } = useSelector((state) => state.user);
  console.log(cartItems);
  return (
    <div className="min-h-screen bg-[#fff9f6] flex justify-center p-6">
      <div className="w-full max-w-200">
        <div className="flex items-center gap-5 mb-6">
          <div className="top-5 left-5 z-10" onClick={() => navigate("/")}>
            <IoIosArrowRoundBack size={35} className="text-[#ff4d2d]" />
          </div>
          <h1 className="text-2xl font-semibold text-start">Your Cart</h1>
        </div>
        {cartItems?.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-20 text-center">
            <h1 className="text-xl font-semibold mb-2">
              Your Cart is Empty 🛒
            </h1>
            <p className="text-gray-500 mb-4">
              Looks like you haven't added anything yet
            </p>
            <button
              onClick={() => navigate("/")}
              className="bg-[#ff4d2d] text-white px-5 py-2 rounded-full"
            >
              Browse Food
            </button>
          </div>
        ) : (
          <><div className="space-y-4">
            {cartItems?.map((item) => (
              <CartItemCard key={item.id} item={item} />
            ))}
          </div>
          <div className="mt-6 bg-white p-4 rounded-xl shadowflex justify-between items-center border">
            <h1 className="text-lg font-semibold">Total Amount</h1>
            <span className="text-xl font-bold text-[#ff4d2d]">₹{totalAmount}</span>
          </div>
          <div className="mt-4 flex justify-end">
            <button className="bg-[#ff4d2d] text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-[#e64526] transition cursor-pointer" onClick={()=>navigate("/checkout")}>Proceed to Checkout</button>
          </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CartPage;
