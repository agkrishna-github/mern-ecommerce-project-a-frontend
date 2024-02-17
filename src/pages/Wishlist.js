import React, { useEffect } from "react";
import crossImg from "../images/cross.svg";
import watch from "../images/watch.jpg";
import { useDispatch, useSelector } from "react-redux";
import { getUserProductWishlist } from "../features/user/userSlice";
import { addToWishlist } from "../features/product/productSlice";

const Wishlist = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserProductWishlist());
  }, []);

  const userWishList = useSelector((state) => state?.auth?.wishlist?.wishlist);

  const removefromWishlist = (id) => {
    dispatch(addToWishlist(id));
    setTimeout(() => {
      dispatch(getUserProductWishlist());
    }, 300);
  };

  return (
    <div className="bg-slate-400 min-h-screen py-10">
      <div className="w-5/6 mx-auto flex flex-wrap gap-10">
        {userWishList?.length === 0 && (
          <div className="bg-white w-full p-5 text-center">No Data</div>
        )}
        {userWishList?.map((item) => (
          <div className="bg-white w-[350px] p-5" key={item._id}>
            <div className="flex justify-end items-end">
              <div
                className="h-5 w-5 bg-transparent"
                onClick={() => removefromWishlist(item?._id)}
              >
                <img
                  src={crossImg}
                  alt="cross img"
                  className="w-[100%] h-[100%]"
                />
              </div>
            </div>
            <div className="w-[250px] h-[250px]">
              <img
                src={item?.images[0]?.url || watch}
                alt="watch img"
                className="w-[100%] h-[100%]"
              />
            </div>
            <div>
              <h4 className="py-2">{item?.title}</h4>
              <h5 className="py-2 leading-normal">{item?.description}</h5>
              <h6 className="py-2">{item?.price}</h6>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
