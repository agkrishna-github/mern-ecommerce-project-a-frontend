import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserCart, login } from "../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { TextField, Button } from "@mui/material";

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
    <div className="grid grid-cols-2 h-[520px]">
      <div className="bg-[#1565C0] -skew-x-[25deg]"></div>
      <div className="flex items-center justify-center ">
        <div className="flex flex-col gap-7 border-all p-5 w-[400px] h-[400px] rounded border-blue">
          <h2 className="text-center text-[#1565C0]">Login</h2>
          {errorMsg && (
            <p className=" p-2 bg-red-500 text-white">{errorMsg && errorMsg}</p>
          )}
          <form onSubmit={submitHandler} className="flex flex-col gap-7">
            <TextField
              id="outlined-basic"
              label="Email"
              autoComplete="off"
              variant="outlined"
              type="email"
              className="outline-0 p-3 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              type="password"
              className="outline-0 p-3 rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="flex justify-center gap-5">
              <Button
                variant="contained"
                type="submit"
                className="button-btn w-[100px] border-none"
              >
                Log In
              </Button>
              <Link to="/signup">
                <button
                  type="button"
                  className="button-btn-blue-trans w-[100px] border-none"
                >
                  Sign Up
                </button>
              </Link>

              {/*  <button type="submit" className="button-btn w-[100px] border-none">
              Log In
            </button> */}
              {/*  */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
