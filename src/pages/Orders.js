import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrders } from "../features/user/userSlice";

const Orders = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserOrders());
  }, []);

  const ordersState = useSelector((state) => state.auth.orders);
  return (
    <main>
      <section className="w-5/6 mx-auto my-10 p-3 min-h-screen bg-gray-500">
        {ordersState &&
          ordersState?.map((item) => (
            <div className="bg-white w-full p-3 min-h-300px" key={item._id}>
              <h3 className="p-3">{item._id}</h3>

              <div className="p-3 bg-red-400 text-white flex justify-around items-center gap-3">
                <h4>Product Details</h4>
                <h4>Price</h4>
                <h4>Color</h4>
                <h4>Quantity</h4>
              </div>

              <div>
                {item?.orderItems?.map((item) => (
                  <div
                    key={item?._id}
                    className="flex justify-around items-center gap-3 p-10 border-all"
                  >
                    <div className="flex justify-around items-center gap-0">
                      <div className="w-[150px] h-[150px]">
                        <img
                          src={item?.product?.images[0]?.url}
                          alt="Product image"
                          className="inline-block w-full h-full"
                        />
                      </div>
                      <h5 className="p-3">{item?.product?.brand}</h5>
                    </div>
                    <h4 className="p-3">{item?.price}</h4>
                    <h4 className="p-3">{item?.color}</h4>
                    <h4 className="p-3">{item?.quantity}</h4>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </section>
    </main>
  );
};

export default Orders;
