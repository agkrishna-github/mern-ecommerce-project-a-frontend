import React from "react";

const Services = (props) => {
  const { services } = props;
  return (
    <div className="w-5/6 mx-auto flex justify-around items-center gap-10 p-5">
      {services &&
        services.map((service, index) => (
          <div className="flex justify-center items-center  gap-5" key={index}>
            <div>
              <img src={service.img} alt="service" />
            </div>
            <div>
              <h4 className="mb-4">Free Shipping</h4>
              <p>From all orders over rs.50</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Services;
