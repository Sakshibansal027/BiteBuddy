import React from "react";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { FaUtensils } from "react-icons/fa";
import serverUrl from "../../config";
import { setmyShopData } from "../redux/owner.slice";
import axios from "axios";
import { ClipLoader } from "react-spinners";

function AddItem() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [frontendImage, setFrontendImage] = useState(null);
  const [backendImage, setBackendImage] = useState(null);
  const [category, setCategory] = useState("");
  const [foodType, setFoodType] = useState("veg");
  const [loading,setLoading]=useState(false);
  const categories = [
    "Snacks",
    "Main Course",
    "Desserts",
    "Pizza",
    "Burgers",
    "Sandwiches",
    "South Indian",
    "North Indian",
    "Chinese",
    "Fast Food",
    "Others",
  ];
  const dispatch = useDispatch();
  const handleImage = (e) => {
    const file = e.target.files[0];
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!name || !category || !price || !foodType) {
    alert("All fields required");
    return;
  }

  if (!backendImage) {
    alert("Image is required");
    return;
  }

  setLoading(true);

  try {
    const formData = new FormData();

    formData.append("name", name);
    formData.append("category", category);
    formData.append("foodType", foodType);
    formData.append("price", price);
    formData.append("image", backendImage);

    const result = await axios.post(
      `${serverUrl}/api/item/add-item`,
      formData,
      { withCredentials: true }
    );

    dispatch(setmyShopData(result.data));
    console.log(result.data);

    navigate("/");
  } catch (error) {
    console.log("ERROR:", error.response?.data); // ✅ VERY IMPORTANT
  } finally {
    setLoading(false);
  }
};
  return (
    <div className="flex justify-center flex-col items-center p-6 bg-linear-to-br from-orange-50 to-white min-h-screen">
      <div
        className="absolute top-5 left-5 z-10 mb-2.5"
        onClick={() => navigate("/")}
      >
        <IoArrowBack size={35} className="text-[#ff4d2d]" />
      </div>
      <div className="max-w-lg w-full bg-white shadow-xl rounded-2xl p-8 border border-orange-100">
        <div className=" flex flex-col items-center mb-6">
          <div className="bg-orange-100 rounded-full p-4 mb-4">
            <FaUtensils className="text-[#ff4d2d] w-16 h-16" />
          </div>
          <div className="text-3xl font-bold text-gray-900">Add Food</div>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter Food Name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              onChange={(e) => setName(e.target.value)}
              value={name}
            ></input>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Enter Price
            </label>
            <input
              type="number"
              placeholder="0"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              onChange={(e) => setPrice(e.target.value)}
              value={price}
            ></input>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Category
            </label>
            <select
              placeholder="0"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
            >
              <option value="">Select Category</option>
              {categories.map((categorie, index) => (
                <option value={categorie} key={index}>
                  {categorie}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select Food Type
            </label>
            <select
              placeholder="0"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              onChange={(e) => setFoodType(e.target.value)}
              value={foodType}
            >
              <option value="veg">Veg</option>
              <option value="non-veg">Non-Veg</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Food Image
            </label>
            <input
              type="file"
              accept="image/*"
              placeholder="Enter Shop Name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              onChange={handleImage}
            ></input>
            {frontendImage && (
              <div className="mt-4">
                <img
                  src={frontendImage}
                  alt=""
                  className="w-full h-56 object-cover object-[center_6%] rounded-2xl"
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-[#ff4d2d] text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-orange-600 hover:shadow-lg transition-all duration-200 cursor-pointer"
          disabled={loading}>
            {loading ? <ClipLoader size={20} color='white' />:"Save"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddItem;
