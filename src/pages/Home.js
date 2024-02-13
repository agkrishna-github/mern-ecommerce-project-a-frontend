import React, { useEffect } from "react";
import mainbanner from "../images/main-banner-1.jpg";
import catbanner1 from "../images/catbanner-01.jpg";
import catbanner2 from "../images/catbanner-02.jpg";
import catbanner3 from "../images/catbanner-03.jpg";
import catbanner4 from "../images/catbanner-04.jpg";
import brand1 from "../images/brand-01.png";
import brand2 from "../images/brand-02.png";
import brand3 from "../images/brand-03.png";
import brand4 from "../images/brand-04.png";
import brand5 from "../images/brand-05.png";
import brand6 from "../images/brand-06.png";
import brand7 from "../images/brand-07.png";
import brand8 from "../images/brand-08.png";
import camera from "../images/camera.jpg";
import watch from "../images/watch.jpg";
import watch1 from "../images/watch-1.jpg";
import wish from "../images/wish.svg";
import prodcompare from "../images/prodcompare.svg";
import addcart from "../images/add-cart.svg";
import view from "../images/view.svg";
import ReactStars from "react-rating-stars-component";
import Marquee from "react-fast-marquee";
import { getAllProductsa } from "../features/product/productSlice";
import { useDispatch, useSelector } from "react-redux";
import Services from "../components/Services";
import service from "../images/service.png";
import service2 from "../images/service-02.png";
import service3 from "../images/service-03.png";
import service4 from "../images/service-04.png";
import SpecialProducts from "../components/SpecialProducts";
import PopularProducts from "../components/PopularProducts";
import FeaturedProduct from "../components/FeaturedProduct";
// import service5 from "../images/service-05.png";

const services = [
  {
    title: "Free shipping",
    description: "From all orders over rs.50",
    img: service,
  },
  {
    title: "Free shipping",
    description: "From all orders over rs.50",
    img: service2,
  },
  {
    title: "Free shipping",
    description: "From all orders over rs.50",
    img: service3,
  },
  {
    title: "Free shipping",
    description: "From all orders over rs.50",
    img: service4,
  },
];

const Home = () => {
  const dispatch = useDispatch();

  const getProducts = () => {
    dispatch(getAllProductsa());
  };

  useEffect(() => {
    getProducts();
  }, []);
  const productState = useSelector((state) => state.product.products);
  console.log(productState);

  return (
    <>
      <section className="mb-16">
        <div className=" w-5/6 mx-auto grid  grid-cols-2 mt-16 relative">
          <img
            src={mainbanner}
            className="object-cover w-[600px] rounded h-[400px]"
            alt="main banner"
          />
          <div className="absolute p-5 flex flex-col gap-6 mt-7">
            <p className="text-red-400">SUPERCHARGED FOR PROS</p>
            <h2 className="text-4xl ">iPad S13+ Pro.</h2>
            <p>From rs.900 or</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <div className="relative">
              <img src={catbanner1} className="w-[300px] h-[200px]" />
              <div className="absolute top-0 left-0 flex flex-col gap-6 mt-7">
                <p className="text-red-400">SUPERCHARGED FOR PROS</p>
                <h2>iPad S13+ Pro.</h2>
                <p>From rs.900 or</p>
              </div>
            </div>
            <div className="relative">
              <img src={catbanner2} className="w-[300px] h-[200px]" />
              <div className="absolute top-0 left-0 flex flex-col gap-6 mt-7">
                <p className="text-red-400">SUPERCHARGED FOR PROS</p>
                <h2>iPad S13+ Pro.</h2>
                <p>From rs.900 or</p>
              </div>
            </div>
            <div className="relative">
              <img
                src={catbanner3}
                className="w-[300px] h-[200px]"
                alt="cat banner"
              />
              <div className="absolute top-0 left-0 flex flex-col gap-6 mt-7">
                <p className="text-red-400">SUPERCHARGED FOR PROS</p>
                <h2>iPad S13+ Pro.</h2>
                <p>From rs.900 or</p>
              </div>
            </div>
            <div className="relative">
              <img
                src={catbanner4}
                className="w-[300px] h-[200px]"
                alt="cat banner"
              />
              <div className="absolute top-0 left-0 flex flex-col gap-6 mt-7">
                <p className="text-red-400">SUPERCHARGED FOR PROS</p>
                <h2>iPad S13+ Pro.</h2>
                <p>From rs.900 or</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-gray-300 flex justify-center items-center h-[300px]">
        <Services services={services} />
      </section>
      <section className="bg-gray-300 min-h-[600px] flex justify-center items-center">
        <div className="w-5/6 mx-auto bg-white flex items-center flex-wrap gap-9 p-7 min-h-[500px]">
          <div className="flex justify-center items-center gap-4 border-bottom border-right pe-2 pb-2">
            <div>
              <h5>Music & Gaming</h5>
              <p>10 Items</p>
            </div>
            <img src={camera} className="w-[130px] h-[150px]" alt="" />
          </div>
          <div className="flex justify-center items-center gap-4 border-bottom border-right pe-2 pb-2">
            <div>
              <h5>Music & Gaming</h5>
              <p>10 Items</p>
            </div>
            <img src={camera} className="w-[130px] h-[150px]" alt="" />
          </div>
          <div className="flex justify-center items-center gap-4 border-bottom border-right pe-2 pb-2">
            <div>
              <h5>Music & Gaming</h5>
              <p>10 Items</p>
            </div>
            <img src={camera} className="w-[130px] h-[150px]" alt="" />
          </div>
          <div className="flex justify-center items-center gap-4 border-bottom border-right pe-2 pb-2">
            <div>
              <h5>Music & Gaming</h5>
              <p>10 Items</p>
            </div>
            <img src={camera} className="w-[130px] h-[150px]" alt="" />
          </div>
          <div className="flex justify-center items-center gap-4 border-bottom border-right pe-2 pb-2">
            <div>
              <h5>Music & Gaming</h5>
              <p>10 Items</p>
            </div>
            <img src={camera} className="w-[130px] h-[150px]" alt="" />
          </div>
          <div className="flex justify-center items-center gap-4 border-bottom border-right pe-2 pb-2">
            <div>
              <h5>Music & Gaming</h5>
              <p>10 Items</p>
            </div>
            <img src={camera} className="w-[130px] h-[150px]" alt="" />
          </div>
          <div className="flex justify-center items-center gap-4 border-bottom border-right pe-2 pb-2">
            <div>
              <h5>Music & Gaming</h5>
              <p>10 Items</p>
            </div>
            <img src={camera} className="w-[130px] h-[150px]" alt="" />
          </div>
          <div className="flex justify-center items-center gap-4 border-bottom border-right pe-2 pb-2">
            <div>
              <h5>Music & Gaming</h5>
              <p>10 Items</p>
            </div>
            <img src={camera} className="w-[130px] h-[150px]" alt="" />
          </div>
        </div>
      </section>
      <section className="bg-gray-300 pb-10">
        <FeaturedProduct productState={productState} />
      </section>
      <section className="bg-gray-300 pb-20">
        <SpecialProducts productState={productState} />;
      </section>
      <section className="bg-gray-300 pb-20">
        <PopularProducts productState={productState} />;
      </section>
      <section>
        <div className="w-5/6 mx-auto p-1">
          <Marquee className="flex gap-7">
            <div className="mx-5">
              <img src={brand1} alt="brand" />
            </div>
            <div className="mx-5">
              <img src={brand2} alt="brand" />
            </div>
            <div className="mx-5">
              <img src={brand3} alt="brand" />
            </div>
            <div className="mx-5">
              <img src={brand4} alt="brand" />
            </div>
            <div className="mx-5">
              <img src={brand5} alt="brand" />
            </div>
            <div className="mx-5">
              <img src={brand6} alt="brand" />
            </div>
            <div className="mx-5">
              <img src={brand7} alt="brand" />
            </div>
            <div className="mx-5">
              <img src={brand8} alt="brand" />
            </div>
          </Marquee>
        </div>
      </section>
    </>
  );
};

export default Home;
