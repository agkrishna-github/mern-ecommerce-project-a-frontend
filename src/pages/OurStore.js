import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsa } from "../features/product/productSlice";
import ProductCard from "../components/ProductCard";
import CategoryComp from "../components/CategoryComp";
import TagComp from "../components/TagComp";

import gr4 from "../images/gr4.svg";
import gr3 from "../images/gr3.svg";
import gr2 from "../images/gr2.svg";
import gr from "../images/gr.svg";
import BrandComp from "../components/BrandComp";

const OurStore = () => {
  const dispatch = useDispatch();

  const [category, setCategory] = useState("");
  const [tag, setTag] = useState("");
  const [brand, setBrand] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    getProducts();
  }, [sort, tag, brand, category, minPrice, maxPrice]);

  const getProducts = () => {
    dispatch(
      getAllProductsa({ sort, tag, brand, category, minPrice, maxPrice })
    );
  };

  console.log(sort);

  const allProductsState = useSelector((state) => state?.product?.products);

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
    <main className="bg-stone-300">
      <section className="w-5/6 mx-auto grid grid-cols-[250px_1fr] gap-5 pt-12">
        <aside className="flex flex-col gap-3">
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
          </div>
        </aside>

        <article>
          <section className="flex justify-between items-center bg-white py-4 px-2 mb-5 rounded">
            <div className="flex justify-center items-center gap-5">
              <p className="p-2">Sort By:</p>
              <select
                name=""
                defaultValue={"manual"}
                className="p-2 rounded"
                id=""
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="title">Alphabetically, A-Z</option>
                <option value="-title">Alphabetically, Z-A</option>
                <option value="price">Price, low to high</option>
                <option value="-price">Price, high to low</option>
                <option value="createdAt">Date, old to new</option>
                <option value="-createdAt">Date, new to old</option>
              </select>
            </div>
            <div>
              {/* <p className="pe-5">{categories?.length} Products</p> */}
            </div>
          </section>

          <section>
            <div className="flex flex-wrap gap-5">
              {allProductsState &&
                allProductsState?.map((item) => (
                  <ProductCard product={item} key={item._id} />
                ))}
            </div>
          </section>
        </article>
      </section>
    </main>
  );
};

export default OurStore;
