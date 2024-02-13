import React, { useEffect, useState } from "react";
import { getUserCart } from "../features/user/userSlice";
import { UpdateQuantity, deleteUsercart } from "../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
const Cart = () => {
  const dispatch = useDispatch();

  const [qtyUpdateDetails, setQtyUpdateDetails] = useState(null);
  const [quantity, setQuantity] = useState(null);
  useEffect(() => {
    dispatch(getUserCart());
  }, []);

  const userCart = useSelector((state) => state.auth.userCart);
  useEffect(() => {
    if (qtyUpdateDetails !== null) {
      dispatch(UpdateQuantity(qtyUpdateDetails));
    }
    setTimeout(() => {
      dispatch(getUserCart());
    }, 200);
  }, [qtyUpdateDetails]);

  const deleteCartUser = (id) => {
    dispatch(deleteUsercart(id));

    setTimeout(() => {
      dispatch(getUserCart());
    }, 200);
  };

  return (
    <main className="bg-gray-500 h-screen py-5">
      <section className="w-5/6 mx-auto my-5 p-3 bg-white">
        <div className="grid grid-cols-[40%_15%_20%_15%] py-10 justify-center bg-white">
          <h4>Product</h4>
          <h4>Price</h4>
          <h4>Quantity</h4>
          <h4>Total</h4>
        </div>
        <div className="flex flex-col gap-16">
          {userCart &&
            userCart?.map((item) => (
              <div
                className="grid grid-cols-[40%_15%_20%_15%] p-3 gap-10 justify-center items-center bg-white"
                key={item?._id}
              >
                <div className="flex gap-2 items-center">
                  <div className="w-[150px] h-[150px]">
                    <img
                      className="w-full h-full inline-block"
                      src={item?.productId?.images[0]?.url}
                      alt="product image"
                    />
                  </div>
                  <div>
                    <p>{item?.productId?.brand}</p>
                    <p>Size: hgd</p>
                    <p>
                      Color:
                      <span
                        style={{
                          backgroundColor: item?.color?.title,
                          width: "50px",
                          height: "50px",
                          display: "inline-block",
                        }}
                      ></span>
                    </p>
                  </div>
                </div>
                <h5>Rs. {item?.price}</h5>
                <div className="flex gap-10 items-center">
                  <input
                    type="number"
                    className="w-16 h-10 text-2xl"
                    value={
                      qtyUpdateDetails?.quantity
                        ? qtyUpdateDetails?.quantity
                        : item?.quantity
                    }
                    onChange={(e) =>
                      setQtyUpdateDetails({
                        cartItemId: item?._id,
                        quantity: e.target.value,
                      })
                    }
                  />
                  <button
                    className="p-2"
                    onClick={() => deleteCartUser(item?._id)}
                  >
                    Delete
                  </button>
                </div>
                <div className="">
                  <h5>Rs. {item?.quantity * item?.price}</h5>
                </div>
              </div>
            ))}
        </div>
      </section>
    </main>
  );
};

export default Cart;
