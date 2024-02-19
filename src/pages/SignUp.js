import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, seterrorMsg] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    const moRegex = /^(\d{3})[- ]?(\d{3})[- ]?(\d{4})$/;

    let messageerr;

    if (!firstName && !lastName && !email && !mobileNumber && !password) {
      messageerr = "All Fields are Required";
    } else if (!moRegex.test(mobileNumber)) {
      messageerr = "Mobile number is not valie";
    } else if (!firstName) {
      messageerr = "First Name Required";
    } else if (!mobileNumber) {
      messageerr = "Mobile Number Required";
    } else if (!lastName) {
      messageerr = "Last Name Required";
    } else if (!email) {
      messageerr = "Email Required";
    } else if (!password) {
      messageerr = "Password Required";
    } else {
      messageerr = null;
    }

    seterrorMsg(messageerr);

    if (messageerr === null) {
      dispatch(
        registerUser({
          firstname: firstName,
          lastname: lastName,
          email: email,
          mobile: mobileNumber,
          password: password,
        })
      );

      navigate("/login");

      setFirstName("");
      setLastName("");
      setEmail("");
      setMobileNumber("");
      setPassword("");
    }
    return;
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col gap-7 border-all p-5 w-[400px] min-h-[400px] rounded">
        <h2 className="text-center">Sign Up</h2>
        {errorMsg && (
          <p className=" p-2 bg-red-500 text-white">{errorMsg && errorMsg}</p>
        )}

        <form onSubmit={submitHandler} className="flex flex-col gap-7">
          <input
            type="text"
            placeholder="First Name"
            className="outline-0 p-3 rounded"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name"
            className="outline-0 p-3 rounded"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="outline-0 p-3 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Mobile Number"
            className="outline-0 p-3 rounded"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="outline-0 p-3 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex justify-center gap-5">
            <button type="submit" className="button-btn w-[100px] border-none">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
