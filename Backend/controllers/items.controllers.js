import uploadOnCloudinary from "../utils/cloudinary.js";
import Shop from "../models/shop.model.js";
import Item from "../models/item.model.js";
export const addItem = async (req, res) => {
  try {
    const { name, category, foodType, price } = req.body;
    console.log(req.body);
    let image;
    if (req.file) {
      image = await uploadOnCloudinary(req.file.path);
    }
    const shop = await Shop.findOne({ owner: req.userId });
    if (!shop) {
      return res.status(400).json({ message: "shop not found" });
    }
    const item = await Item.create({
      name,
      category,
      foodType,
      price,
      image,
      shop: shop._id,
    });
    shop.items.push(item._id);
    await shop.save();
    await shop.populate({ path: "owner", select: "fullname email mobile role" });
    await shop.populate({
      path: "items",
      options: { sort: { updatedAt: -1 } },
    });
    return res.status(201).json(shop);
  } catch (error) {
    return res.status(500).json({ message: `add item error ${error}` });
  }
};

export const editItem = async (req, res) => {
  try {
    const itemId = req.params.itemId;
    const { name, category, foodType, price } = req.body;

    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(400).json({ message: "item not found" });
    }
    // Sirf item ka apna owner hi edit kar sakta hai
    const shop = await Shop.findOne({ owner: req.userId });
    if (!shop || item.shop.toString() !== shop._id.toString()) {
      return res.status(403).json({ message: "not allowed to edit this item" });
    }

    const updateData = { name, category, foodType, price };
    if (req.file) {
      const image = await uploadOnCloudinary(req.file.path);
      if (image) updateData.image = image;
    }
    await Item.findByIdAndUpdate(itemId, updateData, { new: true });

    await shop.populate({
      path: "items",
      options: { sort: { updatedAt: -1 } },
    });
    return res.status(201).json(shop);
  } catch (error) {
    return res.status(500).json({ message: `edit item error ${error}` });
  }
};
export const getItemById = async (req, res) => {
  try {
    const itemId = req.params.itemId;
    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(400).json({ message: "item not found" });
    }
    return res.status(200).json(item);
  } catch (error) {
    return res.status(500).json({ message: `get item error ${error}` });
  }
};
export const deleteItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(400).json({ message: "item not found" });
    }
    // Sirf item ka apna owner hi delete kar sakta hai
    const shop = await Shop.findOne({ owner: req.userId });
    if (!shop || item.shop.toString() !== shop._id.toString()) {
      return res
        .status(403)
        .json({ message: "not allowed to delete this item" });
    }

    await Item.findByIdAndDelete(itemId);
    // ObjectId ko string bana ke compare karna zaruri hai (!== se hamesha true aata tha)
    shop.items = shop.items.filter((i) => i.toString() !== itemId);
    await shop.save();
    return res.status(200).json({ message: "item deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: `delete item error ${error}` });
  }
};
export const getItemByCity = async (req, res) => {
  try {
    const { city } = req.params;
    if (!city) {
      return res.status(400).json({ message: "city is required" });
    }
    const shops = await Shop.find({
      city: { $regex: new RegExp(`^${city}$`, "i") },
    });
    const shopIds = shops.map((shop) => shop._id);
    if (shops.length === 0) {
      return res.status(400).json({ message: "No shops found in this city" });
    }

    const items = await Item.find({
      shop: { $in: shopIds },
    });
    return res.status(200).json(items);
  } catch (error) {
    return res.status(500).json({ message: `get item by city error ${error}` });
  }
};