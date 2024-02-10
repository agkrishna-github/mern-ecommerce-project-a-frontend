import React from "react";
import compare from "../images/compare.svg";
import wishlist from "../images/wishlist.svg";
import user from "../images/user.svg";
import cart from "../images/cart.svg";
import menu from "../images/menu.svg";
import { BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";

const Header = () => {
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
          <div className="flex justify-center items-center flex-wrap">
            <Link to="/" className="no-underline text-white">
              <h1 className="py-2 pe-2 me-5">Krish Corner</h1>
            </Link>
            <div className="flex flex-wrap">
              <input
                type="text"
                className="p-3 w-80 outline-none"
                placeholder="Search Product Here..."
                aria-label="Search Product Here..."
                aria-describedby="basic-addon2"
              />
              <span
                className="text-lg p-2 bg-amber-500 text-white"
                id="basic-addon2"
              >
                <BsSearch className="text-lg" />
              </span>
            </div>
          </div>
          <div className="flex justify-between items-center flex-wrap gap-5">
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
            <Link to="/login" className="no-underline text-white">
              <div className="flex justify-center items-center flex-wrap gap-2">
                <img src={user} alt="user image" />

                <h5>
                  Log In <br /> My Account
                </h5>
              </div>
            </Link>
            <div className="flex justify-center items-center flex-wrap gap-2">
              <img src={cart} alt="cart image" />

              <div className="flex flex-col flex-wrap gap-3">
                <span className="text-center rounded p-1 bg-white text-black">
                  0
                </span>
                <p>Rs. 500</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-slate-700 text-white">
        <ul className="w-5/6 mx-auto list-none flex items-center gap-5 flex-wrap min-h-14">
          <Link to="/" className="no-underline text-white">
            <li>HOME</li>
          </Link>
          <Link to="/ourstore" className="no-underline text-white">
            <li>OUR STORE</li>
          </Link>
          <Link to="/blog" className="no-underline text-white">
            <li>BLOGS</li>
          </Link>
          <li>CONTACT</li>
        </ul>
      </section>
    </header>
  );
};

export default Header;
