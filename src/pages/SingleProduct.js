import React, { useEffect, useState } from "react";
import ReactImageZoom from "react-image-zoom";
import ReactStars from "react-rating-stars-component";
import compare from "../images/compare.svg";
import wish from "../images/wish.svg";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAproduct } from "../features/product/productSlice";
import { prodAddToCart, getUserCart } from "../features/user/userSlice";
import Color from "../components/Color";

const SingleProduct = () => {
  const { prodId } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getAproduct(prodId));
  }, [prodId]);

  useEffect(() => {
    dispatch(getUserCart());
  }, []);

  const singleProduct = useSelector((state) => state?.product?.singleProduct);
  const userCartState = useSelector((state) => state.auth.userCart);

  const [color, setColor] = useState("");
  const [quantity, setQuantity] = useState(1);

  const alreadyAddedtoCart = userCartState?.find(
    (item) => item?.productId?._id === prodId
  );

  const submitHandler = (e) => {
    e.preventDefault();
  };

  const addToCart = () => {
    dispatch(
      prodAddToCart({
        productId: singleProduct?._id,
        quantity,
        color,
        price: singleProduct?.price,
      })
    );

    setTimeout(() => {
      navigate("/cart");
    }, 200);
  };

  const props = {
    width: 550,
    height: 600,
    zoomWidth: 600,
    // img: singleProduct?.images[0]?.url,
    img: "https://rukminim2.flixcart.com/image/416/416/kokdci80/dslr-camera/v/e/x/z-24-200mm-z5-nikon-original-imag2zuekuxgxsgg.jpeg?q=70&crop=false",
  };

  return (
    <main className="bg-gray-500 py-10">
      <section className="bg-white w-5/6 mx-auto p-3 grid grid-cols-2 ">
        <div className="p-3">
          <div className="">
            <ReactImageZoom {...props} />
          </div>
          <div className="py-2 flex flex-wrap gap-2">
            <div className="w-[250px] h-[250px]">
              <img
                src={singleProduct?.images[0]?.url}
                className="w-full h-full"
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="p-2">
          <div className="flex flex-col gap-3">
            <h4>Rs. {singleProduct?.price}</h4>
            <ReactStars
              count={5}
              size={24}
              value={4}
              edit={false}
              activeColor="#ffd700"
            />
            <div>
              <small>write a review</small>
            </div>
            <div className="mt-5 flex flex-col gap-3">
              <h5>TYPE : {singleProduct?.title}</h5>
              <h5>BRAND : {singleProduct?.brand}</h5>
              <h5>CATEGORY : {singleProduct?.category}</h5>
              <h5>TAGS : {singleProduct?.tags}</h5>
              <h5>AVAILABILITY : In stock</h5>
              <h5>Size :</h5>
              <ul className="list-none flex gap-5">
                <li className="p-2 border-1 bg-gray-500 mx-3 text-white rounded">
                  S
                </li>
                <li className="p-2 border-1 bg-gray-500 text-white mx-3 rounded">
                  M
                </li>
                <li className="p-2 border-1 bg-gray-500 text-white mx-3 rounded">
                  XL
                </li>
                <li className="p-2 border-1 bg-gray-500 text-white mx-3 rounded">
                  XXL
                </li>
              </ul>

              <div className={alreadyAddedtoCart ? "hidden" : ""}>
                <h5>Color : </h5>
                <Color colorData={singleProduct?.color} setColor={setColor} />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className={alreadyAddedtoCart ? "hidden" : ""}>
                  <b>Quantity</b>
                  <input
                    type="number"
                    className="inline-block m-5 w-[80px] p-3"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
                <div className="flex gap-10 items-center justify-center p-3">
                  <button
                    className="p-3 inline-block rounded bg-black text-white"
                    onClick={() =>
                      alreadyAddedtoCart ? navigate("/cart") : addToCart()
                    }
                  >
                    {alreadyAddedtoCart ? "Go To Cart" : "Add To Cart"}
                  </button>
                  <div className={alreadyAddedtoCart ? "hidden" : ""}>
                    <button className="p-3 inline-block rounded bg-black text-white">
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-5 flex gap-3">
                <div className="p-2 cursor-pointer">
                  <img src="" alt="c" className="mx-2" />
                  <small>Add to compare</small>
                </div>
                <div className="p-2 cursor-pointer">
                  <img src={wish} alt="" className="mx-2" />
                  <small>Add to Wishlist</small>
                </div>
              </div>
              <h5>Shippings and Returns</h5>
              <p>
                Free shipping and returns available on all orders. We ship all
                US domestic orders withing <b>5-10 business days</b>
              </p>
              <p className="py-2">Product Link :</p>
              <a>Copy Product Link</a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-500 py-10">
        <div className="w-5/6 mx-auto p-3 bg-white">
          <h3 className="p-3">Description</h3>
          <p className="p-3 bg-white leading-7">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
            assumenda enim, sapiente maiores illo consequatur inventore corrupti
            perferendis deleniti esse.
          </p>
          <div>
            <h3 className="p-3">Reviews</h3>
            <h5 className="p-3">Customer Reviews</h5>
            <div className="flex gap-3 items-center">
              <div className="p-3">
                <ReactStars
                  count={5}
                  size={24}
                  value={4}
                  edit={false}
                  activeColor="#ffd700"
                />
              </div>
              <small className="p-3">Based on 2 reviews</small>
            </div>
            <hr className="w-11/12 mx-auto my-3" />
            <div>
              <h5 className="p-3">Write a Review</h5>
              <form onSubmit={submitHandler} className="p-3">
                <ReactStars
                  count={5}
                  size={24}
                  value={4}
                  edit={false}
                  activeColor="#ffd700"
                />
                <div>
                  <textarea
                    name=""
                    id=""
                    cols="30"
                    rows="5"
                    className="w-full p-3 my-3"
                  ></textarea>
                </div>
                <div className="flex justify-end p-3">
                  <button type="submit" className="button-btn">
                    Submit Reviews
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SingleProduct;
