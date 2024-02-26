import React, { useState } from "react";
import { AiOutlineHome, AiOutlineMail } from "react-icons/ai";
import { BiPhoneCall, BiInfoCircle } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { createEnquiry } from "../features/enquiry/enquirySlice";

const Contacts = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      createEnquiry({
        name,
        email,
        mobile,
        comment,
      })
    );
  };

  return (
    <section className="bg-[#1565C0] min-h-screen py-12">
      <div className="w-5/6 mx-auto p-5 bg-white">
        <div className="flex justify-center items-center gap-5 py-10">
          <div className="w-[800px] h-[500px]">
            <iframe
              className="w-full h-full"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243646.90509385153!2d78.24323015659064!3d17.412608643969392!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99daeaebd2c7%3A0xae93b78392bafbc2!2sHyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1706502608172!5m2!1sen!2sin"
              width="600"
              height="450"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
        <div className="flex w-5/6 mx-auto justify-around sm:flex-col sm:gap-5">
          <div className="my-5">
            <h3 className="contact-title mb-4">Contact</h3>
            <form className="flex flex-col gap-5" onSubmit={submitHandler}>
              <input
                type="text"
                className="p-2 w-full"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <input
                type="email"
                className="p-2"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="tel"
                className="p-2"
                placeholder="Mobile Number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />

              <textarea
                name=""
                id=""
                className="w-100 p-2"
                cols="30"
                rows="4"
                placeholder="Comments"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />

              <button type="submit" className="button p-2 border-2">
                Submit
              </button>
            </form>
          </div>
          <div>
            <div>
              <h3 className="contact-title mb-4">Get In Touch With Us</h3>
              <div>
                <ul className="ps-0">
                  <li className="mb-3 d-flex gap-15 align-items-center">
                    <AiOutlineHome className="fs-5" />
                    <address className="mb-0">
                      Hno:100 Hyderabad, Telangana
                    </address>
                  </li>
                  <li className="mb-3 d-flex gap-15 align-items-center">
                    <BiPhoneCall className="fs-5" />
                    <a href="tel:+91 9999999999">+91 9999999999</a>
                  </li>
                  <li className="mb-3 d-flex gap-15 align-items-center">
                    <AiOutlineMail className="fs-5" />
                    <a href="mailto: gopalakrishna.ad@gmail.com">
                      gopalakrishna.ad@gmail.com
                    </a>
                  </li>
                  <li className="mb-3 d-flex gap-15 align-items-center">
                    <BiInfoCircle className="fs-5" />
                    <p className="mb-0">Monday - Friday 10 AM - 8 PM</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contacts;
