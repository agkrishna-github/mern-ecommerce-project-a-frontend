import React, { useEffect, useState } from "react";

import wishlist from "../images/wishlist.svg";
import user from "../images/user.svg";
import cart from "../images/cart.svg";
import menu from "../images/menu.svg";
import { BsSearch } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { getUserCart } from "../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { searchProducts } from "../features/product/productSlice";
import { ImMenu } from "react-icons/im";

const Header = () => {
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);
  const [profile, setProfile] = useState(true);
  const [auth, setAuth] = useState(false);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (search) {
      dispatch(searchProducts(search));
    }
  }, [search]);

  const hideHandler = () => {
    setOpen(!open);
  };

  const searchProductList = useSelector(
    (state) => state?.product?.searchProductsList
  );
  const authState = useSelector((state) => state?.auth);

  useEffect(() => {
    dispatch(getUserCart());
  }, []);

  const { userCart } = useSelector((state) => state?.auth);

  const logOutHandler = () => {
    localStorage.clear();
    window.location.reload();
    navigate("/login");
  };

  useEffect(() => {
    let totalC = 0;
    userCart?.forEach((item) => {
      totalC += Number(item.price) * Number(item.quantity);
    });
    setTotal(totalC);
  }, []);

  const getAproduct = (id) => {
    navigate(`product/${id}`);
    setSearch("");
  };

  return (
    <header className="bg-[#1565C0]">
      <section className="ps-16 sm:ps-0 ">
        <div className="grid grid-cols-2 sm:grid-cols-1 sm:relative">
          <div className="flex justify-center items-center flex-wrap sm:flex-col py-10 -skew-x-[25deg] sm:skew-x-0  bg-white text-black">
            <Link to="/" className="no-underline">
              <h1 className="py-2 pe-2 me-5">Krish Cart</h1>
            </Link>
            <div className="flex flex-wrap relative skew-x-[25deg] sm:skew-x-0 sm:my-10">
              <input
                type="text"
                className="p-3 w-80 outline-none sm:w-64"
                placeholder="Search Product Here..."
                aria-label="Search Product Here..."
                aria-describedby="basic-addon2"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <span
                className="text-lg p-2 bg-amber-500 text-white"
                id="basic-addon2"
              >
                <BsSearch className="text-lg" />
              </span>
              <div
                className={
                  search
                    ? "p-3 border-all w-[400px] min-h-[50px] sm:w-[290px] absolute top-8 left-0 bg-white last:[border-bottom:none]"
                    : "hidden"
                }
              >
                {searchProductList &&
                  searchProductList?.map((product) => (
                    <div
                      className="p-1 border-bottom text-black cursor-pointer "
                      key={product?._id}
                      onClick={() => getAproduct(product?._id)}
                    >
                      {product?.title.substring(0, 40)}
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center sm:w-full flex-wrap gap-5 sm:gap-2 -skew-x-[25deg] sm:skew-x-[0deg] relative bg-[#1565C0] sm:fixed sm:bottom-0 sm:z-50">
            <div className="flex justify-center items-center flex-wrap gap-2 sm:gap-1 profile-img skew-x-[25deg] sm:-skew-x-[0deg]">
              <img src={wishlist} alt="wishlist image" />
              <Link to="/wishlist" className=" no-underline">
                <h5 className="text-white">
                  Favorite <br /> Wishlist
                </h5>
              </Link>
            </div>
            <Link
              to={authState?.user !== null ? "" : "/login"}
              className="no-underline"
            >
              <div className="flex justify-center items-center flex-wrap gap-2 sm:gap-1 relative border-all p-3 profile text-white border-all-white skew-x-[25deg] sm:-skew-x-[0deg]">
                <img src={user} alt="user image" />

                {authState?.user !== null ? (
                  <h5>
                    Welcome <br /> {authState?.user?.firstname}
                  </h5>
                ) : (
                  <h5>
                    Log In <br /> My Account
                  </h5>
                )}
              </div>
            </Link>

            <Link to="/cart" className="no-underline ">
              <div
                className={
                  authState?.user !== null
                    ? "flex justify-center items-center flex-wrap gap-2 sm:gap-1 px-3 sm:px-2 border-all-white skew-x-[25deg] sm:-skew-x-[0deg]"
                    : "hidden"
                }
              >
                <img src={cart} alt="cart image" />

                <div className="flex flex-col flex-wrap gap-3">
                  <span className="text-center bg-[#F59E0B] text-white rounded p-1">
                    {userCart?.length ? userCart?.length : "0"}
                  </span>
                  <p className="text-white">Rs. {total}</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-slate-700 text-white ">
        <div className="w-5/6 mx-auto flex gap-10 sm:justify-center sm:w-full items-center sm:flex-col sm:mx-0 sm:py-3">
          <div className="hidden  sm:block text-3xl" onClick={hideHandler}>
            <ImMenu />
          </div>
          <ul
            className={
              open
                ? "list-none flex items-center gap-5 flex-wrap min-h-14 sm:flex-col"
                : "list-none flex items-center gap-5 flex-wrap min-h-14 sm:flex-col sm:hidden"
            }
          >
            <Link to="/" className="no-underline text-white">
              <li onClick={() => setOpen(!open)}>HOME</li>
            </Link>
            <Link to="/ourstore" className="no-underline text-white">
              <li onClick={() => setOpen(!open)}>OUR STORE</li>
            </Link>

            <Link to="/contact" className="no-underline text-white">
              <li onClick={() => setOpen(!open)}>CONTACT</li>
            </Link>
            <Link to="/orders" className="no-underline text-white">
              <li onClick={() => setOpen(!open)}>MY ORDERS</li>
            </Link>
          </ul>
          <div
            className={
              authState?.user !== null
                ? "bg-white text-black rounded p-2  h-10 cursor-pointer"
                : "hidden"
            }
            onClick={() => logOutHandler()}
          >
            Logout
          </div>
        </div>
      </section>
    </header>
  );
};

export default Header;
