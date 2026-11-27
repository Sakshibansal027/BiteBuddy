import React from 'react'
function UserOrderCard({ data }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-GB', {
      day: "2-digit",
      month: "short",
      year: "numeric"
    })
  }

  return (
    <div className='bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 p-4 max-w-3xl space-y-4'>

      <div className='flex justify-between items-start border-b border-gray-100 pb-4 gap-3'>
        <div className='space-y-1'>
          <p className='font-bold text-gray-800 text-base sm:text-lg'>
            Order #{data._id.slice(-6)}
          </p>

          <p className='text-sm text-gray-500'>
            {formatDate(data.createdAt)}
          </p>
        </div>

        <div className='text-right space-y-1'>
          <p className='text-xs font-medium text-gray-400 uppercase tracking-wider'>
            {data.paymentMethod?.toUpperCase()}
          </p>

          <p className='inline-block text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full'>
            {data.shopOrders?.[0].status}
          </p>
        </div>
      </div>

      {data.shopOrders.map((shopOrder, index) => (
        <div
          className='border border-gray-100 rounded-xl p-4 bg-[#fffaf7] space-y-4'
          key={index}
        >
          <p className='font-semibold text-gray-800 text-sm sm:text-base'>
            {shopOrder.shop.name}
          </p>

          <div className='flex gap-4 overflow-x-auto pb-2'>
            {shopOrder.shopOrderItems.map((item, index) => (
              <div
                key={index}
                className='flex flex-col shrink-0 w-36 sm:w-40 border border-gray-100 rounded-xl p-2.5 bg-white hover:shadow-sm transition-shadow'
              >
                <img
                  src={item.item.image}
                  alt=""
                  className='w-full h-28 object-cover rounded-lg'
                />

                <p className='text-sm font-semibold text-gray-800 mt-2 line-clamp-1'>
                  {item.name}
                </p>

                <p className='text-xs text-gray-500 mt-1'>
                  Qty: {item.quantity} × ₹{item.price}
                </p>
              </div>
            ))}
          </div>

          <div className='flex justify-between items-center border-t border-gray-200 pt-3 gap-2'>
            <p className='font-semibold text-gray-700 text-sm'>
              Subtotal: ₹{shopOrder.subtotal}
            </p>

            <span className='text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full'>
              {shopOrder.status}
            </span>
          </div>
        </div>
      ))}

      <div className='flex flex-col sm:flex-row justify-between items-center border-t border-gray-100 pt-4 gap-3'>
        <div>
          <p className='text-xs text-gray-400 font-medium uppercase tracking-wider'>
            Total Amount
          </p>
          <p className='text-xl font-bold text-gray-900 mt-1'>
            ₹{data.totalAmount}
          </p>
        </div>

        <button className='w-full sm:w-auto bg-[#ff4d2d] hover:bg-[#e64526] active:scale-95 text-white px-6 py-2.5 rounded-xl text-sm font-semibold shadow-sm hover:shadow-md transition-all duration-200'>
          Track Order
        </button>
      </div>

    </div>
  )
}

export default UserOrderCard
