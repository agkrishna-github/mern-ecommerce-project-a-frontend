import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";

const BlogCard = ({ blogs }) => {
  return (
    <div className="flex flex-wrap gap-5">
      {blogs?.map((item) => (
        <div key={item._id} className="bg-slate-400 border p-5">
          <div className="w-[250px] h-[250px]">
            <img src="" alt="blog image" className="w-full h-full" />
          </div>
          <div className="py-2">
            {moment(item.createdAt).format("MMMM Do YYYY, h:mm a")}
          </div>
          <h4 className="py-2">{item.title}</h4>
          <p className="py-2">{item.description}</p>
          <Link to={`/blog/${item._id}`}>
            <div className="mt-2">
              <button className="button-btn">Read More</button>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default BlogCard;
