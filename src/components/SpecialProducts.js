import React from "react";
import ReactStars from "react-rating-stars-component";
import ProgressBar from "./Progressbar";

const SpecialProducts = ({ productState }) => {
  const specialProducts = productState?.filter(
    (product) => product.tags === "special"
  );

  return (
    <div className="w-5/6 mx-auto py-5">
      <h2 className="pb-5">Special Products</h2>
      <div className="flex flex-wrap gap-5">
        {specialProducts &&
          specialProducts?.map((item) => (
            <div className=" " key={item._id}>
              <div className="bg-white p-5 min-h-[550px] w-[350px]">
                <div className="flex justify-center items-center  ">
                  <div className="w-[250px] h-[250px]">
                    <img
                      src={item.images[0].url}
                      alt="watch"
                      className="h-full w-full"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-5 pt-5">
                  <h3>{item.brand}</h3>
                  <h5>{item.title}</h5>
                  <ReactStars
                    count={5}
                    size={24}
                    value={4}
                    edit={false}
                    activeColor="#ffd700"
                  />
                  <p>
                    Rs. {item.price} <strike>Rs. 200</strike>
                  </p>
                  <p>
                    <b>5</b> days :
                  </p>
                  <p>Products: {item.quantity}</p>
                  <div className="">
                    <ProgressBar item={item} />
                  </div>
                  <div>
                    <button className="button-btn">Add to Cart</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SpecialProducts;
