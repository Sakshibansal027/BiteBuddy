import mongoose from "mongoose";

// 🔹 Shop Order Item Schema
const shopOrderItemSchema = new mongoose.Schema(
  {
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
      required:true
    },
    name: String,
    price: Number,
    quantity: Number,
  },
  { timestamps: true }
);

// 🔹 Shop Order Schema (per shop)
const shopOrderSchema = new mongoose.Schema(
  {
    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    subtotal: Number,

    shopOrderItems: [shopOrderItemSchema],
  },
  { timestamps: true }
);

// 🔹 Main Order Schema
const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    paymentMethod: {
      type: String,
      enum: ["cod", "online"],
      required: true,
    },

    deliveryAddress: {
      text: String,
      latitude: Number,
      longitude: Number,
    },

    totalAmount: Number,

    shopOrders: [shopOrderSchema],

    status: {
      type: String,
      enum: ["pending", "confirmed", "preparing", "out_for_delivery", "delivered"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;