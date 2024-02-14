import React, { useState } from "react";
import ReactStars from "react-rating-stars-component";
import { Link, useLocation, useNavigate } from "react-router-dom";
import prodcompare from "../images/prodcompare.svg";
import wish from "../images/wish.svg";
import wishlist from "../images/wishlist.svg";
import watch from "../images/watch.jpg";
import watch2 from "../images/watch-1.jpg";
import addcart from "../images/add-cart.svg";
import view from "../images/view.svg";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist } from "../features/product/productSlice";
import { getUserProductWishlist } from "../features/user/userSlice";

const ProductCard = (props) => {
  const { data } = props;

  const [desHide, setdesHide] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addtowishlist = (id) => {
    dispatch(addToWishlist(id));

    setTimeout(() => {
      dispatch(getUserProductWishlist());
    }, 200);
  };

  return (
    <>
      {data.map((item) => (
        <div
          className="product-card p-3 flex flex-col relative gap-2 bg-white w-[300px]"
          key={item?._id}
        >
          <div className="absolute top-4 right-4">
            <button
              className="p-2 bg-transparent div-wish border-0 "
              onClick={() => addtowishlist(item?._id)}
            >
              <img src={wish} alt="wishlist" />
            </button>
          </div>
          <div className="w-[200px] h-[200px]">
            <img
              src={item?.images[0]?.url}
              alt="product image"
              className="h-full w-full"
            />
            {/* <img src={watch2} className="" alt="product image" /> */}
          </div>
          <h5 className="mb-2">{item?.title}</h5>
          <p
            className={
              desHide
                ? "mb-2 w-[200px] h-[50px] text-ellipsis overflow-hidden p-2"
                : "mb-2 w-[200px] p-2"
            }
          >
            ${item?.description}
          </p>
          <span onClick={() => setdesHide(!desHide)}>
            {desHide ? "...read more" : "...read less"}
          </span>
          <div>
            <ReactStars
              count={5}
              size={24}
              value={4}
              edit={false}
              activeColor="#ffd700"
              className="mb-2"
            />
          </div>

          <p className="mt-2">Rs. {item?.price}</p>
          <div className="hidden wishlist">
            <div className="absolute top-14 right-5 flex flex-col gap-3">
              <button className="bg-transparent border-0">
                <img src={prodcompare} alt="compare" />
              </button>
              <button
                className="bg-transparent border-0"
                onClick={() => navigate(`/product/${item?._id}`)}
              >
                <img src={view} alt="view" />
              </button>
              <button className="bg-transparent border-0">
                <img src={addcart} alt="addcart" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductCard;
