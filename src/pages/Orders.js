import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrders } from "../features/user/userSlice";

const Orders = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserOrders());
  }, []);

  const ordersState = useSelector((state) => state?.auth?.orders) || [];
  return (
    <main className="bg-[#1565C0]">
      <section className="w-5/6 mx-auto px-3 py-10 min-h-screen bg-[#1565C0] sm:w-full">
        {ordersState &&
          ordersState?.map((order) => (
            <div
              className="bg-white w-full p-3 my-3 min-h-300px border-all"
              key={order._id}
            >
              <h3 className="p-3">{order._id}</h3>

              <div className="p-3 bg-red-400 text-white flex justify-around items-center gap-3 sm:hidden">
                <h4>Product Details</h4>
                <h4>Price</h4>
                <h4>Color</h4>
                <h4>Quantity</h4>
              </div>
              <div>
                {order?.orderItems?.map((item) => (
                  <div key={item?._id}>
                    <div className="flex justify-around items-center gap-3 p-10 border-all sm:flex-col">
                      <div className="flex justify-around items-center gap-0">
                        <div className="w-[150px] h-[150px]">
                          <img
                            src={item?.image}
                            alt="Product image"
                            className="inline-block w-full h-full"
                          />
                        </div>
                        {/* <h5 className="p-3">{item?.product?.title}</h5> */}
                      </div>
                      <h4 className="p-3">{item?.price}</h4>

                      <h4
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                          display: "inline-block",
                          backgroundColor: `${item?.color?.title}`,
                        }}
                      ></h4>

                      <h4 className="p-3">{item?.quantity}</h4>
                    </div>
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
