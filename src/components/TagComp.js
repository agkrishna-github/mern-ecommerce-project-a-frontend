import React from "react";

const TagComp = ({ tag, setTag }) => {
  return (
    <li
      className="p-3 cursor-pointer hover:text-red-600 border-all"
      onClick={() => setTag(tag)}
    >
      {tag}
    </li>
  );
};

export default TagComp;
