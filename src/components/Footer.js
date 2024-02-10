import React from "react";

const Footer = () => {
  return (
    <footer>
      <section className="bg-slate-500 text-white">
        <div className="w-5/6 mx-auto flex items-start">
          <p>Sign up for News Letter</p>
          <div className="flex">
            <input
              type="text"
              className="w-1/3"
              placeholder="Your Email Address"
            />
            <button>Subscribe</button>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
