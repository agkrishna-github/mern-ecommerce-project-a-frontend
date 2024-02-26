import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserCart, clearUserCart } from "../features/user/userSlice";
import { Link } from "react-router-dom";
import axios from "axios";
import { config } from "../utils/axiosConfig";
import { createOrder, getUserOrders } from "../features/user/userSlice";

const CheckOut = () => {
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [other, setOther] = useState("");
  const [pincode, setPincode] = useState("");
  const [totalAmount, setTotalAmount] = useState(50000);
  const [paymentInfo, setPaymentInfo] = useState({
    razorpayPaymentId: "545454165659898",
    razorpayOrderId: "565895654651325",
  });

  const [cartProductState, setCartProductState] = useState([]);

  /*
    ---------- above for example ----------------
    
  const [paymentInfo, setPaymentInfo] = useState({
    razorpayPaymentId: "",
    razorpayOrderId: "",
  }); */

  useEffect(() => {
    dispatch(getUserCart());
  }, []);

  const cartItemsState = useSelector((state) => state?.auth?.userCart);
  const userOrderState = useSelector((state) => state?.auth?.orders);
  useEffect(() => {
    let totalC = 0;
    cartItemsState?.forEach((item) => {
      totalC += Number(item.price) * Number(item.quantity);
    });
    setTotal(totalC);
  }, [cartItemsState]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createOrder({
        totalPrice: totalAmount,
        totalPriceAfterDiscount: totalAmount,
        orderItems: cartProductState,
        paymentInfo,
        shippingInfo: {
          firstName,
          lastName,
          address,
          state,
          city,
          country,
          pincode,
          other,
        },
      })
    );

    setTotal(0);
    setFirstName("");
    setLastName("");
    setAddress("");
    setCity("");
    setState("");
    setCountry("");
    setOther("");
    setPincode("");

    setTimeout(() => {
      dispatch(getUserOrders());
      // dispatch(clearUserCart());
      dispatch(getUserCart());
    }, 200);
  };
  /* 
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      document.body.appendChild(script);
    });
  };
 */
  useEffect(() => {
    const items = cartItemsState?.map((item) => {
      return {
        product: item?._id,
        title: item?.productId?.title,
        quantity: item?.quantity,
        color: item?.color?._id,
        price: item?.price,
        image: item?.productId?.images[0]?.url,
      };
    });
    setCartProductState(items);
  }, [cartItemsState]);

  /* 
  const checkOutHandler = async () => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      alert("Razorpay SDK failed to Load");
      return;
    }
    const result = await axios.post(
      "http://localhost:5000/api/user/order/checkout",
      {amount: totalAmount},
      config
    );
    const { amount, id: order_id, currency } = result.data.order;
    const options = {
      key: "rzp_test_r6FiJfddJh76SI", // Enter the Key ID generated from the Dashboard
      amount: amount,
      currency: currency,
      name: "Soumya Corp.",
      description: "Test Transaction",
      image: { logo },
      order_id: order_id,
      handler: async function (response) {
        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
        };

        const result = await axios.post(
          "http://localhost:5000/api/user/order/paymentVerification",
          data,
          config
        );

        setPaymentInfo({
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
        });

        dispatch(createAnOrder({
            totalPrice: totalAmount,
            totalPriceAfterDiscount: totalAmount,
            orderItems: cartProductState,
            paymentInfo,
            shippingInfo

        }))
      },
      prefill: {
        name: "Soumya Dey",
        email: "SoumyaDey@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Soumya Dey Corporate Office",
      },
      theme: {
        color: "#61dafb",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };
 */
  return (
    <main>
      <section className="p-3 w-11/12 mx-auto grid grid-cols-[50%_50%] sm:flex sm:flex-col">
        <article className="p-3">
          <h2 className="py-2">Contact Information</h2>
          <p className="py-2">krishcart@gmail.com</p>
          <h2 className="py-2">Shipping Address</h2>
          <form onSubmit={handleSubmit} className="py-2 grid grid-cols-2 gap-5">
            <select
              name="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              id=""
              className="py-2 col-span-2"
            >
              <option value="">Select Country</option>
              <option value="india">India</option>
            </select>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="py-2"
              placeholder="First Name"
            />
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="py-2"
              placeholder="Last Name"
            />
            <input
              type="text"
              className="col-span-2 py-2"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="City"
              className="py-2"
            />
            <input
              type="text"
              value={other}
              onChange={(e) => setOther(e.target.value)}
              placeholder="Other"
              className="py-2"
            />
            <select
              name="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
              id=""
              className="py-2"
            >
              <option value="">Select State</option>
              <option value="Telangana">Telangana</option>
            </select>
            <input
              type="number"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              placeholder="Zipcode"
              className="py-2"
            />
            <Link className="button-btn w-[200px] no-underline" to="/cart">
              - Return To Cart
            </Link>
            <button type="button" className="button-btn">
              Continue To Shopping
            </button>
            <button
              type="submit"
              className="button-btn"
              // onClick={() => checkOutHandler()}
            >
              Place Order
            </button>
          </form>
        </article>

        <article className="p-5">
          {cartProductState &&
            cartProductState?.map((item) => (
              <section
                className="p-3 flex gap-2 justify-around items-center mt-3 mb-3 shadow-sm shadow-black sm:flex-col"
                key={item?.id}
              >
                <div className="flex gap sm:flex-col sm:p-5">
                  <div className="flex gap-3 w-[100px] h-[100px] relative">
                    <img src={item?.image} alt="" className="w-full h-full" />
                    <span className="absolute -top-4 rounded-2xl right-0 bg-black text-white p-2">
                      {item?.quantity}
                    </span>
                  </div>
                  <div className="p-3 w-[400px]">
                    <p className="p-3">{item?.title}</p>
                    <p className="p-3">{item?.color}</p>
                  </div>
                </div>
                <div>
                  <p>Rs. {item?.price * item?.quantity}</p>
                </div>
              </section>
            ))}

          <div className="flex  p-2 justify-between">
            <p className="p-2">Sub Total</p>
            <p className="p-2">Rs. {total}</p>
          </div>
          <div className="flex  p-2 justify-between">
            <p className="p-2">Shipping</p>
            <p className="p-2">Rs. 5</p>
          </div>
          <div className="flex p-2 justify-between border-all sm:mb-10">
            <h4 className="p-2">Total</h4>
            <h4 className="p-2">Rs. {total + 5}</h4>
          </div>
        </article>
      </section>
    </main>
  );
};

export default CheckOut;
