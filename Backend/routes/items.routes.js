import express from "express";
import isAuth from "../middlewares/isAuth.js";
import { getItemByCity} from "../controllers/items.controllers.js";
import { upload } from "../middlewares/multer.js";
import { addItem } from "../controllers/items.controllers.js";
import { editItem } from "../controllers/items.controllers.js";
import { deleteItem } from "../controllers/items.controllers.js";
import { getItemById } from "../controllers/items.controllers.js";
const itemRouter = express.Router();
itemRouter.post("/add-item", isAuth, upload.single("image"), addItem);
itemRouter.post(
  "/edit-item/:itemId",
  isAuth,
  upload.single("image"),
  editItem,
);
itemRouter.delete("/delete/:itemId", isAuth, deleteItem);
itemRouter.get("/get-by-city/:city", isAuth, getItemByCity);
itemRouter.get("/get-by-id/:itemId", isAuth, getItemById);
export default itemRouter;