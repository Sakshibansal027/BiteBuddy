import React from "react";

function CategoryCard({ name, image }) {
  return (
    <div className="min-w-27.5 h-27.5 md:min-w-40 md:h-40 rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition duration-300 cursor-pointer group relative">

      <img
        src={image}
        alt={name}
        className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
      />

    
      <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent"></div>

      <div className="absolute bottom-2 w-full text-center px-2">
        <p className="text-white text-sm md:text-base font-semibold truncate">
          {name}
        </p>
      </div>

    </div>
  );
}

export default CategoryCard;
