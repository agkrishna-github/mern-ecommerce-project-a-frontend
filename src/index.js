import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { getUserCart, getUserProductWishlist } from "./features/user/userSlice";

store.dispatch(getUserProductWishlist());
store.dispatch(getUserCart());

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
