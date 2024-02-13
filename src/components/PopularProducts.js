import React from "react";
import ReactStars from "react-rating-stars-component";

const PopularProducts = ({ productState }) => {
  const specialProducts = productState?.filter(
    (product) => product.tags === "popular"
  );

  return (
    <div className="w-5/6 mx-auto py-5">
      <h2 className="pb-5">Popular Products</h2>
      <div className="flex flex-wrap gap-5">
        {specialProducts &&
          specialProducts?.map((item) => (
            <div className=" " key={item._id}>
              <div className="bg-white p-5 min-h-[500px] w-[350px]">
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
                  <h5>{item.description}</h5>
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
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default PopularProducts;
