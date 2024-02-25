import React, { useEffect, useState } from "react";
import { getUserCart } from "../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import { Link } from "react-router-dom";
const Cart = () => {
  const dispatch = useDispatch();

  const [total, setTotal] = useState(0);

  useEffect(() => {
    getAllUserCart();
  }, []);

  const getAllUserCart = () => {
    dispatch(getUserCart());
  };

  const userCart = useSelector((state) => state?.auth?.userCart);
  useEffect(() => {
    let totalC = 0;
    userCart?.forEach((item) => {
      totalC += Number(item.price) * Number(item.quantity);
    });
    setTotal(totalC);
  }, [userCart]);

  return (
    <main className="bg-gray-500 min-h-screen py-5">
      {userCart?.length === 0 ? (
        <section className="w-5/6 mx-auto my-5 p-3 bg-white">
          <h2 className="p-2"> Your Cart is Empty</h2>
        </section>
      ) : (
        <section className="w-5/6 mx-auto my-5 p-3 bg-white">
          <div className="grid grid-cols-[40%_15%_20%_15%] py-10 justify-center bg-white">
            <h4>Product</h4>
            <h4>Price</h4>
            <h4>Quantity</h4>
            <h4>Total</h4>
          </div>
          <div className="flex flex-col gap-16">
            {userCart &&
              userCart?.map((item) => <CartItem item={item} key={item._id} />)}
          </div>
          <div className="flex justify-around items-center">
            <Link to="/ourstore">
              <div className="w-[300px] p-1">
                <button className="inline-block p-2 w-full bg-black text-white rounded-full cursor-pointer">
                  Continue To Shopping
                </button>
              </div>
            </Link>
            <Link to="/checkout">
              <div className="w-[300px] p-1 ">
                <button className="inline-block p-2 w-full bg-black text-white rounded-full cursor-pointer">
                  Place Order
                </button>
              </div>
            </Link>
            <div className="border-all mb-10">
              <h3 className="p-3">Sub Total : Rs. {total}</h3>
              <p className="p-3">
                Taxes and shipping calculated at place order
              </p>
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default Cart;
