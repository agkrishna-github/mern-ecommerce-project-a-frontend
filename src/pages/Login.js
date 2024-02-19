import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserCart, login } from "../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, seterrorMsg] = useState(null);

  const authState = useSelector((state) => state.auth);

  useEffect(() => {
    if (authState.user !== null) {
      dispatch(getUserCart());

      navigate("/");
    }
  }, [authState]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    const moRegex = /^(\d{3})[- ]?(\d{3})[- ]?(\d{4})$/;
    let messageerr;

    if (!email && !password) {
      messageerr = "All Fields are Required";
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
        login({
          email: email,
          password: password,
        })
      );

      setEmail("");
      setPassword("");
      return;
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col gap-7 border-all p-5 w-[400px] h-[400px] rounded">
        <h2 className="text-center">Login</h2>
        {errorMsg && (
          <p className=" p-2 bg-red-500 text-white">{errorMsg && errorMsg}</p>
        )}
        <form onSubmit={submitHandler} className="flex flex-col gap-7">
          <input
            type="email"
            placeholder="Email"
            className="outline-0 p-3 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
              Log In
            </button>
            <Link to="/signup">
              <button
                type="button"
                className="button-btn w-[100px] border-none"
              >
                Sign Up
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
