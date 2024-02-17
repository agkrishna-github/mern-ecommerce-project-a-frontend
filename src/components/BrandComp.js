import React from "react";

const BrandComp = ({ brand, setBrand }) => {
  return (
    <li
      className="p-3 cursor-pointer hover:text-red-600 border-all"
      onClick={() => setBrand(brand)}
    >
      {brand}
    </li>
  );
};

export default BrandComp;
