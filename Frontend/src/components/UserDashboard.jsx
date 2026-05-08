import React from "react";
import Nav from "./Nav";
import { categories } from "../category";
import CategoryCard from "./CategoryCard";
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import ShopCard from "./ShopCard";
import FoodCard from "./FoodCard";

function UserDashboard() {
  const catescrollRef = useRef();
  const shopscrollRef = useRef();

  const scrollLeft = () => {
    catescrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
  };
  const scrollRight = () => {
    catescrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
  };
  const scrollShopLeft = () => {
    shopscrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
  };
  const scrollShopRight = () => {
    shopscrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
  };

  const [showLeftCateButton, setShowLeftCateButton] = useState(false);
  const [showRightCateButton, setShowRightCateButton] = useState(false);
  const [showLeftShopButton, setShowLeftShopButton] = useState(false);
  const [showRightShopButton, setShowRightShopButton] = useState(false);
  const { currentCity, shopInMyCity, itemsInMyCity } = useSelector(
    (state) => state.user,
  );
  const updateButton = (ref) => {
    const element = ref.current;
    if (element) {
      setShowLeftCateButton(element.scrollLeft > 0);
      setShowRightCateButton(
        element.scrollLeft + element.clientWidth < element.scrollWidth,
      );
    }
  };
  useEffect(() => {
    updateButton(catescrollRef);
  }, []);

  const updateShopButton = (ref) => {
    const element = ref.current;
    if (element) {
      setShowLeftShopButton(element.scrollLeft > 0);
      setShowRightShopButton(
        element.scrollLeft + element.clientWidth < element.scrollWidth,
      );
    }
  };
  useEffect(() => {
    updateShopButton(shopscrollRef);
  }, []);

  return (
    <div className="w-screen min-h-screen flex flex-col items-center bg-linear-to-b from-[#fff7f2] to-[#ffeae0] overflow-y-auto">
      <Nav />

      <div className="w-full max-w-6xl flex flex-col gap-6 px-4 sm:px-6 lg:px-8 mt-24">
        <div className="flex flex-col gap-1">
          <h1 className="text-gray-900 text-2xl sm:text-3xl font-bold leading-tight">
            Inspiration for your first order 🍔
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Discover the best food categories around you
          </p>
        </div>
        <div className="relative flex items-center">
          {/* LEFT BUTTON */}
          {showLeftCateButton && (
            <button
              onClick={scrollLeft}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg hover:bg-[#e64528] z-10"
            >
              <FaChevronLeft />
            </button>
          )}

          {/* SCROLL */}
          <div
            ref={catescrollRef}
            onScroll={() => updateButton(catescrollRef)}
            className="flex gap-5 overflow-x-auto pb-3 scrollbar-hide scroll-smooth"
          >
            {categories.map((cate, index) => (
              <CategoryCard
                name={cate.category}
                image={cate.image}
                key={index}
              />
            ))}
          </div>

          {/* RIGHT BUTTON */}
          {showRightCateButton && (
            <button
              onClick={scrollRight}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg hover:bg-[#e64528] z-10"
            >
              <FaChevronRight />
            </button>
          )}
        </div>
      </div>

      <div className="w-full max-w-6xl flex flex-col gap-6 px-4 mx-auto sm:px-6 lg:px-8 mt-10">
        <div className="flex flex-col gap-1">
          <h1 className="text-gray-900 text-2xl sm:text-3xl font-bold">
            Top picks in <span className="text-[#ff4d2d]">{currentCity}</span>{" "}
            🍽️
          </h1>
          <p className="text-gray-500 text-sm">
            Discover popular places near you
          </p>
        </div>
        <div className="relative flex items-center">
          {/* LEFT BUTTON */}
          {showLeftShopButton && (
            <button
              onClick={scrollShopLeft}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg hover:bg-[#e64528] z-10"
            >
              <FaChevronLeft />
            </button>
          )}

          {/* SCROLL */}
          <div
            ref={shopscrollRef}
            onScroll={() => updateShopButton(shopscrollRef)}
            className="flex gap-5 overflow-x-auto pb-3 scrollbar-hide scroll-smooth"
          >
            {shopInMyCity?.length === 0 ? (
              <p className="text-gray-400 text-sm">
                No shops found in your city 😔
              </p>
            ) : (
              shopInMyCity?.map((shop, index) => (
                <ShopCard shop={shop} key={index} />
              ))
            )}
          </div>

          {/* RIGHT BUTTON */}
          {showRightShopButton && (
            <button
              onClick={scrollShopRight}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#ff4d2d] text-white p-2 rounded-full shadow-lg hover:bg-[#e64528] z-10"
            >
              <FaChevronRight />
            </button>
          )}
        </div>
      </div>

      <div className="w-full max-w-6xl flex flex-col gap-6 px-4 mx-auto sm:px-6 lg:px-8 mt-10">
        <h1 className="text-gray-900 text-2xl sm:text-3xl font-bold">
          Craving something? 😋
        </h1>
        <p className="text-gray-500 text-sm">
          Here are some tasty picks for you
        </p>
        <div className="w-full max-w-7xl mx-auto px-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          
          {itemsInMyCity?.map((item, index) => (
            <FoodCard key={index} item={item} />
          ))}
          
        </div>
        
      </div>
    </div>
  );
}

export default UserDashboard;
