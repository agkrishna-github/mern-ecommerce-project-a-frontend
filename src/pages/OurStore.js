import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsa } from "../features/product/productSlice";
import ProductCard from "../components/ProductCard";
import gr4 from "../images/gr4.svg";
import gr3 from "../images/gr3.svg";
import gr2 from "../images/gr2.svg";
import gr from "../images/gr.svg";

const OurStore = () => {
  const [grid, setGrid] = useState(300);
  const dispatch = useDispatch();
  const allProductsState = useSelector((state) => state?.product?.products);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    dispatch(getAllProductsa());
  };

  return (
    <main className="bg-stone-300">
      <section className="w-5/6 mx-auto grid grid-cols-[250px_1fr] gap-5 pt-12">
        <aside className="flex flex-col gap-3">
          <div className="p-3  bg-white">
            <h3 className="mb-3">Shop By Category</h3>
            <ul className="list-none">
              <li className="mb-2">Watch</li>
              <li className="mb-2">Tv</li>
              <li className="mb-2">Camera</li>
              <li className="mb-2">Laptop</li>
            </ul>
          </div>
          <div className="p-3 flex flex-col bg-white gap-5">
            <h3>Filter By</h3>
            <h4>Availability</h4>
            <form action="">
              <div className="mb-3">
                <input type="checkbox" id="instock" />
                &nbsp;
                <label htmlFor="instock">In Stock [1]</label>
              </div>
              <div>
                <input type="checkbox" id="outofstock" />
                &nbsp;
                <label htmlFor="outofstock">Out Of Stock [0]</label>
              </div>
            </form>
          </div>
        </aside>

        <article>
          <section className="flex justify-between items-center bg-white py-4 px-2 mb-5 rounded">
            <div className="flex justify-center items-center gap-5">
              <p className="p-2">Sort By:</p>
              <select
                name=""
                defaultValue={"DEFAULT"}
                className="p-2 rounded"
                id=""
              >
                <option disabled value="DEFAULT"></option>
                <option value="manual">Featured</option>
                <option value="best-selling">Best Selling</option>
                <option value="title-ascending">Alphabetically, A-Z</option>
                <option value="title-descending">Alphabetically, Z-A</option>
                <option value="price-ascending">Price, low to high</option>
                <option value="price-descending">Price, high to low</option>
                <option value="created-ascending">Date, old to new</option>
                <option value="created-descending">Date, new to old</option>
              </select>
            </div>
            <div>
              <p className="pe-5">21 Products</p>
            </div>
          </section>

          <section>
            <div className="flex flex-wrap gap-5">
              <ProductCard
                data={allProductsState ? allProductsState : []}
                grid={grid}
              />
            </div>
          </section>
        </article>
      </section>
    </main>
  );
};

export default OurStore;
