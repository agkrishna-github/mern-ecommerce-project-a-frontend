import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link, useLocation } from "react-router-dom";
import prodcompare from "../images/prodcompare.svg";
import wish from "../images/wish.svg";
import wishlist from "../images/wishlist.svg";
import watch from "../images/watch.jpg";
import watch2 from "../images/watch-1.jpg";
import addcart from "../images/add-cart.svg";
import view from "../images/view.svg";
import { useDispatch } from "react-redux";
import { addToWishlist } from "../features/product/productSlice";

const ProductCard = (props) => {
  const { data } = props;

  const dispatch = useDispatch();

  const addtowishlist = (id) => {
    alert(id);
    dispatch(addToWishlist(id));
  };

  return (
    <section className="flex flex-wrap gap-5">
      {data.map((item) => (
        <div
          className={"product-card px-2 py-4 relative bg-white min-w-[300px]"}
          key={item._id}
        >
          <div className="relative">
            <button
              className="p-2 bg-transparent div-wish border-0 absolute top-2 right-1"
              onClick={() => addtowishlist(item._id)}
            >
              <img src={wish} alt="wishlist" />
            </button>
          </div>
          <div className="w-[250px] h-[250px]">
            <img
              src={item.images[0].url}
              alt="product image"
              className="h-full w-full"
            />
            {/* <img src={watch2} className="" alt="product image" /> */}
          </div>
          <h5 className="mb-2">{item.title}</h5>
          <p className="mb-2 w-[200px]">{item.description}</p>
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

          <p className="mt-2">Rs. {item.price}</p>
          <div className="hidden wishlist">
            <div className="absolute top-14 right-5 flex flex-col gap-3">
              <button className="bg-transparent border-0">
                <img src={prodcompare} alt="compare" />
              </button>
              <button className="bg-transparent border-0">
                <img src={view} alt="view" />
              </button>
              <button className="bg-transparent border-0">
                <img src={addcart} alt="addcart" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default ProductCard;
