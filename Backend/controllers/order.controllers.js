import Order from "../models/order.model.js";
import Shop from "../models/shop.model.js";
import Item from "../models/item.model.js";
export const placeOrder = async (req, res) => {
  try {
    const { cartItems, paymentMethod, deliveryAddress } = req.body;

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ message: "cart is empty" });
    }
    if (
      !deliveryAddress?.text ||
      !deliveryAddress?.latitude ||
      !deliveryAddress?.longitude
    ) {
      return res.status(400).json({ message: "send complete deliveryAddress" });
    }
    const dbItems = await Item.find({
      _id: { $in: cartItems.map((i) => i._id) },
    });
    const itemMap = new Map(dbItems.map((i) => [i._id.toString(), i]));
    if (cartItems.some((i) => !itemMap.has(String(i._id)))) {
      return res.status(400).json({ message: "item not found" });
    }
    const groupItemsByShop = {};
    cartItems.forEach((item) => {
      const shopId = item.shop;
      if (!groupItemsByShop[shopId]) {
        groupItemsByShop[shopId] = [];
      }
      groupItemsByShop[shopId].push(item);
    });
    const shopOrders = await Promise.all(
      Object.keys(groupItemsByShop).map(async (shopId) => {
        const shop = await Shop.findById(shopId).populate("owner");

        if (!shop) {
          throw new Error("shop not found");
        }

        const items = groupItemsByShop[shopId]; // ✅ yahin use karo

        const subtotal = items.reduce((sum, i) => {
          const dbItem = itemMap.get(String(i._id));
          return sum + dbItem.price * (Number(i.quantity) || 0);
        }, 0);

        return {
          shop: shop._id,
          owner: shop.owner._id,
          subtotal,
          shopOrderItems: items.map((i) => {
            const dbItem = itemMap.get(String(i._id));
            return {
              item: dbItem._id,
              name: dbItem.name,
              price: dbItem.price,
              quantity: Number(i.quantity) || 0,
            };
          }),
        };
      }),
    );
    const totalAmount = shopOrders.reduce((sum, so) => sum + so.subtotal, 0);
    const newOrder = await Order.create({
      user: req.userId,
      paymentMethod,
      deliveryAddress,
      totalAmount,
      shopOrders,
    });
    await newOrder.populate(
      "shopOrders.shopOrderItems.item",
      "name image price",
    );
    await newOrder.populate("shopOrders.shop", "name");
    return res.status(201).json(newOrder);
  } catch (error) {
    console.log("ERROR LINE CHECK:", error.stack);
    return res.status(500).json({
      message: `place order error ${error.message}`,
    });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const user = req.user;
    if (user.role == "user") {
      const orders = await Order.find({ user: user._id })
        .sort({ createdAt: -1 })
        .populate("shopOrders.shop", "name")
        .populate("shopOrders.owner", "fullname")
        .populate("shopOrders.shopOrderItems.item", "name image price");
      return res.status(200).json(orders);
    } else if (user.role == "owner") {
      const orders = await Order.find({ "shopOrders.owner": req.user._id })
        .sort({ createdAt: -1 })
        .populate("shopOrders.shop", "name")
        .populate("user", "fullname email mobile")
        .populate("shopOrders.shopOrderItems.item", "name image price");

      const filteredOrders = orders.map((order) => ({
        _id: order._id,
        paymentMethod: order.paymentMethod,
        user: order.user,
        shopOrders: order.shopOrders.find(
          (o) => o.owner?.toString() === req.user._id.toString(),
        ),
        createdAt: order.createdAt,
        deliveryAddress: order.deliveryAddress,
      }));

      return res.status(200).json(filteredOrders);
    }
    return res.status(200).json([]);
  } catch (error) {
    return res.status(500).json({ message: `get user order error ${error}` });
  }
};
