import React, { useEffect } from "react";
import BlogCard from "../components/BlogCard";
import { getAllBlogs } from "../features/blog/blogSlice";
import { useDispatch, useSelector } from "react-redux";

const Blog = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    getblogs();
  }, []);

  const getblogs = () => {
    dispatch(getAllBlogs());
  };

  const blogsState = useSelector((state) => state.blog.blogs) || [];

  return (
    <div>
      <div className="w-11/12 mx-auto grid grid-cols-[250px_1fr] gap-2">
        <div className="p-5">
          <h3 className="filter-title">Find By Categories</h3>
          <div>
            <ul className="">
              <li>Watch</li>
              <li>Tv</li>
              <li>Camera</li>
              <li>Laptop</li>
            </ul>
          </div>
        </div>
        <div className="p-5">
          <BlogCard blogs={blogsState} />
        </div>
      </div>
    </div>
  );
};

export default Blog;
