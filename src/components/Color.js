import React from "react";

const Color = ({ colorData, setColor }) => {
  return (
    <div className="flex gap-10 p-3 my-3">
      {colorData &&
        colorData?.map((item, index) => {
          return (
            <div
              style={{
                backgroundColor: item?.title,
                borderRadius: "50%",
                width: "30px",
                height: "30px",
              }}
              key={index}
              onClick={() => setColor(item?._id)}
            ></div>
          );
        })}
    </div>
  );
};

export default Color;
