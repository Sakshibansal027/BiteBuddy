import React from 'react'
import axios from "axios";
import { MdPhone } from "react-icons/md";
import serverUrl from "../../config";
import { useDispatch } from 'react-redux';
import { updateOrderStatus } from "../redux/user.slice";
function OwnerOrderCard({ data }) {
const dispatch = useDispatch();
  const handleUpdateStatus = async (orderId, shopId, status) => {
    try {
      const result = await axios.post(`${serverUrl}/api/order/update-status/${orderId}/${shopId}`, { status }, { withCredentials: true })
      console.log(result.data)
      dispatch(updateOrderStatus({ orderId, shopId, status }))
    }
    catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='bg-white rounded-2xl border border-gray-200 shadow-md p-5 max-w-3xl space-y-5 hover:shadow-lg transition-shadow duration-300'>

      {/* Customer Details */}
      <div className='flex flex-col gap-1'>
        <h2 className='text-xl font-bold text-gray-800'>
          {data.user?.fullname}
        </h2>

        <p className='text-sm text-gray-500'>
          {data.user?.email}
        </p>

        <p className='flex items-center gap-2 text-sm text-gray-600 mt-1'>
          <MdPhone className='text-[#ff4d2d] text-lg' />
          <span>{data.user?.mobile}</span>
        </p>
      </div>

      {/* Delivery Address */}
      <div className='bg-gray-50 rounded-xl p-4 border border-gray-100 space-y-2'>
        <p className='text-xs font-bold uppercase tracking-wider text-gray-400'>
          Delivery Address
        </p>

        <p className='text-sm font-medium text-gray-700'>
          {data.deliveryAddress?.text}
        </p>

        <p className='text-xs text-gray-400'>
          Lat: {data.deliveryAddress?.latitude},
          Lon: {data.deliveryAddress?.longitude}
        </p>
      </div>

      {/* Shop Details and Items */}
      <div className='border border-orange-100 rounded-xl p-4 bg-[#fffaf7] space-y-4'>

        <div className='flex items-center justify-between'>
          <h3 className='font-bold text-gray-800 text-base'>
            {data.shopOrders?.shop?.name}
          </h3>
          <span className='text-xs text-gray-500'>
            {data.shopOrders?.shopOrderItems?.length} Items
          </span>
        </div>

        {/* Ordered Items */}
        <div className='flex gap-4 overflow-x-auto pb-2'>

          {data.shopOrders?.shopOrderItems?.map((item, index) => (
            <div
              key={index}
              className='flex flex-col shrink-0 w-36 sm:w-40 border border-gray-100 rounded-xl p-2.5 bg-white hover:shadow-md hover:-translate-y-1 transition-all duration-200'
            >
              <img
                src={item.item?.image}
                alt={item.name || "Food item"}
                className='w-full h-28 object-cover rounded-lg'
              />

              <p className='text-sm font-semibold text-gray-800 mt-3 line-clamp-1'>
                {item.name}
              </p>

              <p className='text-xs text-gray-500 mt-1'>
                Qty: {item.quantity} × ₹{item.price}
              </p>

              <p className='text-sm font-bold text-[#ff4d2d] mt-2'>
                ₹{item.quantity * item.price}
              </p>
            </div>
          ))}

        </div>

        {/* Subtotal and Status */}
        <div className='flex justify-between items-center border-t border-orange-100 pt-4 gap-2'>
          <div>
            <p className='text-xs text-gray-400 font-medium uppercase tracking-wide'>
              Subtotal
            </p>
            <p className='text-lg font-bold text-gray-800 mt-1'>
              ₹{data.shopOrders?.subtotal}
            </p>
          </div>

          <span className='text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-full capitalize'>
            {data.shopOrders?.status}
          </span>
        </div>
      </div>

      {/* Total Amount */}
      <div className='flex justify-between items-center border-t border-gray-100 pt-4'>
        <div>
          <p className='text-xs text-gray-400 font-semibold uppercase tracking-wider'>
            Total Amount
          </p>
          <p className='text-2xl font-bold text-gray-900 mt-1'>
            ₹{data.shopOrders?.subtotal}
          </p>
        </div>
      </div>

      {/* Update Status */}
      <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 border-t border-gray-100 pt-4'>
        <span className='text-sm font-medium text-gray-600'>
          Order Status:
          <span className='font-bold capitalize text-[#ff4d2d] ml-1'>
            {data.shopOrders.status}
          </span>
        </span>

        <select

          className='w-full sm:w-auto rounded-lg border border-orange-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 outline-none focus:ring-2 focus:ring-[#ff4d2d]/30 focus:border-[#ff4d2d] cursor-pointer transition' onChange={(e) => handleUpdateStatus(data._id, data.shopOrders.shop._id, e.target.value)}
        >
          <option value="">Change</option>
          <option value="pending">Pending</option>
          <option value="preparing">Preparing</option>
          <option value="out of delivery">Out of delivery</option>
        </select>
      </div>

    </div>
  )
}

export default OwnerOrderCard
