import React from "react";

const CategoryComp = ({ category, setCategory }) => {
  return (
    <li
      className="p-3 cursor-pointer hover:text-red-600"
      onClick={() => setCategory(category)}
    >
      {category}
    </li>
  );
};

export default CategoryComp;
