import React, { useEffect, useState } from "react";
import { UpdateQuantity, deleteUsercart } from "../features/user/userSlice";
import { useDispatch } from "react-redux";
import { getUserCart } from "../features/user/userSlice";

const CartItem = ({ item }) => {
  const [qtyUpdateDetails, setQtyUpdateDetails] = useState(null);

  const dispatch = useDispatch();
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
    <div
      className="grid grid-cols-[40%_15%_20%_15%] p-3 gap-10 justify-center items-center bg-white sm:grid-cols-1 sm:border-b-2 sm:mb-5"
      key={item?._id}
    >
      <div className="flex gap-2 items-center">
        <div className="w-[150px] h-[150px]">
          <img
            className="w-full h-full inline-block p-3"
            src={item?.productId?.images[0]?.url}
            alt="product image"
          />
        </div>
        <div>
          <p className="p-2">Brand : {item?.productId?.brand}</p>
          <p className="p-2">Size: hgd</p>
          <p className="p-2 me-3">Color:</p>
          <span
            style={{
              backgroundColor: item?.color?.title,
              width: "30px",
              height: "30px",
              display: "inline-block",
              borderRadius: "50%",
            }}
          ></span>
        </div>
      </div>
      <h5>Rs. {item?.price}</h5>
      <div className="flex gap-10 items-center">
        <input
          type="number"
          min="1"
          max="10"
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
        <button className="p-2" onClick={() => deleteCartUser(item?._id)}>
          Delete
        </button>
      </div>
      <div className="">
        <h5>Rs. {item?.quantity * item?.price}</h5>
      </div>
      <div className="w-full h-2 bg-black"></div>
    </div>
  );
};

export default CartItem;
