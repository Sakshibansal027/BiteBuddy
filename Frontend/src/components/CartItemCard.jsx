import React from "react";
import { FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { removeCartItem, updateQuantity } from "../redux/user.slice";
function CartItemCard({ item }) {
    const dispatch = useDispatch()

    const handleIncrease = (id, currentQuantity) => {
        dispatch(updateQuantity({ id, quantity: currentQuantity + 1 }))
    }
    const handleDecrease = (id, currentQuantity) => {
        if(currentQuantity>1){
             dispatch(updateQuantity({ id, quantity: currentQuantity - 1 }))
        }

    }
    return (
        <div className="flex items-center justify-between bg-white p-4 rounded-2xl shadow-md border hover:shadow-lg transition">


            <div className="flex items-center gap-4">


                <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 rounded-xl object-cover border"
                />

                <div>
                    <h2 className="font-semibold text-lg">{item.name}</h2>

                    <p className="text-sm text-gray-400">
                        ₹{item.price} × {item.quantity}
                    </p>

                    <p className="font-bold text-[#ff4d2d] text-lg">
                        ₹{item.price * item.quantity}
                    </p>
                </div>
            </div>


            <div className="flex items-center gap-4">


                <div className="flex items-center gap-3 bg-gray-100 px-3 py-1.5 rounded-full shadow-inner">

                    <button
                        onClick={() => handleDecrease(item.id, item.quantity)}
                        className="text-[#ff4d2d] text-lg font-bold hover:scale-110 transition cursor-pointer"
                    >
                        −
                    </button>

                    <span className="font-medium text-gray-700">
                        {item.quantity}
                    </span>

                    <button
                        onClick={() => handleIncrease(item.id, item.quantity)}
                        className="text-[#ff4d2d] text-lg font-bold hover:scale-110 transition cursor-pointer"
                    >
                        +
                    </button>
                </div>


                <button
                    onClick={() => dispatch(removeCartItem(item.id))}
                    className="bg-red-100 text-red-500 p-2.5 rounded-full hover:bg-red-200 transition cursor-pointer"
                >
                    <FaTrash size={14} />
                </button>
            </div>
        </div>
    );
}

export default CartItemCard;