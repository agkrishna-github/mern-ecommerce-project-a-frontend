import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProductsa,
  getFilteredProducts,
} from "../features/product/productSlice";
import ProductCard from "../components/ProductCard";
import CategoryComp from "../components/CategoryComp";
import TagComp from "../components/TagComp";
import { IoMenuSharp } from "react-icons/io5";
import BrandComp from "../components/BrandComp";

const OurStore = () => {
  const dispatch = useDispatch();

  const [category, setCategory] = useState(null);
  const [tag, setTag] = useState(null);
  const [brand, setBrand] = useState(null);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getProducts();
  }, []);

  const asideHandler = () => {
    setOpen(!open);
  };

  const getProducts = () => {
    dispatch(getAllProductsa());
  };

  const allProductsState = useSelector((state) => state?.product?.products);
  const searchProductList = useSelector(
    (state) => state?.product?.searchProductList
  );
  const filterProductList = useSelector(
    (state) => state?.product?.filterProductsList
  );
  const [products, setProducts] = useState([]);

  useEffect(() => {
    dispatch(
      getFilteredProducts({ category, tag, brand, minPrice, maxPrice, sort })
    );
  }, [category, tag, brand, minPrice, maxPrice, sort]);

  useEffect(() => {
    setProducts(filterProductList);
  }, [filterProductList]);

  const allcategories = [
    ...new Set(
      allProductsState && allProductsState?.map((item) => item?.category)
    ),
  ];

  const allTags = [
    ...new Set(allProductsState && allProductsState?.map((item) => item?.tags)),
  ];

  const allBrands = [
    ...new Set(
      allProductsState && allProductsState?.map((item) => item?.brand)
    ),
  ];

  return (
    <main className="bg-[#1565C0] sm:min-h-screen">
      <span
        className="text-white py-5 text-2xl z-[1000] sm:absolute sm:left-5 hidden sm:block"
        onClick={asideHandler}
      >
        <IoMenuSharp />
      </span>
      <section className="w-5/6 mx-auto grid  grid-cols-[250px_1fr] sm:grid-cols-1 gap-5 pt-12 sm:relative">
        <aside
          className={
            open
              ? "flex flex-col gap-3 sm:h-screen absolute z-50 bg-white"
              : "flex flex-col gap-3 sm:hidden"
          }
          onClick={() => setOpen(!open)}
        >
          <div className="p-3  bg-white">
            <h3 className="mb-3">Shop By Category</h3>
            <ul className="list-none">
              {allcategories?.map((item, index) => (
                <CategoryComp
                  category={item}
                  key={index}
                  setCategory={setCategory}
                />
              ))}
            </ul>
          </div>
          <div className="p-3 flex flex-col bg-white gap-5">
            <h3>Filter By</h3>
            <h4>Price</h4>
            <div className="mb-3 flex gap-3">
              <div className="p-1">
                <label>From</label>
                <input
                  type="number"
                  className="p-3 w-24 mt-5"
                  id="instock"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
              </div>
              <div className="p-1">
                <label>To</label>
                <input
                  type="number"
                  className="p-3 w-24 mt-5"
                  id="instock"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </div>
            </div>

            <h3>Product Tags</h3>
            <ul className="p-3 list-none flex gap-3 flex-wrap">
              {allTags?.map((item, index) => (
                <TagComp tag={item} key={index} setTag={setTag} />
              ))}
            </ul>
            <h3>Product Brands</h3>
            <ul className="p-3 list-none flex gap-3 flex-wrap">
              {allBrands?.map((item, index) => (
                <BrandComp brand={item} key={index} setBrand={setBrand} />
              ))}
            </ul>
            <div className="p-3">
              <button
                className="p-2 border-all inline-block w-full"
                onClick={() => window.location.reload()}
              >
                Clear Filters
              </button>
            </div>
          </div>
        </aside>

        <article className="">
          <section className="flex justify-between sm:gap-5 items-center bg-white py-4 px-2 mb-5 rounded sm:flex-col">
            <div className="flex justify-center sm:flex-col items-center gap-5 ">
              <p className="p-2">Sort By:</p>
              <select
                name=""
                defaultValue={"manual"}
                className="p-2 rounded"
                id=""
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="">Select</option>
                <option value="title">Alphabetically, A-Z</option>
                <option value="-title">Alphabetically, Z-A</option>
                <option value="price">Price, low to high</option>
                <option value="-price">Price, high to low</option>
                <option value="createdAt">Date, old to new</option>
                <option value="-createdAt">Date, new to old</option>
              </select>
            </div>
            <div>
              <p className="pe-5">
                {products?.length ? products?.length : allProductsState?.length}{" "}
                Products
              </p>
            </div>
          </section>

          <section>
            <div className="flex flex-wrap gap-5">
              {products?.length
                ? products?.map((item) => (
                    <ProductCard product={item} key={item?._id} />
                  ))
                : allProductsState?.map((item) => (
                    <ProductCard product={item} key={item?._id} />
                  ))}
            </div>
          </section>
        </article>
      </section>
    </main>
  );
};

export default OurStore;
