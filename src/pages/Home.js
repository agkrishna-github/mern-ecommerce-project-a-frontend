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
import { getUserCart } from "../features/user/userSlice";
import {
  getHomepageDetails,
  getHomepageSubDetails,
} from "../features/homepage/homepageSlice";
import { Carousel, Popover } from "antd";

const contentStyle = {
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

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

const content = (
  <div>
    <p>Content</p>
    <p>Content</p>
  </div>
);

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    getProducts();
  }, []);
  const getProducts = () => {
    dispatch(getAllProductsa());
    dispatch(getUserCart());
  };

  const productState = useSelector((state) => state?.product?.products);
  const homePageDetailsState =
    useSelector((state) => state?.homePageDetails?.homeDetails?.homeDetails) ||
    [];
  const homePageSubDetailsState =
    useSelector((state) => state?.homePageDetails?.homeSubDetails) || [];

  useEffect(() => {
    dispatch(getHomepageDetails());
    dispatch(getHomepageSubDetails());
  }, []);

  return (
    <>
      <section className="bg-blue-300 py-20">
        <div className=" w-[90%] mx-auto grid  grid-cols-2 sm:grid-cols-1 relative gap-5 ">
          <div className="relative shadow-md shadow-black bg-white rounded-md ">
            <Carousel autoplay>
              <div className="w-full rounded h-[400px]">
                <img
                  src={homePageDetailsState[0]?.images[0]}
                  className="w-[300px]"
                  alt="main banner"
                />
              </div>
              <div className="w-[400px] rounded h-[400px]">
                <img
                  src={homePageDetailsState[0]?.images[1]}
                  className="w-[300px]"
                  alt="main banner"
                />
              </div>
              <div className="w-[400px] rounded h-[400px]">
                <img
                  src={homePageDetailsState[0]?.images[2]}
                  className="w-[300px]"
                  alt="main banner"
                />
              </div>
            </Carousel>
            <div className="absolute p-5 w-[320px] flex flex-col gap-6 mt-7 top-0 right-0 sm:bottom-0">
              <p className="text-red-400">
                {homePageDetailsState[0]?.description.substring(0, 35)}
              </p>
              <h2>{homePageDetailsState[0]?.title}</h2>
              <p>
                From &nbsp;
                <span>{homePageDetailsState[0]?.price}</span>
                &nbsp; or
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-8 bg-blue-950 justify-center items-center rounded-md overflow-hidden sm:flex-col sm:w-[300px] sm:p-5">
            {homePageSubDetailsState &&
              homePageSubDetailsState?.homeSubDetails?.map((item) => (
                <div
                  className="rounded-lg overflow-hidden  flex gap-3 shadow-sm shadow-black relative cursor-pointer subDetailsImg"
                  key={item._id}
                >
                  <div className="w-[250px] h-[200px]">
                    <img src={item?.images} className="w-full h-full" />
                  </div>

                  <div className="w-[250px] h-[200px] px-3 py-4 absolute top-0 left-0 bg-white hidden subDetails sm:static">
                    <p className="text-red-400">{item?.subdescription}</p>
                    <h2>{item?.subtitle}</h2>
                    <p>From Rs. {item?.subprice} or</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
      <section className="bg-white flex justify-center items-center h-[200px] sm:hidden">
        <Services services={services} />
      </section>

      <section className="bg-[#1565C0] pb-10">
        <FeaturedProduct productState={productState} />
      </section>
      <section className="bg-gray-300 pb-20">
        <SpecialProducts productState={productState} />;
      </section>
      <section className="bg-[#1565C0] pb-20">
        <PopularProducts productState={productState} />;
      </section>
      <section className="">
        <div className="w-5/6 mx-auto p-1 sm:h-[100px]">
          <Marquee className="flex gap-7">
            <div className="mx-5 sm:mb-16">
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
