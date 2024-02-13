import React from "react";
import wish from "../images/wish.svg";
import watch from "../images/watch.jpg";
import watch1 from "../images/watch-1.jpg";
import ReactStars from "react-rating-stars-component";
import prodcompare from "../images/prodcompare.svg";
import addcart from "../images/add-cart.svg";
import view from "../images/view.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToWishlist } from "../features/product/productSlice";

const FeaturedProduct = ({ productState }) => {
  const featuredProducts = productState?.filter(
    (product) => product.tags === "featured"
  );

  const navigate = useNavigate();

  const dispatch = useDispatch();

  return (
    <div className="w-5/6 mx-auto pt-10">
      <h2 className="py-3 mb-4">Featured Collection</h2>
      <div className="flex flex-wrap gap-3">
        {featuredProducts.map((product) => (
          <div
            className="product-card relative bg-white flex flex-col justify-around gap-2 p-2 rounded ease-out duration-300 truncate w-[300px] min-h-[450px]"
            key={product._id}
          >
            <button
              className="border-none absolute right-4 top-3 bg-transparent cursor-pointer"
              onClick={() => dispatch(addToWishlist(product._id))}
            >
              <img src={wish} alt="wishlist" className="w-[20px] h-[20px]" />
            </button>
            <div className="product-image">
              <img
                src={product.images[0].url}
                className="w-[250px] h-[250px]"
                alt="watch"
              />
              <img
                src={product.images[0].url}
                className="w-[250px] h-[250px]"
                alt="watch"
              />
            </div>
            <h5>{product.title}</h5>
            <p>{product.description}</p>
            <ReactStars
              count={5}
              size={24}
              value={4}
              edit={false}
              activeColor="#ffd700"
            />
            <p className="price">Rs. {product.price}</p>
            <div className="action-bar flex flex-col gap-5 absolute right-[-40px] top-12">
              <button className="bg-transparent border-none">
                <img src={prodcompare} alt="" />
              </button>
              <button className="bg-transparent border-none">
                <img src={addcart} alt="" />
              </button>
              <button
                className="bg-transparent border-none"
                onClick={() => navigate(`/product/${product._id}`)}
              >
                <img src={view} alt="" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProduct;
