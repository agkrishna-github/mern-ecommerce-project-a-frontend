import React, { useEffect, useState } from "react";
import compare from "../images/compare.svg";
import wishlist from "../images/wishlist.svg";
import user from "../images/user.svg";
import cart from "../images/cart.svg";
import menu from "../images/menu.svg";
import { BsSearch } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { getUserCart } from "../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { searchProducts } from "../features/product/productSlice";

const Header = () => {
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);
  const [profile, setProfile] = useState(true);
  const [auth, setAuth] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (search) {
      dispatch(searchProducts(search));
    }
  }, [search]);

  const searchProductList = useSelector(
    (state) => state?.product?.searchProductsList
  );
  console.log(searchProductList);
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
    <header className="">
      <section className="bg-black text-white">
        <div className="w-5/6 mx-auto flex justify-between flex-wrap items-center min-h-12">
          <p>Free shipping over Rs.100 & Free returns</p>
          <p className="">
            Hotline : &nbsp;
            <a className="text-white no-underline" href="tel:+91 999999999">
              +91 999999999
            </a>
          </p>
        </div>
      </section>
      <section className="bg-black text-white">
        <div className="w-5/6 mx-auto flex justify-between flex-wrap min-h-28">
          <div className="flex justify-center items-center flex-wrap ">
            <Link to="/" className="no-underline text-white">
              <h1 className="py-2 pe-2 me-5 ">Krish Corner</h1>
            </Link>
            <div className="flex flex-wrap relative">
              <input
                type="text"
                className="p-3 w-80 outline-none"
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
                    ? "p-3 border-all w-[400px] min-h-[50px] absolute top-8 left-0 bg-white last:[border-bottom:none]"
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
          <div className="flex justify-between items-center flex-wrap gap-5 relative">
            <div className="flex justify-center items-center flex-wrap gap-2">
              <img src={compare} alt="compare image" />

              <h5>
                Compare <br /> Products
              </h5>
            </div>
            <div className="flex justify-center items-center flex-wrap gap-2">
              <img src={wishlist} alt="wishlist image" />
              <Link to="/wishlist" className="text-white no-underline">
                <h5>
                  Favorite <br /> Wishlist
                </h5>
              </Link>
            </div>
            <Link
              to={authState?.user !== null ? "" : "/login"}
              className="no-underline text-white"
            >
              <div className="flex justify-center items-center flex-wrap gap-2 relative">
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

            <Link to="/cart" className="no-underline text-white">
              <div className="flex justify-center items-center flex-wrap gap-2">
                <img src={cart} alt="cart image" />

                <div className="flex flex-col flex-wrap gap-3">
                  <span className="text-center rounded p-1 bg-white text-black">
                    {userCart?.length ? userCart?.length : "0"}
                  </span>
                  <p>Rs. {total}</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
      <section className="bg-slate-700 text-white ">
        <div className="w-5/6 mx-auto flex gap-10 items-center">
          <ul className="list-none flex items-center gap-5 flex-wrap min-h-14">
            <Link to="/" className="no-underline text-white">
              <li>HOME</li>
            </Link>
            <Link to="/ourstore" className="no-underline text-white">
              <li>OUR STORE</li>
            </Link>
            <Link to="/blog" className="no-underline text-white">
              <li>BLOGS</li>
            </Link>
            <Link to="/contact" className="no-underline text-white">
              <li>CONTACT</li>
            </Link>
            <Link to="/orders" className="no-underline text-white">
              <li>MY ORDERS</li>
            </Link>
          </ul>
          <div
            className="bg-white text-black rounded p-2  h-10 cursor-pointer"
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
