import React, { useEffect } from "react";
import crossImg from "../images/cross.svg";
import watch from "../images/watch.jpg";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserProductWishlist,
  prodAddToCart,
} from "../features/user/userSlice";
import { addToWishlist } from "../features/product/productSlice";
import { useNavigate } from "react-router-dom";

const Wishlist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
                className="h-5 w-5 bg-transparent cursor-pointer"
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
            <div className="flex flex-col gap-y-5 my-5">
              <h5 className="text-wrap">{item?.title.substring(0, 35)}</h5>
              <p className="text-wrap">
                {item?.description.substring(0, 40)}...
              </p>

              <p>Rs. {item?.price}</p>
              <p>
                <b>5</b> days :
              </p>
              <p>Products: {item?.quantity}</p>

              <div>
                <button
                  className="button-btn cursor-pointer"
                  onClick={() => navigate(`/product/${item?._id}`)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
