import React from "react";
import ReactStars from "react-rating-stars-component";

import wish from "../images/wish.svg";

import addcart from "../images/add-cart.svg";
import view from "../images/view.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToWishlist } from "../features/product/productSlice";
import { prodAddToCart } from "../features/user/userSlice";

const FeaturedProduct = ({ productState }) => {
  const FeaturedProducts = productState?.filter(
    (product) => product.tags === "featured"
  );

  /* const productState = useSelector((state) => state?.product?.products);
  useEffect(() => {
    // dispatch(getAproduct(prodId));
    dispatch(getAllProductsa());
  }, [prodId]); */

  const navigate = useNavigate();

  const dispatch = useDispatch();

  return (
    <div className="w-5/6 mx-auto pt-10">
      <h2 className="py-3 mb-4 text-blue-900">Featured Products</h2>
      <div className="flex flex-wrap gap-5">
        {FeaturedProducts &&
          FeaturedProducts?.map((product) => (
            <div
              className="product-card relative bg-white flex flex-col justify-around gap-3 p-5 rounded ease-out duration-300 truncate w-[380px] min-h-[600px] shadow-2xl shadow-black"
              key={product._id}
            >
              <button
                className="border-none absolute right-4 top-3 bg-transparent cursor-pointer"
                onClick={() => dispatch(addToWishlist(product._id))}
                title="Add To Wish List"
              >
                <img src={wish} alt="wishlist" className="w-[20px] h-[20px]" />
              </button>
              <div className="h-[200px] w-[200px]">
                <img
                  src={product?.images[0]?.url}
                  className="w-full h-full"
                  alt="watch"
                />
                {/* <img
                  src={product?.images[0]?.url}
                  className="w-[250px] h-[250px]"
                  alt="watch"
                /> */}
              </div>
              <h5 className="text-wrap">{product.title}</h5>
              <p className="text-wrap">
                {product.description.substring(0, 40)}...
              </p>
              <ReactStars
                count={5}
                size={24}
                value={product?.totalratings}
                edit={false}
                activeColor="#ffd700"
              />
              <p>Rs. {product?.price}</p>

              <p>Products: {product?.quantity}</p>

              <div>
                <button
                  className="button-btn cursor-pointer"
                  onClick={() => navigate(`/product/${product._id}`)}
                >
                  Add to Cart
                </button>
              </div>

              <div className="action-bar flex flex-col mt-3 gap-5 absolute right-[-40px] top-12">
                <button
                  className="bg-transparent border-none cursor-pointer"
                  title="Add To Cart"
                >
                  <img src={addcart} alt="Add to Cart Image" />
                </button>
                <button
                  className="bg-transparent border-none cursor-pointer"
                  title="View Product"
                  onClick={() => navigate(`/product/${product._id}`)}
                >
                  <img src={view} alt="View Image" />
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default FeaturedProduct;
