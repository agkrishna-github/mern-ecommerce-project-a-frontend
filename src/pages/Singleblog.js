import React, { useEffect } from "react";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { Link, useParams } from "react-router-dom";
import blog from "../images/blog-1.jpg";
import { useDispatch, useSelector } from "react-redux";
import { getblog } from "../features/blog/blogSlice";

const SingleBlog = () => {
  const singleBlog = useSelector((state) => state?.blog?.singleblog);

  console.log(singleBlog);

  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    getABlog(id);
  }, []);

  const getABlog = (id) => {
    dispatch(getblog(id));
    console.log(id);
  };

  return (
    <section class1="">
      <div className="">
        <div className="">
          <div className="">
            <Link to="/blogs">
              <HiOutlineArrowLeft className="" /> Go back to Blogs
            </Link>
            <h3 className="">{singleBlog?.title}</h3>
            <img src={blog} className="" alt="blog" />
            <p>{singleBlog?.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleBlog;
